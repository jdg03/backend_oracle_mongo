import { getOracleConnection } from '../database/oracle.js';
import Director from '../models/directores.schema.js';
import Pais from '../models/paises.schema.js';
import Productora from '../models/productoras.schema.js';
import Actor from '../models/actores.schema.js';
import Pelicula from '../models/pelicula.schema.js'


export const peliculasETL = async (req, res) => {
  let oracleConnection;
  try {
    const peliculas = await Pelicula.find()
      .populate('director_id', 'nombre')
      .populate('banda_sonora', 'compositor')
      .populate('productora_id', 'nombre')
      .populate('idioma_id', 'nombre')
      .populate('pais_id', 'nombre')
      .populate('clasificacion_id', 'nombre')
      .populate('formato_proyeccion_id', 'nombre');

    const peliculasDesnormalizadas = peliculas.map(pelicula => ({
      titulo: pelicula.titulo,
      sipnosis: pelicula.sipnosis,
      director: pelicula.director_id?.nombre || null, 
      banda_sonora: pelicula.banda_sonora?.titulo || null,
      productora: pelicula.productora_id?.nombre || null, 
      idioma: pelicula.idioma_id?.nombre || null, 
      pais: pelicula.pais_id?.nombre || null,
      fecha_estreno: pelicula.fecha_estreno,
      clasificacion: pelicula.clasificacion_id?.nombre || null,  
      duracion: pelicula.duracion,
      url_caratula: pelicula.url_caratula,
      url_trailer: pelicula.url_trailer,
      formato_proyeccion: pelicula.formato_proyeccion_id?.nombre || null,
      valoracion: pelicula.valoracion,
    }));

    //res.json(peliculasDesnormalizadas);

    oracleConnection = await getOracleConnection();

    for (const pelicula of peliculasDesnormalizadas) {
      try {
        await oracleConnection.execute(
          `BEGIN
            ETL_INSERTAR_PELICULA(
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
            );
          END;`,
          {
            titulo: pelicula.titulo,
            sipnosis: pelicula.sipnosis,
            director: pelicula.director,
            banda_sonora: pelicula.banda_sonora,
            productora: pelicula.productora,
            idioma: pelicula.idioma,
            pais: pelicula.pais,
            fecha_estreno: pelicula.fecha_estreno,
            clasificacion: pelicula.clasificacion,
            duracion: pelicula.duracion,
            url_caratula: pelicula.url_caratula,
            url_trailer: pelicula.url_trailer,
            formato_proyeccion: pelicula.formato_proyeccion,
            valoracion: pelicula.valoracion
          },
          { autoCommit: false }
        );
      } catch (oracleError) {
        console.error(`Error al insertar película: ${pelicula.titulo}`, oracleError);
        res.status(500).json({ message: 'Error al insertar datos en Oracle', oracleError });
        return;
      }
    }

    await oracleConnection.commit();
    res.json({ message: 'Películas insertadas correctamente' });

  } catch (error) {
    res.status(500).json({ message: 'Error al procesar ETL de películas', error });
    console.log(error);
  } finally {
    if (oracleConnection) {
      try {
        await oracleConnection.close();
      } catch (closeError) {
        console.error('Error al cerrar la conexión Oracle', closeError);
      }
    }
  }
};

