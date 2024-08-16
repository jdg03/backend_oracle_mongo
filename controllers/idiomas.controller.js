
import Idioma from "../models/idiomas.schema.js";

export async function getIdiomas(req, res) {
    try {
      const idiomas = await Idioma.find();
      res.send(idiomas);
      //res.render('index', { paises });
    } catch (error) {
      res.status(500).send('Error al obtenerlos idiomas', error.message);
    }
  }