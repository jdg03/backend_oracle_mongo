import { getOracleConnection } from '../database/oracle.js';
import Director from '../models/directores.schema.js';
import Pais from '../models/paises.schema.js';
import Productora from '../models/productoras.schema.js';
import Actor from '../models/actores.schema.js';


export const actoresETL = async (req, res) => {
  try {
    
    const actores = await Actor.find().populate('nacionalidad_id', 'nombre');

    //res.json(actores);

    const actoresDesnormalizados = actores.map(actor => ({
      nombre: actor.nombre,
      pais: actor.nacionalidad_id.nombre 
    }));

    const oracleConnection = await getOracleConnection();
    console.log("Se hizo una conexion en el ETL")
    
    
    for (const actor of actoresDesnormalizados) {
      try {
        await oracleConnection.execute(
          `INSERT INTO ACTORES (id_actor, nombre, pais) VALUES (id_actor.NEXTVAL, :nombre, :pais)`,
          [actor.nombre, actor.pais],
          { autoCommit: true }
        );
      } catch (oracleError) {
      
        res.status(500).json({ message: 'Error al insertar los datos', oracleError });

      }
    }
    //res.status(200).send('Datos transferidos de MongoDB a Oracle');
    res.json(actoresDesnormalizados);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los actores', error });
  }
  
};


