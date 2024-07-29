import Director from "../models/directores.schema.js";

export async function getDirectores(req, res) {
    try {
      const directores = await Director.find();
      res.send(directores);
      //res.render('index', { paises });
    } catch (error) {
      res.status(500).send('Error al obtener directores', error.message);
    }
  }