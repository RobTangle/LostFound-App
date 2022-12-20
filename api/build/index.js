"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const LogWithColor_1 = __importDefault(require("./src/utils/miscellanea/LogWithColor"));
const config_1 = require("./src/config/config");
const PORT = ((_a = config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.server) === null || _a === void 0 ? void 0 : _a.port) || 3001;
const app_1 = __importDefault(require("./src/app"));
app_1.default.listen(PORT, () => {
    LogWithColor_1.default.infoBGC(` App listening on port ${PORT} `);
});
