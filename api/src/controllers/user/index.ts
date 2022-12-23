import { Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { User } from "../../mongoDB";

import { registerNewUser } from "../../services/user";
import userServices from "../../services/user";

// GET ALL USERS FROM DB (JUST FOR TESTING. NOT FOR PRODUCTION) :
export async function findAllUsersHandler(req: JWTRequest, res: Response) {
  try {
    let allUsersFromDB = await User.find().exec();
    return res.status(200).send(allUsersFromDB);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
}

// GET USER INFO :
export async function getUserInfoHandler(req: JWTRequest, res: Response) {
  try {
    const user_id = req.auth?.sub;
    const userFoundById = await userServices.getUserByIdLeanOrThrowError(
      user_id
    );
    return res.status(200).send(userFoundById);
  } catch (error: any) {
    console.log(`Error en 'user/userinfo. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// CREATE/REGISTER NEW USER :
export async function registerNewUserHandler(req: JWTRequest, res: Response) {
  try {
    const newUser = await registerNewUser(req);

    return res.status(201).send(newUser);
  } catch (error: any) {
    console.log(`Error en POST '/newUser. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// USER EXSITS IN DB. res = {msg: true / false} :
export async function userExistsInDBHandler(req: JWTRequest, res: Response) {
  try {
    // jwtCheck, // const userId = req.auth?.sub;
    const userId = req.auth?.sub;
    let existsBoolean = await userServices.userExistsInDBBoolean(userId);
    return res.status(200).send({ msg: existsBoolean });
  } catch (error: any) {
    console.log(`Error en GET "/user/existsInDB. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// UPDATE USER INFO SANITIZING REQUEST :
export async function updateUserSanitizingHandler(
  req: JWTRequest,
  res: Response
) {
  try {
    const user_id = req.auth?.sub;
    const response = await userServices.updateUserNameAndProfileImg(
      req.body,
      user_id
    );
    return res.status(200).send(response);
  } catch (error: any) {
    console.log(`Error en PUT 'user/update'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// DELETE ALL USER DATA FROM DB :
export async function deleteAllUserDataHandler(req: JWTRequest, res: Response) {
  try {
    const user_id = req.auth?.sub;
    const user_id_params = req.params._id;
    if (user_id !== user_id_params) {
      console.log(
        `Error en deleteAllUserDataHandler: El id del token del usuario no coincide con el id enviado por params.`
      );
      throw new Error("Something went wrong :(");
    }
    const response = await userServices.deleteAllDataFromUser(user_id);
    let responseStatus = response.status;
    return res.status(responseStatus).send(response);
  } catch (error: any) {
    console.log(`Error en DELETE 'user/destroyAll'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

export async function updateUserNameHandler(req: JWTRequest, res: Response) {
  try {
    const user_id = req.auth?.sub;
    const { name } = req.body;
    const updatedUser = await userServices.updateUserName(user_id, name);
    return res.status(200).send(updatedUser);
  } catch (error: any) {
    console.log(
      `Error en updateUserNameHandler 'user/updateName'. ${error.message}`
    );
    return res.status(400).send({ error: error.message });
  }
}

const userControllers = {
  findAllUsersHandler,
  getUserInfoHandler,
  registerNewUserHandler,
  userExistsInDBHandler,
  updateUserSanitizingHandler,
  deleteAllUserDataHandler,
  updateUserNameHandler,
};

export default userControllers;
