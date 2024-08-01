import { Schema, model } from 'mongoose';

const repartoSchema = new Schema({
  actor: { type: Schema.Types.ObjectId, ref: 'Actores', required: true },
  pelicula: { type: Schema.Types.ObjectId, ref: 'Peliculas', required: true },
});

const reparto = model('Reparto', repartoSchema);

export default reparto;