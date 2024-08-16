
import BandaSonora from "../models/bandaSonora.schema.js";

export async function getBandaSonora(req, res) {
    try {
      const bandaSonora = await BandaSonora.find();
      res.send(bandaSonora);
      //res.render('index', { paises });
    } catch (error) {
      res.status(500).send('Error al obtener bandaSonora', error.message);
    }
  }