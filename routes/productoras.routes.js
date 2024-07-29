import express from "express";
import { getProductoras } from "../controllers/productoras.controller.js";

const productorasRouter = express.Router();

productorasRouter.get('/productoras',getProductoras);

export default productorasRouter;