import { getOracleConnection } from '../database/oracle.js';
import Director from '../models/directores.schema.js';

export const directoresETL = async (req, res) => {
    try {
        
        const directores = await Director.find().populate('nacionalidad_id', 'nombre');
  
        
        const directoresDesnormalizados = directores.map(director => ({
            nombre: director.nombre,
            pais: director.nacionalidad_id?.nombre || null
        }));
  
        //res.json(directoresDesnormalizados);
  
        const oracleConnection = await getOracleConnection();
  
        
        for (const director of directoresDesnormalizados) {
            try {
                await oracleConnection.execute(
                    `BEGIN
                       ETL_INSERTAR_director(:nombre, :pais);
                     END;`,
                    {
                        nombre: director.nombre,
                        pais: director.pais
                    },
                    { autoCommit: true }
                );
            } catch (oracleError) {
                res.status(500).json({ message: 'Error al insertar los datos en Oracle', oracleError });
                return;
            }
        }
  
      await oracleConnection.commit();
      res.json({ message: 'directores insertados correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los directores', error });
    }
  };
  