import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";
import apiRoutes from "./routes";
import "../../common-modules/database/connection";
import compression from "compression";

import {
  routeNotFound,
  errorHandler
} from "./middlewares/response-handler";
import { ApiConfig } from "../../common-modules/config";

const app: express.Application = express();

// Express App Configuration
app.set("port", process.env.API_PORT || ApiConfig.DEFAULT_API_PORT);

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(compression());

// Api route handling
app.use("/api", apiRoutes);

app.use("/*", routeNotFound);
// Handle general errors
app.use(errorHandler);

export default app;
