import { User } from "../../mongoDB";
import { IUser } from "../../mongoDB/models/User";
import {
  isEmail,
  isStringBetweenXAndYCharsLong,
  isValidURLImage,
  stringContainsURLs,
} from "../../validators/genericValidators";

export async function getUserByIdOrThrowError(userId: string | undefined) {
  let userFromDB = await User.findById(userId);
  if (userFromDB !== null) {
    return userFromDB;
  } else {
    throw new Error("Usuario no encontrado en la base de datos.");
  }
}

export async function getUserByIdLeanOrThrowError(userId: string | undefined) {
  let userFromDB = await User.findById(userId).lean();
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
  }).lean();
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
  let emailRegisteredAlready: IUser | null = await User.findOne(
    {
      email: emailFromReq,
    },
    { _id: 1 }
  ).lean();
  if (emailRegisteredAlready) {
    throw new Error(
      `El email '${emailFromReq}' ya se encuentra registrado en la Data Base. Nombre del usuario al que le pertenece ese email: '${emailRegisteredAlready.name}'`
    );
  }
}

export async function userExistsInDBBoolean(
  user_id: string | undefined
): Promise<boolean> {
  const userInDB = await User.findById(user_id, { _id: 1 }).lean();
  if (userInDB) {
    return true;
  } else {
    return false;
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
