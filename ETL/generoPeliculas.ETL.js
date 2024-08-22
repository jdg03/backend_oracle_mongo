import { getOracleConnection } from '../database/oracle.js';
import Categoria from '../models/categorias.schema.js';

export const generosETL = async (req, res) => {
    try {
        
        const categorias = await Categoria.find();

        
        const oracleConnection = await getOracleConnection();

        for (const categoria of categorias) {
            const { nombre, descripcion} = categoria;

            try {
               
                
                await oracleConnection.execute(
                    `BEGIN
                        ETL_INSERTAR_GENEROS_PELICULAS(

                            :nombre,
                            :descripcion 
                        );
                    END;`,
                    {
                        nombre: nombre ,
                        descripcion: descripcion 
                    },
                    { autoCommit: false }
                );
            } catch (oracleError) {
                
                console.error('Error al insertar datos en Oracle', oracleError);
                res.status(500).json({ message: 'Error al insertar datos en Oracle', oracleError });
                return; 
            }
        }

       
        await oracleConnection.commit();

        
        res.json("Datos insertados con exito");
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorias', error });
    }
};
