import { Schema, model } from 'mongoose';

const formatoProyeccionSchema = new Schema({
  nombre: { type: String, required: true },
  resolucion: { type: String, required: true },
});

const FomatoProyeccion = model('Formato_de_proyeccion', formatoProyeccionSchema);

export default FomatoProyeccion;


