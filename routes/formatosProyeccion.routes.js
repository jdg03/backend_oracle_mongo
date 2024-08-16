import express from "express";
import { getFormatoProyeccion } from "../controllers/formatoProyeccion.controller.js";

const formatosRouter = express.Router();

formatosRouter.get("/formatosProyeccion", getFormatoProyeccion);

export default formatosRouter;
