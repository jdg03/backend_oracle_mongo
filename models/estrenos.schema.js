// models/Productora.js
import { Schema, model } from 'mongoose';

const estrenosSchema = new Schema({
  fecha_estreno: { type: Date, required: true },
  pelicula_id: { type: Schema.Types.ObjectId, ref: 'Peliculas', required: true },
});

const Estreno = model('Estrenos', estrenosSchema);

export default Estreno;
