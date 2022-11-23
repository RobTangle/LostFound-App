import { Router, Request, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { User } from "../../mongoDB";
import { IUser } from "../../mongoDB/models/User";
import { validateNewUser } from "../../validators/user-validators";
import {
  getUserByIdLeanOrThrowError,
  throwErrorIfEmailExistsInDB,
  updateNameAndProfileImg,
  userExistsInDBBoolean,
} from "./user-auxiliaries";

const router = Router();

// GET ALL USERS :
router.get("/allUsers", async (req: Request, res: Response) => {
  try {
    let allUsersFromDB = await User.find();
    return res.status(200).send(allUsersFromDB);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
});

// GET USER BY ID :
router.get("/userinfo/:_id", async (req: JWTRequest, res: Response) => {
  try {
    // jwtCheck // const user_id = req.auth?.sub
    const user_id = req.params._id;
    const userFoundById = await getUserByIdLeanOrThrowError(user_id);
    return res.status(200).send(userFoundById);
  } catch (error: any) {
    console.log(`Error en 'user/userinfo. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// REGISTER NEW USER :
router.post("/register", async (req: JWTRequest, res: Response) => {
  try {
    console.log("REQ.BODY = ", req.body);
    // const _id = req.auth?.sub
    // CHEQUEAR SI REQ.AUTH.EMAIL_VERIFIED es true o false. Si es false, retornar con error y decir que debe verificar su email para registrarse.
    // const email_verified = req.auth?.email_verified;
    //  if (email_verified !== true) {
    //   throw new Error (`El email de tu cuenta debe estar verificado para poder registrarte en LostFound.`)
    //  }
    const validatedNewUser: IUser = validateNewUser(req.body);
    await throwErrorIfEmailExistsInDB(validatedNewUser.email);
    const newUser = await User.create(validatedNewUser);

    return res.status(200).send(newUser);
  } catch (error: any) {
    console.log(`Error en POST '/newUser. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// USER EXISTS IN THE DATA BASE (msg: true / false)
router.get("/existsInDB/:_id", async (req: JWTRequest, res: Response) => {
  try {
    // jwtCheck, // const userId = req.auth?.sub;
    const userId = req.params._id;
    let existsBoolean = await userExistsInDBBoolean(userId);
    return res.status(200).send({ msg: existsBoolean });
  } catch (error: any) {
    console.log(`Error en GET "/user/existsInDB. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// UPDATE NAME AND/OR PROFILE_IMG :
router.put("/update", async (req: JWTRequest, res: Response) => {
  try {
    //  jwtCheck // const _id = req.auth?.sub;
    const _id = req.body._id; // TEMPORARY UNTIL JWT APPLIES
    const { name, profile_img } = req.body;
    const updatedObj = await updateNameAndProfileImg(name, profile_img, _id);

    return res.status(200).send(updatedObj);
  } catch (error: any) {
    console.log(`Error en PUT 'user/update'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
