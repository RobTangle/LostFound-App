"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = exports.Post = exports.User = void 0;
const LogWithColor_1 = __importDefault(require("../miscellanea/LogWithColor"));
//* - - - - - - - CONNECT TO MongoDB - - - - - - - -
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
LogWithColor_1.default.info(" **************** MongoDB INDEX running! **************** ");
mongoose_1.default
    .connect(config_1.config.mongo.uri)
    .then(() => {
    LogWithColor_1.default.infoBGC(" *** Connected to MongoDB: DocsSaviourAppDATABASE ! *** ");
})
    .catch((error) => {
    LogWithColor_1.default.error("*** Unable to connecto to MongoDB");
    LogWithColor_1.default.error(error);
});
//* - - - - - - - - MODELS : - - - - - - - -
const User_1 = require("./models/User");
const Post_1 = require("./models/Post");
const Subscription_1 = require("./models/Subscription");
exports.User = mongoose_1.default.model("User", User_1.userSchema);
exports.Post = mongoose_1.default.model("Post", Post_1.postSchema);
exports.Subscription = mongoose_1.default.model("Subscription", Subscription_1.subscriptionSchema);
