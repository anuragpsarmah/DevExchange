import express from "express";
import cors from "cors";
import response from "./utils/response.js";
import serveIndex from "serve-index";
import morganMiddleware from "./loggers/morganMiddleware.logger.js";
import { isAuthorized } from "./middlewares/auth.middleware.js";

export const app = express();

//configurations
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(morganMiddleware);
app.use(
  "/logs",
  isAuthorized,
  express.static("logs"),
  serveIndex("logs", { icons: true, view: "details" })
);
app.use("/health", async (req, res) => {
  response(res, 200, "OK");
});

//routes
import { authRouter } from "./routes/auth.route.js";

app.use("/api/auth", authRouter);
