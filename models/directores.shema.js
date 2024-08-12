
import { Schema, model } from 'mongoose';

const directorrSchema = new Schema({
  nombre: { type: String, required: true },
  nacionalidad_id: { type: Schema.Types.ObjectId, ref: 'Paises', required: true },
});

const Director = model('Directores', directorrSchema);

export default Director;
