"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("../../config/config");
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const post_1 = __importDefault(require("../../controllers/post"));
const router = (0, express_1.Router)();
// FIND ALL POSTS. FOR DEVELOPMENT, NOT PRODUCTION! :
if (config_1.config.environment.env === config_1.config.environment.development) {
    router.get("/findAll", post_1.default.findAllPostsResponse);
}
// CREATE A NEW POST :
router.post("/newPost", jwtMiddleware_1.default, post_1.default.handleNewPostRequest);
// SEARCH POSTS BY QUERY WITH PAGINATION :
router.get("/search", jwtMiddleware_1.default, post_1.default.handlePaginatedPostResultsRequest);
// UPDATE A POST :
router.patch("/:_id", jwtMiddleware_1.default, post_1.default.handleUpdateRequest);
// GET POST BY POST_ID IN PARAMS :
router.get("/:_id", jwtMiddleware_1.default, post_1.default.handleGetPostByIdRequest);
// DELETE POST BY POST_ID IN PARAMS :
router.delete("/:_id", jwtMiddleware_1.default, post_1.default.handleDeletePostRequest);
// CONTACT POST OWNER :
router.post("/contact/:post_id", jwtMiddleware_1.default, post_1.default.handleContactUserRequest);
exports.default = router;
