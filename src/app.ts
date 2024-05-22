import express, { Application } from "express";
import cors from "cors";
const app: Application = express();
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import notFound from "./app/middlewares/notfound";
import routes from "./app/router/routes";

// middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// api route
app.use("/api", routes);


// not found route
app.use("*", notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
