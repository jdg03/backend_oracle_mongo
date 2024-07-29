// models/Productora.js
import { Schema, model } from 'mongoose';

const productoraSchema = new Schema({
  nombre: { type: String, required: true },
  pais_id: { type: Schema.Types.ObjectId, ref: 'Paises', required: true },
});

const Productora = model('Productoras', productoraSchema);

export default Productora;
