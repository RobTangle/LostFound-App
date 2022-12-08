import { Router } from "express";
import jwtCheck from "../../config/jwtMiddleware";
import {
  handleFindAllUsersRequest,
  handleRegisterNewUserRequest,
  handleUserExistsInDBRequest,
  handleDeleteAllUserDataRequest,
  handleGetUserInfoRequest,
  handleUpdateUserSanitizingRequest,
} from "./user-middlewares";

const router = Router();

// FIND ALL USERS (JUST FOR TESTING. NOT FOR PRODUCTION) :
router.get("/findAll", handleFindAllUsersRequest);

// GET USER INFO :
router.get("/userInfo", jwtCheck, handleGetUserInfoRequest);

// CREATE/REGISTER NEW USER :
router.post("/register", jwtCheck, handleRegisterNewUserRequest);

// USER EXSITS IN DB. res = {msg: true / false}
router.get("/existsInDB", jwtCheck, handleUserExistsInDBRequest);

// UPDATE USER INFO :
router.patch("/update", jwtCheck, handleUpdateUserSanitizingRequest);

// DELETE ALL USER DATA FROM DB :
router.delete("/destroyAll/:_id", jwtCheck, handleDeleteAllUserDataRequest);

export default router;
