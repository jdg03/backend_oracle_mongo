import { Schema, model } from 'mongoose';

const formatoProyeccionSchema = new Schema({
  nombre: { type: String, required: true },
  resolucion: { type: String, required: true },
});

const FomatoProyeccion = model('Formato_de_proyecciones', formatoProyeccionSchema);

export default FomatoProyeccion;


