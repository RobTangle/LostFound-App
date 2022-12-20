"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const countries_1 = __importDefault(require("./routes/countries"));
const subscription_1 = __importDefault(require("./routes/subscription"));
const jwtMiddleware_1 = __importDefault(require("./config/jwtMiddleware"));
const rateLimiter_1 = require("./config/rateLimiter");
// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./utils/swagger-docs.json");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(rateLimiter_1.limiter);
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/user", user_1.default);
app.use("/post", post_1.default);
app.use("/countries", countries_1.default);
app.use("/subscription", subscription_1.default);
// swagger for documenting API:
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// for testing:
app.get("/ping", (req, res) => {
    return res.send("PONG!");
});
app.get("/auth", jwtMiddleware_1.default, (req, res) => {
    console.log(req.auth);
    return res.status(200).send(req.auth);
});
exports.default = app;
//! este archivo está siendo importado en index.ts de la raíz
