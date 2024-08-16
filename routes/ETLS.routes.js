import { actoresETL } from "../ETL/ETL.js";
import { peliculasETL } from "../ETL/ETL.js";

import express from "express";

const ETLRouter = express.Router();

ETLRouter.get("/actoresETL", actoresETL);
ETLRouter.get("/peliculasETL", peliculasETL)

export default ETLRouter;
