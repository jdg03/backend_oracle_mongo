import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { Database } from './database/mongo.js';

import { connectOracle } from './database/oracle.js';

import indexRouter from './routes/index.routes.js';
import paisRouter from './routes/paises.routes.js';
import actorRouter from './routes/actores.routes.js';
import directorRouter from './routes/directores.routes.js';
import productorasRouter from './routes/productoras.routes.js';
import bandaSonoraRouter from './routes/banda.Sonora.routes.js';
import idiomaRauter from './routes/idiomas.routes.js';
import clasificacionRouter from './routes/clasificaciones.routes.js';
import formatosRouter from './routes/formatosProyeccion.routes.js';
import proximamenteRouter from './routes/proximamente.routes.js';

import ETLRouter from './routes/ETLS.routes.js';


// Configuración para poder usar __dirname con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//conexion a Mongo
const db = new Database();

//conexion a oracle
connectOracle();

// Rutas
app.use(indexRouter);
app.use(paisRouter);
app.use(actorRouter);
app.use(directorRouter);
app.use(productorasRouter);
app.use(bandaSonoraRouter);
app.use(idiomaRauter);
app.use(formatosRouter);
app.use(clasificacionRouter);
app.use(proximamenteRouter);

app.use(ETLRouter);


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Maneja el cierre del servidor
process.on('SIGINT', async () => {
  console.log('Cerrando el servidor...');
  await closePool();
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});