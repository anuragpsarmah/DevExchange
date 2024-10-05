import logger from "../loggers/winston.logger.js";
import response from "./response.js";

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      logger.error(error);
      response(
        res,
        error?.status || 500,
        error?.message || "Something Went Wrong",
        error?.data || {},
        error?.error
      );
    });
  };
};

export default asyncHandler;
