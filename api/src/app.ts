import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import cors from "cors";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// for testing:
app.get("/ping", (req, res) => {
  return res.send("PONG!");
});

export default app;
//! este archivo está siendo importado en index.ts de la raíz
