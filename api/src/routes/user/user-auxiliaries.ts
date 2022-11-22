import { User } from "../../mongoDB";
import { IUser } from "../../mongoDB/models/User";
import { isEmail } from "../../validators/genericValidators";

export async function getUserByIdOrThrowError(userId: string) {
  let userFromDB = await User.findById(userId);
  if (userFromDB !== null) {
    return userFromDB;
  } else {
    throw new Error("Usuario no encontrado en la base de datos.");
  }
}

export async function getUserByIdLeanOrThrowError(userId: string) {
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

export async function emailExistsInDataBase(emailFromReq: any): Promise<void> {
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
