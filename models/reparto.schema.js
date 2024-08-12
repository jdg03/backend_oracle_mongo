import { Schema, model } from 'mongoose';

const repartoSchema = new Schema({
  pelicula: { type: Schema.Types.ObjectId, ref: 'Peliculas', required: true },
  actor: { type: Schema.Types.ObjectId, ref: 'Actores', required: true }
  
});

const reparto = model('Reparto', repartoSchema);

export default reparto;