import morgan from "morgan";
import helmet from "helmet";
import express, { Request, Response } from "express";
import { Request as JWTRequest } from "express-jwt";

import cors from "cors";

import userRouter from "./routes/user/user-routes";
import postRouter from "./routes/post/post-routes";
import countriesRouter from "./routes/countries/countries-routes";
import subscriptionRouter from "./routes/subscription/subscription-routes";
import jwtCheck from "./config/jwtMiddleware";
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/countries", countriesRouter);
app.use("/subscription", subscriptionRouter);
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
