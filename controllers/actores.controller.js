import Actor from "../models/actores.schema.js";

import { Database } from "../database/mongo.js";

export async function getActores(req, res) {
  try {
    const actores = await Actor.find();
    res.send(actores);
    //res.render('index', { paises });
  } catch (error) {
    res.status(500).send('Error al actores', error.message);
  }
}
