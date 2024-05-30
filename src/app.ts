import express, { Application } from "express";
import cors from "cors";
const app: Application = express();
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import notFound from "./app/middlewares/notfound";
import routes from "./app/router/routes";
import morgan from "morgan";

const corsOption = {
  origin: ["http://localhost:3000", "https://flat-sharing-client.vercel.app"],
  preflightContinue: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
};

// middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// api route
app.use("/api", routes);

// not found route
app.use("*", notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
