import { getActores } from "../controllers/actores.controller.js";
import { actoresETL } from "../ETL/ETL.js";

import express from "express";


const actorRouter = express.Router();

actorRouter.get("/actores", getActores);

actorRouter.get("/actoresETL", actoresETL);

export default actorRouter;
