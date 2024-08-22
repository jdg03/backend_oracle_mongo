import express from "express";
import { getProximamente } from "../controllers/proximamente.controller.js";

const proximamenteRouter = express.Router();

proximamenteRouter.get('/proximamente',getProximamente);

export default proximamenteRouter;