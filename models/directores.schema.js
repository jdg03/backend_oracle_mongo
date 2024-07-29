// models/Director.js
import { Schema, model } from 'mongoose';

const directorSchema = new Schema({
  nombre: { type: String, required: true },
  nacionalidad_id: { type: Schema.Types.ObjectId, ref: 'Paises', required: true },
});

const Director = model('Directores', directorSchema);

export default Director;
