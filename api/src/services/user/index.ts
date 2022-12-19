import { isValidObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { User, Post, Subscription } from "../../mongoDB";
import { INewUser } from "../../mongoDB/models/User";
import { checkValidUserIdFormatOrThrowError } from "../../validators/genericValidators";
import {
  validateNewUser,
  validateNewUserWithZod,
} from "../../validators/user-validators";

export async function registerNewUser(reqBody: any, reqAuth: any) {
  const user_id = reqAuth?.sub;
  const email_verified = reqAuth.email_verified;
  if (!user_id || typeof user_id !== "string") {
    console.log(
      "Error en registerNewUser: user_id falsy o no es typeof string."
    );
    throw new Error("Something went wrong :( ");
  }
  if (email_verified !== true) {
    console.log("Error: El email del usuario no está verificado.");
    throw new Error("Email must be verified before registering.");
  }
  const validatedNewUser = validateNewUserWithZod(reqBody, user_id);
  // const validatedNewUser: INewUser = validateNewUser(reqBody, user_id);
  await throwErrorIfEmailExistsInDB(validatedNewUser.email);
  const newUser = await User.create(validatedNewUser);
  return newUser;
}

export async function getUserByIdOrThrowError(userId: string | undefined) {
  if (!userId) {
    throw new Error(`El user id '${userId}' no es válido.`);
  }
  let userFromDB = await User.findById(userId).exec();
  if (userFromDB !== null) {
    return userFromDB;
  } else {
    throw new Error("Usuario no encontrado en la base de datos.");
  }
}

export async function getUserByIdLeanOrThrowError(userId: string | undefined) {
  if (!userId) {
    throw new Error(`El user id '${userId}' no es válido.`);
  }
  let userFromDB = await User.findById(userId).lean().exec();
  if (userFromDB !== null) {
    return userFromDB;
  } else {
    throw new Error("Usuario no encontrado en la base de datos.");
  }
}

export async function userIsRegisteredInDB(reqAuthSub: any): Promise<boolean> {
  if (!reqAuthSub) {
    throw new Error(`El req.auth.sub no puede ser falso.`);
  }
  if (typeof reqAuthSub !== "string") {
    throw new Error(`El req.auth.sub debe ser un string`);
  }
  const foundUserInDB = await User.findById(reqAuthSub, {
    _id: 1,
    email: 1,
  })
    .lean()
    .exec();
  if (foundUserInDB) {
    return true;
  } else {
    return false;
  }
}

export async function throwErrorIfEmailExistsInDB(
  emailFromReq: any
): Promise<void> {
  if (!isEmail(emailFromReq)) {
    throw new Error(
      `Error al chequear si el email existe en la DataBase: el email '${emailFromReq}' no tiene un formato de email válido.`
    );
  }
  let emailRegisteredAlready = await User.findOne(
    {
      email: { $eq: emailFromReq },
    },
    { _id: 1, name: 1 }
  )
    .lean()
    .exec();
  if (emailRegisteredAlready) {
    throw new Error(
      `El email '${emailFromReq}' ya se encuentra registrado en la Data Base. Nombre del usuario al que le pertenece ese email: '${emailRegisteredAlready.name}'`
    );
  }
}

export async function userExistsInDBBoolean(
  user_id: string | undefined
): Promise<boolean> {
  if (!user_id || typeof user_id !== "string") {
    throw new Error(`El id de usuario "${user_id}"a buscar no es válido.`);
  }
  const userInDB = await User.exists({ _id: { $eq: user_id } });
  if (userInDB) {
    return true;
  } else {
    return false;
  }
}

export async function throwErrorIfUserIsNotRegisteredOrVoid(
  user_id: string | undefined
) {
  if (!user_id || typeof user_id !== "string") {
    throw new Error(`El id de usuario "${user_id}"a buscar no es válido.`);
  }
  const userIsRegisteredInDBBoolean = await userExistsInDBBoolean(user_id);
  if (userIsRegisteredInDBBoolean !== true) {
    throw new Error(
      `Usuario con id "${user_id}" no está registrado en la base de datos.`
    );
  }
}

// UPDATE USER PROFILE WITH VALIDATE AND SANITIZE MONGOOSE FNS:
export async function updateUserProfileSanitizing(
  bodyFromReq: any,
  user_idFromReq: string | undefined
) {
  const user_id = checkValidUserIdFormatOrThrowError(user_idFromReq);

  const userToUpdate = await User.findByIdAndUpdate(
    user_id,
    { $set: bodyFromReq },
    {
      sanitizeFilter: true,
      returnOriginal: false,
      runValidators: true,
    }
  ).exec();

  if (userToUpdate) {
    console.log("Usuario actualizado");
    return userToUpdate;
  } else {
    throw new Error("Usuario no encontrado y no actualizado.");
  }
}

// HANDLE DELETE ALL DATA FROM USER :
export async function deleteAllDataFromUser(user_id: string | undefined) {
  let responseObj: any = {
    status: 200,
  };
  if ((!isValidObjectId(user_id) && typeof user_id !== "string") || !user_id) {
    console.log(
      `Error en handleDeleteAllDataFromUser. El user_id "${user_id}" no es válido.`
    );

    throw new Error(`El user_id ingresado "${user_id}" no es válido.`);
  }
  try {
    const userInDB = await User.findByIdAndDelete(user_id).exec();
    responseObj.userInDB = userInDB;
    const postsFromUser = await Post.deleteMany({
      "user_posting._id": user_id,
    }).exec();
    responseObj.postsFromUser = postsFromUser;
    const subscriptionsFromUser = await Subscription.deleteMany({
      "user_subscribed._id": user_id,
    }).exec();
    responseObj.subscriptionsFromUser = subscriptionsFromUser;
  } catch (error: any) {
    console.log(
      `Error en el handleDeleteAllDataFromUser con _id "${user_id}. ${error.message}`
    );
    responseObj.error = error.message;
    responseObj.status = 409;
  } finally {
    return responseObj;
  }
}

const userServices = {
  registerNewUser,
  getUserByIdOrThrowError,
  getUserByIdLeanOrThrowError,
  userIsRegisteredInDB,
  throwErrorIfEmailExistsInDB,
  userExistsInDBBoolean,
  throwErrorIfUserIsNotRegisteredOrVoid,
  updateUserProfileSanitizing,
  deleteAllDataFromUser,
};

export default userServices;
