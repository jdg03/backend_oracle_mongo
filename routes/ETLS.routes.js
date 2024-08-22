import express from "express";
import { peliculasETL } from "../ETL/peliculas.ETL.js";
import { actoresETL } from "../ETL/actores.ETL.js";
import { directoresETL } from "../ETL/directores.ETL.js";
import { proximamenteETL } from "../ETL/proximamente.ETL.js";
import { generosETL } from "../ETL/generoPeliculas.ETL.js";

const ETLRouter = express.Router();


ETLRouter.get("/peliculasETL", peliculasETL);
ETLRouter.get("/actoresETL", actoresETL);
ETLRouter.get("/directoresETL",directoresETL);
ETLRouter.get("/proximamenteETL",proximamenteETL);
ETLRouter.get("/generosETL",generosETL);

export default ETLRouter;
