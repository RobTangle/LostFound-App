import { Router } from "express";
import jwtCheck from "../../config/jwtMiddleware";
import postControllers from "../../controllers/post";

const router = Router();

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
router.get("/findAll", postControllers.findAllPostsResponse);

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
router.post("/newPost", jwtCheck, postControllers.handleNewPostRequest);

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
router.get(
  "/search",
  jwtCheck,
  postControllers.handlePaginatedPostResultsRequest
);

// UPDATE A POST :
router.patch("/:_id", jwtCheck, postControllers.handleUpdateRequest);

// GET POST BY POST_ID IN PARAMS :
router.get("/:_id", jwtCheck, postControllers.handleGetPostByIdRequest);

// DELETE POST BY POST_ID IN PARAMS :
router.delete("/:_id", jwtCheck, postControllers.handleDeletePostRequest);

// CONTACT POST OWNER :
router.post(
  "/contact/:post_id",
  jwtCheck,
  postControllers.handleContactUserRequest
);

// SEARCH POSTS BY QUERY //? ruta vieja, antes de implementar paginado:
// router.get("/search", jwtCheck, handleSearchByQueryRequest);

export default router;
