import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import cors from "cors";

import userRouter from "./routes/user/user-routes";
import postRouter from "./routes/post/post-routes";
import countriesRouter from "./routes/countries/countries-routes";
import subscriptionRouter from "./routes/subscription/subscription-routes";
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
app.get("/ping", (req, res) => {
  return res.send("PONG!");
});

export default app;
//! este archivo está siendo importado en index.ts de la raíz
