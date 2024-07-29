import express from "express";
import { getPaises } from "../controllers/paises.controller.js";

const paisRouter = express.Router();

paisRouter.get("/paises", getPaises);


export default paisRouter;
