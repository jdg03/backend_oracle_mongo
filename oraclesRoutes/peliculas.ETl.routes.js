// routes/transfer.routes.js
import express from 'express';
import { transferData } from '../ETL/peliculas.ETL.js';

const routertransferData = express.Router();

// Ruta con el parámetro nombre en la URL
routertransferData.post('/transfer/:nombre', transferData);

export default routertransferData;
