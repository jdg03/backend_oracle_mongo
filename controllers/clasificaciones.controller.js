import Clasificacion from "../models/clasificacion.schema.js";

export async function getClasificaciones(req, res) {
  try {
    const clasificaciones = await Clasificacion.find();
    res.send(clasificaciones);
    //res.render('index', { paises });
  } catch (error) {
    res.status(500).send('Error al obtner las clasificaciones', error.message);
  }
}
