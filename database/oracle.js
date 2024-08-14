
import oracledb from 'oracledb';

const oracleConfig = {
    user: "C##DW",
    password: "oracle",
    connectString: "localhost:1521/xe",
};

export async function connectOracle() {
  try {
    await oracledb.createPool(oracleConfig);
    console.log('Conectado a la base de datos Oracle');
  } catch (error) {
    console.error('Error conectando a Oracle:', error);
  }
}

export async function getOracleConnection() {
  try {
    return await oracledb.getConnection();
  } catch (error) {
    console.error('Error obteniendo conexión a Oracle:', error);
  }
}

export async function closePool() {
    if (pool) {
      try {
        await pool.close();
        console.log('Pool de conexiones cerrado');
      } catch (error) {
        console.error('Error cerrando el pool de conexiones:', error);
      }
    }
  }