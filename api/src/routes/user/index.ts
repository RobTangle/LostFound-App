import { Router } from "express";
import jwtCheck from "../../config/jwtMiddleware";
import userControllers from "../../controllers/user";
import { config } from "../../config/config";

const router = Router();

// FIND ALL USERS (JUST FOR TESTING IN DEVELOPMENT. NOT FOR PRODUCTION) :
if (config.environment.env === config.environment.development) {
  router.get("/findAll", userControllers.findAllUsersHandler);
}

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

// UPDATE USER NAME :
router.patch("/updateName", jwtCheck, userControllers.updateUserNameHandler);

// UPDATE USER PROFILE IMG :
router.patch(
  "/updateProfileImg",
  jwtCheck,
  userControllers.updateUserProfileImgHandler
);

export default router;
