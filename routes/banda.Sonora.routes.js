import { getBandaSonora } from "../controllers/banda.sonora.controller.js";
import express from "express";

const bandaSonoraRouter = express.Router();

bandaSonoraRouter.get("/bandaSonora", getBandaSonora);

export default bandaSonoraRouter;
