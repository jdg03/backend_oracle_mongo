import { Schema, model } from 'mongoose';

const peliculaSchema = new Schema({
  titulo: { type: String, required: true },
  sipnosis: { type: String, required: true },
  director: { type: Schema.Types.ObjectId, ref: 'Directores' },
  banda_sonora: { type: Schema.Types.ObjectId, ref: 'Banda_sonora' },
  productora_id: { type: Schema.Types.ObjectId, ref: 'Productoras' },
  idioma_id: { type: Schema.Types.ObjectId, ref: 'Idiomas' },
  pais_id: { type: Schema.Types.ObjectId, ref: 'Paises' },
  fecha_estreno: { type: Date, },
  clasificacion_id: { type: Schema.Types.ObjectId, ref: 'Clasificaciones' },
  duracion: { type: String },
  url_caratula: { type: String },
  url_trailer: { type: String },
  formato_proyeccion_id: { type: Schema.Types.ObjectId, ref: 'Formato_de_proyeccion' },
  valoracion: { type: Number, required: true, min: 0, max: 10 }
});

const Pelicula = model('Peliculas', peliculaSchema);

export default Pelicula;
