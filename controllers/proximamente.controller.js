
import Proximamente from "../models/proximamente.schema.js";

export async function getProximamente(req, res) {
  try {
    console.log("controlador de proximamente")
    const estrenos = await Proximamente.find();
    res.send(estrenos);
 
  } catch (error) {
    res.status(500).send('Error', error.message);
  }
}
