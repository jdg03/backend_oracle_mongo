import { Schema, model } from 'mongoose';

const clasificacionSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion:{ type: Number, required: true }
});

const Clasificacion = model('Clasificacion', clasificacionSchema);

export default Clasificacion;