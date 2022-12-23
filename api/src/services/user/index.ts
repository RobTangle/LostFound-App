import { isValidObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { User, Post, Subscription } from "../../mongoDB";
import {
  checkValidUserIdFormatOrThrowError,
  isStringBetween1And50CharsLong,
} from "../../validators/genericValidators";
import {
  checkUserName,
  validateNewUserWithZod,
} from "../../validators/user-validators";
import { Request as JWTRequest } from "express-jwt";
import validator from "validator";

// REGISTER NEW USER :
export async function registerNewUser(req: JWTRequest) {
  const user_id = req.auth?.sub;
  const email_verified = req.auth?.email_verified;
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
  const validatedNewUser = validateNewUserWithZod(req.body, user_id);
  // const validatedNewUser: INewUser = validateNewUser(reqBody, user_id);
  await throwErrorIfEmailExistsInDB(validatedNewUser.email);
  const newUser = await User.create(validatedNewUser);
  return newUser;
}

// GET USER BY ID OR THROW ERROR :
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

// GET USER BY ID LEAN OR THROW ERROR :
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

// USER IS REGISTERED IN DB? :
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

// THROW ERROR IF EMAIL EXISTS IN DB :
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

// USER EXISTS IN DB? :
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

// THROW ERROR IF USER IS NOT REGISTERED OR VOID :
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

// UPDATE USER NAME AND/OR PROFILE_IMG :
export async function updateUserNameAndProfileImg(
  bodyFromReq: any,
  user_idFromReq: string | undefined
) {
  try {
    const user_id = checkValidUserIdFormatOrThrowError(user_idFromReq);
    const userToUpdate = await getUserByIdOrThrowError(user_id);

    // response object :
    let responseObj = {
      name: 0,
      profile_img: 0,
      msg: "",
      doc: {},
    };

    // Check name :
    if (bodyFromReq.name && bodyFromReq.name !== userToUpdate.name) {
      let newName = checkUserName(bodyFromReq.name);
      userToUpdate.name = newName;
      responseObj.name = 1;
      responseObj.msg = "Name updated. ";
    }

    // Check profile_img :
    if (
      bodyFromReq.profile_img &&
      bodyFromReq.profile_img !== userToUpdate.profile_img
    ) {
      if (validator.isURL(bodyFromReq.profile_img)) {
        userToUpdate.profile_img = bodyFromReq.profile_img;
        responseObj.profile_img = 1;
        responseObj.msg = responseObj.msg + "Profile image updated.";
      } else {
        responseObj.msg = responseObj.msg + "Invalid profile image. ";
      }
    }
    if (bodyFromReq.profile_img === "") {
      userToUpdate.profile_img =
        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png";
      responseObj.profile_img = 1;
      responseObj.msg = "Profile image set to default. ";
    }
    if (responseObj.name + responseObj.profile_img === 0) {
      console.log("Ningún input fue actualizado.");
      throw new Error("Invalid inputs. Nothing was updated");
    }

    // save document :
    const updatedDoc = await userToUpdate.save();
    responseObj.doc = updatedDoc;
    return responseObj;
  } catch (error: any) {
    console.log(`Error en fn updateUserNameAndProfileImg. ${error.message}`);
    throw new Error(`Something went wrong: ${error.message}`);
  }
}

// UPDATE USER PROFILE WITH VALIDATE AND SANITIZE MONGOOSE FNS: //! FUNCIÓN PELIGROSA YA QUE EN EL BODY ME PODRÍAN ENVIAR PROPIEDADES QUE NO SE DEBERÍAN PODER EDITAR, COMO CONTACTS, SUBSCRIPTIONS, ID, EMAIL, ETC.
//! Prestar atención a setear las propiedades específicas que yo quiero.
// export async function updateUserProfileSanitizing(
//   bodyFromReq: any,
//   user_idFromReq: string | undefined
// ) {
//   const user_id = checkValidUserIdFormatOrThrowError(user_idFromReq);

//   const userToUpdate = await User.findByIdAndUpdate(
//     user_id,
//     { $set: { name: bodyFromReq.name, profile_img: bodyFromReq.profile_img } },
//     {
//       sanitizeFilter: true,
//       returnOriginal: false,
//       runValidators: true,
//     }
//   ).exec();

//   if (userToUpdate) {
//     console.log("Usuario actualizado");
//     return userToUpdate;
//   } else {
//     throw new Error("Usuario no encontrado y no actualizado.");
//   }
// }

// DELETE ALL DATA FROM USER :
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

export async function updateUserName(
  user_id: string | undefined,
  name: unknown
) {
  if (!user_id) {
    console.log("Error en updateUserName. El user_id es falsy");
    throw new Error("Invalid user id");
  }
  if (!name) {
    console.log("Error en updateUserName. El name es falsy");
    throw new Error("Invalid name.");
  }
  // validar nuevo nombre:
  const validatedName = checkUserName(name);
  const userInDB = await User.findById(user_id);
  if (!userInDB) {
    console.log(
      "Error en fn updateUserName: Usuario no encontrado en la base de datos"
    );
    throw new Error("User not found in the DB");
  }

  // actualizo el nombre en el documento del usuario:
  userInDB.name = validatedName;

  //* si el usuario no tiene posts, entonces retorno el usuario actualizado
  if (userInDB.posts.length === 0) {
    const userUpdated = await userInDB.save();
    return userUpdated;
  }
  //* si el usuario tiene posts, entonces los busco y actualizo:
  // En los subdocs del doc del user en coll User:
  let subDocsEdited = 0;
  userInDB.posts.forEach((post) => {
    post.user_posting.name = validatedName;
    subDocsEdited++;
  });
  // guardo los cambios en el doc del User:
  const userUpdated = await userInDB.save();
  console.log(`subDocsEdited = ${subDocsEdited}`);

  // actualizo los documentos del usuario en la Coll Posts:
  const userPostsInPostCollection = await Post.where({
    "user_posting._id": user_id,
  })
    .setOptions({ multi: true, runValidators: true })
    .update({ $set: { "user_posting.name": validatedName } })
    .exec();
  console.log("userPostsInPostCollection = ", userPostsInPostCollection);

  // retorno el User document actualizado:
  return userUpdated;
}

const userServices = {
  registerNewUser,
  getUserByIdOrThrowError,
  getUserByIdLeanOrThrowError,
  userIsRegisteredInDB,
  throwErrorIfEmailExistsInDB,
  userExistsInDBBoolean,
  throwErrorIfUserIsNotRegisteredOrVoid,
  updateUserNameAndProfileImg,
  deleteAllDataFromUser,
  updateUserName,
};

export default userServices;
