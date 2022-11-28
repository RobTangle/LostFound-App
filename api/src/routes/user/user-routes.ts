import { Router } from "express";
import jwtCheck from "../../config/jwtMiddleware";
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
router.post("/register", jwtCheck, handleRegisterNewUserRequest);
router.get("/existsInDB", jwtCheck, handleUserExistsInDBRequest);
router.patch("/update", handleUpdateUserRequest);
router.delete("/destroyAll/:_id", handleDeleteAllUserDataRequest);

export default router;
