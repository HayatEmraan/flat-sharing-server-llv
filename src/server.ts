import app from "./app";
import { port } from "./app/config";

async function main() {
  try {
    await app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
