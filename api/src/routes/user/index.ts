import { Router } from "express";
import jwtCheck from "../../config/jwtMiddleware";
import userControllers from "../../controllers/user";

const router = Router();

// FIND ALL USERS (JUST FOR TESTING. NOT FOR PRODUCTION) :
router.get("/findAll", userControllers.findAllUsersHandler);

// GET USER INFO :
router.get("/userInfo", jwtCheck, userControllers.getUserInfoHandler);

// CREATE/REGISTER NEW USER :
router.post("/register", jwtCheck, userControllers.registerNewUserHandler);

// USER EXSITS IN DB. res = {msg: true / false}
router.get("/existsInDB", jwtCheck, userControllers.userExistsInDBHandler);

// UPDATE USER INFO :
router.patch("/update", jwtCheck, userControllers.updateUserSanitizingHandler);

// DELETE ALL USER DATA FROM DB :
router.delete(
  "/destroyAll/:_id",
  jwtCheck,
  userControllers.deleteAllUserDataHandler
);

export default router;
