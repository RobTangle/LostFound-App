"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@docssaviourappdatabase.b0wlnau.mongodb.net/?retryWrites=true&w=majority`;
exports.config = {
    mongo: {
        uri: MONGO_URI,
    },
    server: {
        port: PORT,
    },
};
