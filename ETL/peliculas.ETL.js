import { getOracleConnection } from '../database/oracle.js';
import Director from '../models/directores.schema.js';
import Pais from '../models/paises.schema.js';
import Productora from '../models/productoras.schema.js';

export const transferData = async (req, res) => {
    const oracleConnection = await getOracleConnection();
    
    const nombrePelicula = req.params.nombre; // Extraer el nombre de la URL
  
    try {
     
      const director = await Director.findOne({ nombre: 'Martin Scorsese' }).populate('nacionalidad_id').exec();
      if (!director) throw new Error('Director no encontrado');
  
     
      const pais = await Pais.findOne({ nombre: 'Estados Unidos' }).exec();
      if (!pais) throw new Error('País no encontrado');
  
     
      const productora = await Productora.findOne({ nombre: 'Marvel' }).exec();
      if (!productora) throw new Error('Productora no encontrada');
  
      const sql = `INSERT INTO peliculas (id_pelicula, nombre, director, pais, productora) VALUES (:id_pelicula, :nombre, :director, :pais, :productora)`;
      const datos = {
        id_pelicula:2,
        nombre: nombrePelicula,
        director: director.nombre,
        pais: pais.nombre,
        productora: productora.nombre
      };
  
      await oracleConnection.execute(sql, datos, { autoCommit: true });
  
      console.log('Datos transferidos de MongoDB a Oracle');
      res.status(200).send('Datos transferidos de MongoDB a Oracle');
    } catch (error) {
      console.error('Error transfiriendo datos', error);
      res.status(500).send('Error transfiriendo datos');
    } finally {
      await oracleConnection.close();
    }
  };

transferData().catch(console.error);
