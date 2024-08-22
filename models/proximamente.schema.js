// models/Productora.js
import { Schema, model } from 'mongoose';

const proximamenteSchema = new Schema({
  titulo: { type: String},
  sipnosis: { type: String},
  fecha_estreno: { type: Date},
  url_caratula: { type: String},
});

const Proximamente = model('Proximamente', proximamenteSchema);

export default Proximamente;
