import { Router } from "express";
import { config } from "../../config/config";
import jwtCheck from "../../config/jwtMiddleware";
import postControllers from "../../controllers/post";

const router = Router();

// FIND ALL POSTS. FOR DEVELOPMENT, NOT PRODUCTION! :
if (config.environment.env === config.environment.development) {
  router.get("/findAll", postControllers.findAllPostsResponse);
}

// CREATE A NEW POST :
router.post("/newPost", jwtCheck, postControllers.handleNewPostRequest);

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

export default router;
