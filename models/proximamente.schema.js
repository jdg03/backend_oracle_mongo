// models/Productora.js
import { Schema, model } from 'mongoose';

const proximamenteSchema = new Schema({
  fecha_estreno: { type: Date, required: true },
  pelicula_id: { type: Schema.Types.ObjectId, ref: 'Peliculas', required: true },
});

const Proximamente = model('Proximamente', proximamenteSchema);

export default Proximamente;
