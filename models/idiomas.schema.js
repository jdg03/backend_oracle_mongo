import { Schema, model } from 'mongoose';

const idomaSchema = new Schema({
  nombre:{ type: String, required: true } ,
  abreviatura: { type: String, required: true } ,
});

const Idioma = model('Idiomas', idomaSchema);

export default Idioma;


