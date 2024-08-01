import { Schema, model } from 'mongoose';

const imagenesSchema = new Schema({
  url: { type: String, required: true },
  pelicula_id: { type: Schema.Types.ObjectId, ref: 'Peliculas', required: true },
});

const Imagen = model('Imagenes', imagenesSchema);

export default Imagen;