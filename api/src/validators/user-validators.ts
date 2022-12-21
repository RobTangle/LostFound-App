import { INewUser } from "../mongoDB/models/User";
import {
  isEmail,
  isFalsyArgument,
  isStringBetween1AndXCharsLong,
  isStringBetweenXAndYCharsLong,
  isValidURLImage,
  returnArgOrUndefinedIfFalsy,
  sanitizeNameSimbols,
  sanitizeSimbols,
  stringContainsURLs,
} from "./genericValidators";

import { z } from "zod";

const newUserZSchema = z.object({
  _id: z.string().trim().min(1, { message: "Invalid id." }).max(50),
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().email(),
  profile_img: z.string().url().optional(),
  // contacts: z.array(z.number()).max(5),
});

export function validateNewUserWithZod(
  objFromReq: any,
  _id: string | undefined
): INewUser {
  const { name, email, profile_img } = objFromReq;
  const newUserToValidate = {
    _id,
    name: sanitizeNameSimbols(name),
    email,
    profile_img: returnArgOrUndefinedIfFalsy(profile_img),
  };
  return newUserZSchema.parse(newUserToValidate);
}

export function validateNewUser(
  objFromReq: any,
  _id: string | undefined
): INewUser {
  const { name, email, profile_img } = objFromReq;
  const validatedUser = {
    _id: checkUserId(_id),
    name: checkUserName(name),
    email: checkUserEmail(email),
    profile_img: checkUserProfileImg(profile_img),
    // posts: checkUserPosts(posts),
    // subscriptions: checkUserSubscriptions(subscriptions),
  };
  return validatedUser;
}

// CHECK USER ID :
function checkUserId(userId: string | undefined): string {
  if (!userId) {
    throw new Error("User id es falso");
  }
  if (isStringBetween1AndXCharsLong(50, userId)) {
    if (!stringContainsURLs(userId)) {
      return sanitizeSimbols(userId);
    }
  }
  throw new Error(`The user id "${userId}" is invalid.`);
}

// CHECK USER NAME :
export function checkUserName(nameFromReq: any): string {
  if (isStringBetweenXAndYCharsLong(2, 50, nameFromReq)) {
    if (!stringContainsURLs(nameFromReq)) {
      return sanitizeSimbols(nameFromReq);
    }
  }
  throw new Error(`El nombre ingresado es inválido.`);
}

//CHECK USER EMAIL :
export function checkUserEmail(emailFromReq: any): string {
  if (isEmail(emailFromReq)) {
    return emailFromReq;
  }
  throw new Error(`El email ingresado "${emailFromReq}" no es válido.`);
}

// CHECK USER PROFILE IMAGE :
export function checkUserProfileImg(
  profileImgFromReq: any
): string | undefined {
  if (isFalsyArgument(profileImgFromReq)) {
    return undefined;
  }
  if (
    isValidURLImage(profileImgFromReq) ||
    stringContainsURLs(profileImgFromReq)
  ) {
    return profileImgFromReq;
  }
  throw new Error(`Error al validar profile image.`);
}

// CHECK USER POSTS :
// function checkUserPosts(postsFromReq: any): [] {
//   return [];
// }

// CHECK USER POSTS :
// function checkUserSubscriptions(subscriptionsFromReq: any) {
//   return []
// }
