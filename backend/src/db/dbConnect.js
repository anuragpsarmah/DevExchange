import mongoose from "mongoose";
import logger from "../loggers/winston.logger.js";

export const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    logger.info(`🍀 Database connected at host: ${connection.connection.host}`);
  } catch (error) {
    logger.error("❗ Error connecting database:\n", error);
    throw error;
  }
};
