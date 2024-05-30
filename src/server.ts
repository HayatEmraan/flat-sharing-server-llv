import app from "./app";
import { port } from "./config";
import { Server } from "http";

let server: Server;

async function main() {
  try {
    server = await app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

process.on("unhandledRejection", (error) => {
  console.log("🐞  Unhandled Rejection. Shutting down...");
  if (server) {
    server.close(() => {
      console.log(error);
      process.exit(1);
    });
  } else {
    console.log(error);
    process.exit(1);
  }
});

process.on("uncaughtException", (error) => {
  console.log("🐞  Uncaught Exception. Shutting down...");
  console.log(error);
  process.exit(1);
});

main();
