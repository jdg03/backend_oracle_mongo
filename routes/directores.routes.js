import express from "express";
import { getDirectores } from "../controllers/directores.controller.js";

const directorRouter = express.Router();

directorRouter.get("/directores", getDirectores);


export default directorRouter;