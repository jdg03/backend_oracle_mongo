import { Schema, model } from 'mongoose';

const clasificacionSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion:{ type: Number, required: true },
  edad_minima: { type: Number, required: true }
});

const Clasificacion = model('Clasificaciones', clasificacionSchema);

export default Clasificacion;