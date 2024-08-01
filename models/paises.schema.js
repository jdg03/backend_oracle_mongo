import { Schema, model } from 'mongoose';

const paisSchema = new Schema({
  nombre: { type: String, required: true },
  abreviatura: { type: String, required: true },
});

const Pais = model('Paises', paisSchema);

export default Pais;


