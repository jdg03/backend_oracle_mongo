import { Schema, model } from 'mongoose';

const peliculaSchema = new Schema({
  titulo: { type: String, required: true },
});

const Pelicula = model('Peliculas', peliculaSchema);

export default Pelicula;