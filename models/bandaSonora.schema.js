import { Schema, model } from 'mongoose';

const bandaSonoraSchema = new Schema({
  titulo: { type: String, required: true },
  compositor:{ type: String, required: true },
  url: { type: String, required: true }
});

const BandaSonora = model('Banda_sonora', bandaSonoraSchema);
s
export default BandaSonora;