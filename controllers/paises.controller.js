import Paises   from '../models/paises.schema.js';

export async function getPaises(req, res) {
  try {
    const paises = await Paises.find();
    res.send(paises);
    //res.render('index', { paises });
  } catch (error) {
    res.status(500).send('Error al obtener países', error.message);
  }
}
