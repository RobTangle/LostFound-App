import { Router } from "express";
import jwtCheck from "../../config/jwtMiddleware";
import {
  findAllPostsResponse,
  handleNewPostRequest,
  handleSearchByQueryRequest,
  handleUpdateRequest,
  handleGetPostByIdRequest,
  handleDeletePostRequest,
  handleContactUserRequest,
} from "./post-middlewares";

const router = Router();

// FIND ALL POSTS (JUST FOR TESTING. NOT FOR PRODUCTION) :
router.get("/findAll", findAllPostsResponse);

// CREATE A NEW POST :
router.post("/newPost", jwtCheck, handleNewPostRequest);

// SEARCH POSTS BY QUERY :
router.get("/search", jwtCheck, handleSearchByQueryRequest);

// UPDATE A POST :
router.patch("/:_id", jwtCheck, handleUpdateRequest);

// GET POST BY POST_ID IN PARAMS :
router.get("/:_id", jwtCheck, handleGetPostByIdRequest);

// DELETE POST BY POST_ID IN PARAMS :
router.delete("/:_id", jwtCheck, handleDeletePostRequest);

// CONTACT POST OWNER :
router.post("/contact/:post_id", jwtCheck, handleContactUserRequest);

export default router;
