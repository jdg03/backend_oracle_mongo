import { getOracleConnection } from '../database/oracle.js';
import Proximamente from '../models/proximamente.schema.js';


export const proximamenteETL = async (req, res) => {
    try {
        
        const proximamente = await Proximamente.find();

        
        const oracleConnection = await getOracleConnection();

        for (const item of proximamente) {
            const { titulo, sipnosis, fecha_estreno, url_caratula } = item;

            try {
                // Convertir fecha de MongoDB a formato DATE de Oracle
                const fechaEstrenoOracle = new Date(fecha_estreno);

                
                await oracleConnection.execute(
                    `BEGIN
                        ETL_INSERTAR_PROXIMAMENTE(
                            :titulo,
                            :sipnosis,
                            :fecha_estreno,
                            :url_caratula
                        );
                    END;`,
                    {
                        titulo: titulo,
                        sipnosis: sipnosis,
                        fecha_estreno: fechaEstrenoOracle,
                        url_caratula: url_caratula
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
        res.status(500).json({ message: 'Error al obtener los estrenos', error });
    }
};
