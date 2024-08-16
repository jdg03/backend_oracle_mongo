import { getActores } from "../controllers/actores.controller.js";
import express from "express";

const actorRouter = express.Router();

actorRouter.get("/actores", getActores);

export default actorRouter;
