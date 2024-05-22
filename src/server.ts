import app from "./app";
import { port } from "./config";
import { Server } from "http";
import { errorlogger, logger } from "./shared/logger";

async function main() {
  try {
    const server: Server = await app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });

    const exitHandler = () => {
      if (server) {
        server.close(() => {
          logger.info("Server closed");
        });
      }
      process.exit(1);
    };

    const unexpectedErrorHandler = (error: unknown) => {
      errorlogger.error(error);
      exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);
  } catch (error) {
    console.log(error);
  }
}

main();
