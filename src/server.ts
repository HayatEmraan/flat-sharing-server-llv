import app from "./app";
import { port } from "./config";
import { Server } from "http";
import { errorlogger, logger } from "./shared/logger";

let server: Server;

async function main() {
  try {
    server = await app.listen(port, () => {
      // console.log(`http://localhost:${port}`);
      logger.info(`http://localhost:${port}`);
    });
  } catch (error) {
    errorlogger.error(error);
  }
}

process.on("unhandledRejection", (error) => {
  logger.info("🐞  Unhandled Rejection. Shutting down...");
  if (server) {
    server.close(() => {
      errorlogger.error(error);
      process.exit(1);
    });
  } else {
    errorlogger.error(error);
    process.exit(1);
  }
});

process.on("uncaughtException", (error) => {
  logger.info("🐞  Uncaught Exception. Shutting down...");
  errorlogger.error(error);
  process.exit(1);
});

main();