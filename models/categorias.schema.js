import { Schema, model } from 'mongoose';

const categoriaSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion:{ type: String, required: true },
});

const Categoria = model('Categorias', categoriaSchema);

export default Categoria;