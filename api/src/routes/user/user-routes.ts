import { Router, Request, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { User } from "../../mongoDB";
import { IUser } from "../../mongoDB/models/User";
import {
  isStringBetweenXAndYCharsLong,
  isValidString,
  isValidURLImage,
  stringContainsURLs,
} from "../../validators/genericValidators";
import { validateNewUser } from "../../validators/user-validators";
import { getUserByIdOrThrowError } from "./user-auxiliaries";

const router = Router();

router.get("/allUsers", async (req: Request, res: Response) => {
  try {
    let allUsersFromDB = await User.find();
    return res.status(200).send(allUsersFromDB);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
});

router.post("/newUser", async (req: JWTRequest, res: Response) => {
  try {
    console.log("REQ.BODY = ", req.body);
    // const _id = req.auth?.sub
    const validatedNewUser: IUser = validateNewUser(req.body);
    const newUser = await User.create(validatedNewUser);

    return res.status(200).send(newUser);
  } catch (error: any) {
    console.log(`Error en POST '/newUser. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// UPDATE NAME AND/OR PROFILE_IMG :
router.put("/update", async (req: JWTRequest, res: Response) => {
  try {
    // const _id = req.auth?.sub;
    const _id = req.body._id; // TEMPORARY UNTIL JWT APPLIES
    const { name, profile_img } = req.body;

    const userInDB = await getUserByIdOrThrowError(_id);
    if (name) {
      if (
        isStringBetweenXAndYCharsLong(2, 50, name) &&
        !stringContainsURLs(name)
      ) {
        userInDB.name = name;
      } else {
        throw new Error(`El nombre ingresado "${name}" no es válido.`);
      }
    }
    if (profile_img) {
      if (isValidURLImage(profile_img)) {
        userInDB.profile_img = profile_img;
      } else {
        throw new Error(
          `La URL de imágen de perfíl ingresada "${profile_img}" no es válida.`
        );
      }
    }
    await userInDB.save();
    return res.status(200).send(userInDB);
  } catch (error: any) {
    console.log(`Error en PUT 'user/update'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
