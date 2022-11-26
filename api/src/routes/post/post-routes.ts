import { Router } from "express";
import {
  findAllPostsResponse,
  handleNewPostRequest,
  handleSearchByQueryRequest,
  handleUpdateRequest,
  handleGetPostByIdRequest,
  handleDeletePostRequest,
} from "./post-middlewares";

const router = Router();

router.get("/findAll", findAllPostsResponse);
router.post("/newPost", handleNewPostRequest);
router.get("/search/", handleSearchByQueryRequest);
router.patch("/:_id", handleUpdateRequest);
router.get("/:_id", handleGetPostByIdRequest);
router.delete("/:_id", handleDeletePostRequest);

export default router;
