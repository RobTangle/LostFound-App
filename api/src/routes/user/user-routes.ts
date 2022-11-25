import { Router } from "express";
import {
  handleFindAllUsersRequest,
  handleGetUserInfoByIdRequest,
  handleRegisterNewUserRequest,
  handleUserExistsInDBRequest,
  handleUpdateUserRequest,
  handleDeleteAllUserDataRequest,
} from "./user-middlewares";

const router = Router();

router.get("/findAll", handleFindAllUsersRequest);
router.get("/userInfo/:_id", handleGetUserInfoByIdRequest);
router.post("/register", handleRegisterNewUserRequest);
router.get("/existsInDB/:_id", handleUserExistsInDBRequest);
router.patch("/update", handleUpdateUserRequest);
router.delete("/destroyAll/:_id", handleDeleteAllUserDataRequest);

export default router;
