import { Schema, model } from 'mongoose';

const paisSchema = new Schema({
  nombre: String,
  abreviatura: String,
});

const Pais = model('Paises', paisSchema);

export default Pais;


