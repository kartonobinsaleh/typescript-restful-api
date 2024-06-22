import express from "express";
import { publicRouter } from "../routes/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../routes/api";

export const web = express();
web.use(express.json());

web.use("/api", publicRouter);
web.use("/api", apiRouter);
web.use(errorMiddleware);
