import { Router } from "express";
import jwtCheck from "../../config/jwtMiddleware";
import postControllers from "../../controllers/post";

const router = Router();

// FIND ALL POSTS (JUST FOR TESTING. NOT FOR PRODUCTION) :
router.get("/findAll", postControllers.findAllPostsResponse);

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

// SEARCH POSTS BY QUERY //? ruta vieja, antes de implementar paginado:
// router.get("/search", jwtCheck, handleSearchByQueryRequest);

export default router;
