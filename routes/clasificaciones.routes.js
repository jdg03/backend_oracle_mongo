import express from "express";
import { getClasificaciones } from "../controllers/clasificaciones.controller.js";

const clasificacionRouter = express.Router();

clasificacionRouter.get("/clasificaciones", getClasificaciones);


export default clasificacionRouter;