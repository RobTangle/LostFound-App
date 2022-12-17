"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// para importar esto, tengo que ir a tsconfig y decomentar "resolverJsonModule", que lo que hace es "Enable importing .json files".
const package_json_1 = require("../../package.json");
const LogWithColor_1 = __importDefault(require("./miscellanea/LogWithColor"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version: package_json_1.version,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*/index.*"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    // Swagger page
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    // Docs in JSON format
    app.get("docs.json", (req, res) => {
        res.setHeader("Content-type", "application/json");
        res.send(swaggerSpec);
    });
    LogWithColor_1.default.info(`Docs available at http://localhost:${port}/docs`);
}
exports.default = swaggerDocs;
