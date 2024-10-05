import dotenv from "dotenv";
import { dbConnect } from "./db/dbConnect.js";
import { dbRetries } from "./constants.js";
import { app } from "./app.js";
import logger from "./loggers/winston.logger.js";

dotenv.config();

(async () => {
  let retries = dbRetries;
  logger.info("Trying to connect database");

  while (retries--) {
    try {
      await dbConnect();
      break;
    } catch {
      if (!retries) process.exit(1);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      logger.info("Trying to connect database");
    }
  }

  app.listen(process.env.PORT, () => {
    logger.info(`⚙️  Server is running on PORT: ${process.env.PORT}`);
  });
})();
