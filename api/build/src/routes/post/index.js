"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const post_1 = __importDefault(require("../../controllers/post"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Post collection management and retrieval
 */
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
/**
 * @openapi
 * /post/findAll:
 *   get:
 *     description: Gets all the documents in the collection Post.
 *     responses:
 *       200:
 *         description: Returns a all the documents from the Post collection.
 */
// FIND ALL POSTS (JUST FOR TESTING. NOT FOR PRODUCTION) :
router.get("/findAll", post_1.default.findAllPostsResponse);
/**
 * @openapi
 * /post/newPost:
 *   post:
 *          description: Creates a new document in the Post Collection.
 *          responses:
 *            201:
 *              description: It returns the new document.
 */
// CREATE A NEW POST :
router.post("/newPost", jwtMiddleware_1.default, post_1.default.handleNewPostRequest);
/**
 * @openapi
 * /post/search:
 *   get:
 *     description: Find all posts by query params!
 *     responses:
 *       200:
 *         description: Returns a all the documents found using the query params, and with pagination.
 */
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
// SEARCH POSTS BY QUERY //? ruta vieja, antes de implementar paginado:
// router.get("/search", jwtCheck, handleSearchByQueryRequest);
exports.default = router;
