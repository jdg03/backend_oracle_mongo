// models/Actor.js
import { Schema, model } from 'mongoose';

const actorSchema = new Schema({
  nombre: { type: String, required: true },
  nacionalidad_id: { type: Schema.Types.ObjectId, ref: 'Paises', required: true },
});

const Actor = model('Actores', actorSchema);

export default Actor;
