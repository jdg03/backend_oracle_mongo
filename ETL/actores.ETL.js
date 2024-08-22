import { getOracleConnection } from '../database/oracle.js';
import Actor from '../models/actores.schema.js';


export const actoresETL = async (req, res) => {
  try {
      
      const actores = await Actor.find().populate('nacionalidad_id', 'nombre');

      
      const actoresDesnormalizados = actores.map(actor => ({
          nombre: actor.nombre,
          pais: actor.nacionalidad_id?.nombre || null
      }));

      //res.json(actoresDesnormalizados);

      const oracleConnection = await getOracleConnection();

      
      for (const actor of actoresDesnormalizados) {
          try {
              await oracleConnection.execute(
                  `BEGIN
                     ETL_INSERTAR_ACTOR(:nombre, :pais);
                   END;`,
                  {
                      nombre: actor.nombre,
                      pais: actor.pais
                  },
                  { autoCommit: true }
              );
          } catch (oracleError) {
              res.status(500).json({ message: 'Error al insertar los datos en Oracle', oracleError });
              return;
          }
      }

    await oracleConnection.commit();
    res.json({ message: 'Actores insertados correctamente' });
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener los actores', error });
  }
};

  