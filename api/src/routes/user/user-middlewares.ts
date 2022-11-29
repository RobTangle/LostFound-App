import { Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { User } from "../../mongoDB";
import { INewUser } from "../../mongoDB/models/User";
import { validateNewUser } from "../../validators/user-validators";
import {
  getUserByIdLeanOrThrowError,
  throwErrorIfEmailExistsInDB,
  userExistsInDBBoolean,
  updateNameAndProfileImg,
  handleDeleteAllDataFromUser,
} from "./user-auxiliaries";

// GET ALL USERS FROM DB (JUST FOR TESTING. NOT FOR PRODUCTION) :
export async function handleFindAllUsersRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    let allUsersFromDB = await User.find().exec();
    return res.status(200).send(allUsersFromDB);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
}

// GET USER INFO :
export async function handleGetUserInfoRequest(req: JWTRequest, res: Response) {
  try {
    const user_id = req.auth?.sub;
    const userFoundById = await getUserByIdLeanOrThrowError(user_id);
    return res.status(200).send(userFoundById);
  } catch (error: any) {
    console.log(`Error en 'user/userinfo. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// CREATE/REGISTER NEW USER :
export async function handleRegisterNewUserRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    console.log("REQ.BODY = ", req.body);
    console.log(req.auth);
    const _id = req.auth?.sub;

    const email_verified = req.auth?.email_verified;
    if (email_verified !== true) {
      console.log("Error: Email de usuario no verificado.");
      throw new Error(
        `El email de tu cuenta debe estar verificado para poder registrarte en LostFound.`
      );
    }
    const validatedNewUser: INewUser = validateNewUser(req.body, _id);
    await throwErrorIfEmailExistsInDB(validatedNewUser.email);
    const newUser = await User.create(validatedNewUser);

    return res.status(201).send(newUser);
  } catch (error: any) {
    console.log(`Error en POST '/newUser. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// USER EXSITS IN DB. res = {msg: true / false} :
export async function handleUserExistsInDBRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    // jwtCheck, // const userId = req.auth?.sub;
    const userId = req.auth?.sub;
    let existsBoolean = await userExistsInDBBoolean(userId);
    return res.status(200).send({ msg: existsBoolean });
  } catch (error: any) {
    console.log(`Error en GET "/user/existsInDB. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// UPDATE USER INFO :
export async function handleUpdateUserRequest(req: JWTRequest, res: Response) {
  try {
    const _id = req.auth?.sub;
    const { name, profile_img } = req.body;
    if (!_id) {
      throw new Error(`El user id '${_id}' no es válido.`);
    }
    const updatedObj = await updateNameAndProfileImg(name, profile_img, _id);

    return res.status(200).send(updatedObj);
  } catch (error: any) {
    console.log(`Error en PUT 'user/update'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// DELETE ALL USER DATA FROM DB :
export async function handleDeleteAllUserDataRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    const user_id = req.auth?.sub;
    const user_id_params = req.params._id;
    if (user_id !== user_id_params) {
      throw new Error(
        `El id del token del usuario no coincide con el id enviado por params.`
      );
    }
    const response = await handleDeleteAllDataFromUser(user_id);
    let responseStatus = response.status;
    return res.status(responseStatus).send(response);
  } catch (error: any) {
    console.log(`Error en DELETE 'user/destroyAll'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}
