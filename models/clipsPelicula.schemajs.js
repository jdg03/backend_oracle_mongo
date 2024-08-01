import { Schema, model } from 'mongoose';

const clipsSchema = new Schema({
  url: { type: String, required: true },
  pelicula: { type: Schema.Types.ObjectId, ref: 'Peliculas', required: true },
});

const Clips = model('Clips_peliculas', clipsSchema);

export default Clips;