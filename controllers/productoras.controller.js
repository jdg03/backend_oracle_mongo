import Productora from "../models/productoras.schema.js";

export async function getProductoras(req, res) {
    try {
      const productoras = await Productora.find();
      res.send(productoras);
      //res.render('index', { paises });
    } catch (error) {
      res.status(500).send('Error al obtener Productoras', error.message);
    }
  }