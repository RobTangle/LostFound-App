import morgan from "morgan";
import helmet from "helmet";
import express, { Request, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import cors from "cors";

import userRouter from "./routes/user";
import postRouter from "./routes/post";
import countriesRouter from "./routes/countries";
import subscriptionRouter from "./routes/subscription";
import jwtCheck from "./config/jwtMiddleware";
import { limiter } from "./config/rateLimiter";

// Swagger

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/countries", countriesRouter);
app.use("/subscription", subscriptionRouter);

// swagger for documenting API:

// for testing:
app.get("/ping", (req: Request, res: Response) => {
  return res.send("PONG!");
});

app.get("/auth", jwtCheck, (req: JWTRequest, res: Response) => {
  console.log(req.auth);
  return res.status(200).send(req.auth);
});

export default app;
//! este archivo está siendo importado en index.ts de la raíz
