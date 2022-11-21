import { IUser } from "../mongoDB/models/User";
import {
  isEmail,
  isFalsyArgument,
  isStringBetween1AndXCharsLong,
  isStringBetweenXAndYCharsLong,
  isValidString,
  isValidURLImage,
  stringContainsURLs,
} from "./genericValidators";

export function validateNewUser(objFromReq: any): IUser {
  const { _id, name, email, profile_img, posts } = objFromReq;
  const validatedUser = {
    _id: checkUserId(_id),
    name: checkUserName(name),
    email: checkUserEmail(email),
    profile_img: checkUserProfileImg(profile_img),
    posts: checkUserPosts(posts),
  };
  return validatedUser;
}

// CHECK USER ID :
function checkUserId(userId: string): string {
  if (isStringBetween1AndXCharsLong(50, userId)) {
    if (!stringContainsURLs(userId)) {
      return userId;
    }
  }
  throw new Error(`The user id "${userId}" is invalid.`);
}

// CHECK USER NAME :
function checkUserName(nameFromReq: any): string {
  if (isStringBetweenXAndYCharsLong(2, 50, nameFromReq)) {
    if (!stringContainsURLs(nameFromReq)) {
      return nameFromReq;
    }
  }
  throw new Error(`El nombre ingresado '${nameFromReq}' es inválido.`);
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
  if (isValidURLImage(profileImgFromReq)) {
    return profileImgFromReq;
  }
  throw new Error(`Error al validar profile image.`);
}

// CHECK USER POSTS :
function checkUserPosts(postsFromReq: any): [] {
  return [];
}
