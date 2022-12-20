"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserProfileImg = exports.checkUserEmail = exports.validateNewUser = exports.validateNewUserWithZod = void 0;
const genericValidators_1 = require("./genericValidators");
const zod_1 = require("zod");
const newUserZSchema = zod_1.z.object({
    _id: zod_1.z.string().trim().min(1, { message: "Invalid id." }).max(50),
    name: zod_1.z.string().trim().min(2).max(50),
    email: zod_1.z.string().trim().email(),
    profile_img: zod_1.z.string().url().optional(),
    // contacts: z.array(z.number()).max(5),
});
function validateNewUserWithZod(objFromReq, _id) {
    const { name, email, profile_img } = objFromReq;
    const newUserToValidate = {
        _id,
        name: (0, genericValidators_1.sanitizeNameSimbols)(name),
        email,
        profile_img: (0, genericValidators_1.returnArgOrUndefinedIfFalsy)(profile_img),
    };
    return newUserZSchema.parse(newUserToValidate);
}
exports.validateNewUserWithZod = validateNewUserWithZod;
function validateNewUser(objFromReq, _id) {
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
exports.validateNewUser = validateNewUser;
// CHECK USER ID :
function checkUserId(userId) {
    if (!userId) {
        throw new Error("User id es falso");
    }
    if ((0, genericValidators_1.isStringBetween1AndXCharsLong)(50, userId)) {
        if (!(0, genericValidators_1.stringContainsURLs)(userId)) {
            return (0, genericValidators_1.sanitizeSimbols)(userId);
        }
    }
    throw new Error(`The user id "${userId}" is invalid.`);
}
// CHECK USER NAME :
function checkUserName(nameFromReq) {
    if ((0, genericValidators_1.isStringBetweenXAndYCharsLong)(2, 50, nameFromReq)) {
        if (!(0, genericValidators_1.stringContainsURLs)(nameFromReq)) {
            return (0, genericValidators_1.sanitizeSimbols)(nameFromReq);
        }
    }
    throw new Error(`El nombre ingresado '${nameFromReq}' es inválido.`);
}
//CHECK USER EMAIL :
function checkUserEmail(emailFromReq) {
    if ((0, genericValidators_1.isEmail)(emailFromReq)) {
        return emailFromReq;
    }
    throw new Error(`El email ingresado "${emailFromReq}" no es válido.`);
}
exports.checkUserEmail = checkUserEmail;
// CHECK USER PROFILE IMAGE :
function checkUserProfileImg(profileImgFromReq) {
    if ((0, genericValidators_1.isFalsyArgument)(profileImgFromReq)) {
        return undefined;
    }
    if ((0, genericValidators_1.isValidURLImage)(profileImgFromReq) ||
        (0, genericValidators_1.stringContainsURLs)(profileImgFromReq)) {
        return profileImgFromReq;
    }
    throw new Error(`Error al validar profile image.`);
}
exports.checkUserProfileImg = checkUserProfileImg;
// CHECK USER POSTS :
// function checkUserPosts(postsFromReq: any): [] {
//   return [];
// }
// CHECK USER POSTS :
// function checkUserSubscriptions(subscriptionsFromReq: any) {
//   return []
// }
