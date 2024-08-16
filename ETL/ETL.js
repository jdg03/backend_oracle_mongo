import { getOracleConnection } from '../database/oracle.js';
import Director from '../models/directores.schema.js';
import Pais from '../models/paises.schema.js';
import Productora from '../models/productoras.schema.js';
import Actor from '../models/actores.schema.js';
import Pelicula from '../models/pelicula.schema.js'


export const actoresETL = async (req, res) => {
  try {
    
    const actores = await Actor.find().populate('nacionalidad_id', 'nombre');

    //res.json(actores);

    const actoresDesnormalizados = actores.map(actor => ({
      nombre: actor.nombre,
      pais: actor.nacionalidad_id.nombre 
    }));

    const oracleConnection = await getOracleConnection();
    
    
    
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



export const peliculasETL = async (req, res) => {
  try {

    // Obtener las películas con los campos referenciados
    const peliculas = await Pelicula.find()
      .populate('director_id', 'nombre')
      .populate('banda_sonora', 'compositor')
      .populate('productora_id', 'nombre')
      .populate('idioma_id', 'nombre')
      .populate('pais_id', 'nombre')
      .populate('clasificacion_id', 'nombre')
      .populate('formato_proyeccion_id', 'nombre');

  
    // Transformar los datos para que cada ID referenciado contenga directamente el nombre o valor relevante
    const peliculasDesnormalizadas = peliculas.map(pelicula => ({
      titulo: pelicula.titulo,
      sipnosis: pelicula.sipnosis,
      director: pelicula.director_id.nombre,
      banda_sonora: pelicula.banda_sonora.compositor,
      productora: pelicula.productora_id.nombre,
      idioma: pelicula.idioma_id.nombre,
      pais: pelicula.pais_id.nombre,
      fecha_estreno: pelicula.fecha_estreno,
      clasificacion: pelicula.clasificacion_id.nombre,
      duracion: pelicula.duracion,
      url_caratula: pelicula.url_caratula,
      url_trailer: pelicula.url_trailer,
      formato_proyeccion: pelicula.formato_proyeccion_id.nombre,
      valoracion: pelicula.valoracion
    }));

    res.json(peliculasDesnormalizadas);

    const oracleConnection = await getOracleConnection();

    // Insertar cada película en la base de datos Oracle
    for (const pelicula of peliculasDesnormalizadas) {
      try {
        await oracleConnection.execute(
          `INSERT INTO PELICULAS (
            id_pelicula, 
            titulo, 
            sipnosis, 
            director, 
            banda_sonora, 
            productora, 
            idioma, 
            pais, 
            fecha_estreno, 
            clasificacion, 
            duracion, 
            url_caratula, 
            url_trailer, 
            formato_proyeccion, 
            valoracion
          ) VALUES (
            my_sequence.NEXTVAL, 
            :titulo, 
            :sipnosis, 
            :director, 
            :banda_sonora, 
            :productora, 
            :idioma, 
            :pais, 
            :fecha_estreno, 
            :clasificacion, 
            :duracion, 
            :url_caratula, 
            :url_trailer, 
            :formato_proyeccion, 
            :valoracion
          )`,
          [
            pelicula.titulo,
            pelicula.sipnosis,
            pelicula.director,
            pelicula.banda_sonora,
            pelicula.productora,
            pelicula.idioma,
            pelicula.pais,
            pelicula.fecha_estreno,
            pelicula.clasificacion,
            pelicula.duracion,
            pelicula.url_caratula,
            pelicula.url_trailer,
            pelicula.formato_proyeccion,
            pelicula.valoracion
          ],
          { autoCommit: true }
        );
      } catch (oracleError) {
        res.status(500).json({ message: 'Error al insertar datos en Oracle', oracleError });
        return; // Salir del bucle y función si ocurre un error
      }
    }

    // Responder al cliente con las películas desnormalizadas
    res.json(peliculasDesnormalizadas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas', error });
    console.log(error);
  }
};
