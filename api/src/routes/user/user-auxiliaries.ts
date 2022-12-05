import { isValidObjectId } from "mongoose";
import { Post, Subscription, User } from "../../mongoDB";
import { IUser } from "../../mongoDB/models/User";
import {
  isEmail,
  isStringBetweenXAndYCharsLong,
  isValidURLImage,
  stringContainsURLs,
} from "../../validators/genericValidators";

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
  const userInDB = await User.findById(user_id, { _id: 1 }).lean().exec();
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

export async function updateNameAndProfileImg(
  name: string | undefined,
  profile_img: string | undefined,
  user_id: string | undefined
) {
  const userInDB = await getUserByIdOrThrowError(user_id);
  let updated: {
    userUpdated:
      | (import("mongoose").Document<unknown, any, { [x: string]: any }> & {
          [x: string]: any;
        } & Required<{ _id: unknown }>)
      | undefined;
    name: number;
    profile_img: number;
  } = {
    name: 0,
    profile_img: 0,
    userUpdated: undefined,
  };
  if (name) {
    if (
      isStringBetweenXAndYCharsLong(2, 50, name) &&
      !stringContainsURLs(name)
    ) {
      userInDB.name = name;
      updated.name = 1;
    } else {
      throw new Error(`El nombre ingresado "${name}" no es válido.`);
    }
  }
  if (profile_img) {
    if (isValidURLImage(profile_img)) {
      userInDB.profile_img = profile_img;
      updated.profile_img = 1;
    } else {
      throw new Error(
        `La URL de imágen de perfíl ingresada "${profile_img}" no es válida.`
      );
    }
  }
  await userInDB.save();
  updated.userUpdated = userInDB;
  return updated;
}

// HANDLE DELETE ALL DATA FROM USER :
export async function handleDeleteAllDataFromUser(user_id: string | undefined) {
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
