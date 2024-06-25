import express from "express";
import cors from "cors";
import { publicRouter } from "../routes/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../routes/api";

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const web = express();
web.use(express.json());

web.use(cors(corsOptions));

web.use("/api", publicRouter);
web.use("/api", apiRouter);
web.use(errorMiddleware);
