import LogWithColors from "../miscellanea/LogWithColor";

//* - - - - - - - CONNECT TO MongoDB - - - - - - - -
import mongoose from "mongoose";
import { config } from "../config/config";

LogWithColors.info(
  " **************** MongoDB INDEX running! **************** "
);
mongoose
  .connect(config.mongo.uri)
  .then(() => {
    LogWithColors.infoBGC(
      " *** Connected to MongoDB: DocsSaviourAppDATABASE ! *** "
    );
  })
  .catch((error: any) => {
    LogWithColors.error("*** Unable to connecto to MongoDB");
    LogWithColors.error(error);
  });

//* - - - - - - - - MODELS : - - - - - - - -

import { IUser, userSchema } from "./models/User";
import { IPost, postSchema } from "./models/Post";
import { ISubscription, subscriptionSchema } from "./models/Subscription";

export const User = mongoose.model<IUser>("User", userSchema);
export const Post = mongoose.model<IPost>("Post", postSchema);
export const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema
);
