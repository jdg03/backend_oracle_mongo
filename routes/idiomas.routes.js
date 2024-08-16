import { getIdiomas } from "../controllers/idiomas.controller.js";
import express from "express";

const idiomaRauter = express.Router();

idiomaRauter.get("/idiomas", getIdiomas);

export default idiomaRauter;
