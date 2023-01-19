"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserName = exports.deleteAllDataFromUser = exports.updateUserNameAndProfileImg = exports.throwErrorIfUserIsNotRegisteredOrVoid = exports.userExistsInDBBoolean = exports.throwErrorIfEmailExistsInDB = exports.userIsRegisteredInDB = exports.getUserByIdLeanOrThrowError = exports.getUserByIdOrThrowError = exports.registerNewUser = void 0;
const mongoose_1 = require("mongoose");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const mongoDB_1 = require("../../mongoDB");
const genericValidators_1 = require("../../validators/genericValidators");
const user_validators_1 = require("../../validators/user-validators");
const validator_1 = __importDefault(require("validator"));
const defaultModelsProps_1 = __importDefault(require("../../mongoDB/models/defaultModelsProps"));
// REGISTER NEW USER :
function registerNewUser(req) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
        const email_verified = (_b = req.auth) === null || _b === void 0 ? void 0 : _b.email_verified;
        if (!user_id || typeof user_id !== "string") {
            console.log("Error en registerNewUser: user_id falsy o no es typeof string.");
            throw new Error("Something went wrong :( ");
        }
        if (email_verified !== true) {
            console.log("Error: El email del usuario no está verificado.");
            throw new Error("Email must be verified before registering.");
        }
        const validatedNewUser = (0, user_validators_1.validateNewUserWithZod)(req.body, user_id);
        // const validatedNewUser: INewUser = validateNewUser(reqBody, user_id);
        yield throwErrorIfEmailExistsInDB(validatedNewUser.email);
        const newUser = yield mongoDB_1.User.create(validatedNewUser);
        return newUser;
    });
}
exports.registerNewUser = registerNewUser;
// GET USER BY ID OR THROW ERROR :
function getUserByIdOrThrowError(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!userId) {
            throw new Error(`El user id '${userId}' no es válido.`);
        }
        let userFromDB = yield mongoDB_1.User.findById(userId).exec();
        if (userFromDB !== null) {
            return userFromDB;
        }
        else {
            throw new Error("Usuario no encontrado en la base de datos.");
        }
    });
}
exports.getUserByIdOrThrowError = getUserByIdOrThrowError;
// GET USER BY ID LEAN OR THROW ERROR :
function getUserByIdLeanOrThrowError(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!userId) {
            throw new Error(`El user id '${userId}' no es válido.`);
        }
        let userFromDB = yield mongoDB_1.User.findById(userId).lean().exec();
        if (userFromDB !== null) {
            return userFromDB;
        }
        else {
            throw new Error("Usuario no encontrado en la base de datos.");
        }
    });
}
exports.getUserByIdLeanOrThrowError = getUserByIdLeanOrThrowError;
// USER IS REGISTERED IN DB? :
function userIsRegisteredInDB(reqAuthSub) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!reqAuthSub) {
            throw new Error(`El req.auth.sub no puede ser falso.`);
        }
        if (typeof reqAuthSub !== "string") {
            throw new Error(`El req.auth.sub debe ser un string`);
        }
        const foundUserInDB = yield mongoDB_1.User.findById(reqAuthSub, {
            _id: 1,
            email: 1,
        })
            .lean()
            .exec();
        if (foundUserInDB) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.userIsRegisteredInDB = userIsRegisteredInDB;
// THROW ERROR IF EMAIL EXISTS IN DB :
function throwErrorIfEmailExistsInDB(emailFromReq) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, isEmail_1.default)(emailFromReq)) {
            throw new Error(`Error al chequear si el email existe en la DataBase: el email '${emailFromReq}' no tiene un formato de email válido.`);
        }
        let emailRegisteredAlready = yield mongoDB_1.User.findOne({
            email: { $eq: emailFromReq },
        }, { _id: 1, name: 1 })
            .lean()
            .exec();
        if (emailRegisteredAlready) {
            throw new Error(`El email '${emailFromReq}' ya se encuentra registrado en la Data Base. Nombre del usuario al que le pertenece ese email: '${emailRegisteredAlready.name}'`);
        }
    });
}
exports.throwErrorIfEmailExistsInDB = throwErrorIfEmailExistsInDB;
// USER EXISTS IN DB? :
function userExistsInDBBoolean(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user_id || typeof user_id !== "string") {
            throw new Error(`El id de usuario "${user_id}"a buscar no es válido.`);
        }
        const userInDB = yield mongoDB_1.User.exists({ _id: { $eq: user_id } });
        if (userInDB) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.userExistsInDBBoolean = userExistsInDBBoolean;
// THROW ERROR IF USER IS NOT REGISTERED OR VOID :
function throwErrorIfUserIsNotRegisteredOrVoid(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user_id || typeof user_id !== "string") {
            throw new Error(`El id de usuario "${user_id}"a buscar no es válido.`);
        }
        const userIsRegisteredInDBBoolean = yield userExistsInDBBoolean(user_id);
        if (userIsRegisteredInDBBoolean !== true) {
            throw new Error(`Usuario con id "${user_id}" no está registrado en la base de datos.`);
        }
    });
}
exports.throwErrorIfUserIsNotRegisteredOrVoid = throwErrorIfUserIsNotRegisteredOrVoid;
// UPDATE USER NAME AND/OR PROFILE_IMG :
function updateUserNameAndProfileImg(bodyFromReq, user_idFromReq) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = (0, genericValidators_1.checkValidUserIdFormatOrThrowError)(user_idFromReq);
            const userToUpdate = yield getUserByIdOrThrowError(user_id);
            // response object :
            let responseObj = {
                name: 0,
                profile_img: 0,
                msg: "",
                doc: {},
            };
            // Check name :
            if (bodyFromReq.name && bodyFromReq.name !== userToUpdate.name) {
                let newName = (0, user_validators_1.checkUserName)(bodyFromReq.name);
                userToUpdate.name = newName;
                responseObj.name = 1;
                responseObj.msg = "Name updated. ";
            }
            // Check profile_img :
            if (bodyFromReq.profile_img &&
                bodyFromReq.profile_img !== userToUpdate.profile_img) {
                if (validator_1.default.isURL(bodyFromReq.profile_img)) {
                    userToUpdate.profile_img = bodyFromReq.profile_img;
                    responseObj.profile_img = 1;
                    responseObj.msg = responseObj.msg + "Profile image updated.";
                }
                else {
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
            const updatedDoc = yield userToUpdate.save();
            responseObj.doc = updatedDoc;
            return responseObj;
        }
        catch (error) {
            console.log(`Error en fn updateUserNameAndProfileImg. ${error.message}`);
            throw new Error(`Something went wrong: ${error.message}`);
        }
    });
}
exports.updateUserNameAndProfileImg = updateUserNameAndProfileImg;
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
function deleteAllDataFromUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let responseObj = {
            status: 200,
        };
        if ((!(0, mongoose_1.isValidObjectId)(user_id) && typeof user_id !== "string") || !user_id) {
            console.log(`Error en handleDeleteAllDataFromUser. El user_id "${user_id}" no es válido.`);
            throw new Error(`El user_id ingresado "${user_id}" no es válido.`);
        }
        try {
            const userInDB = yield mongoDB_1.User.findByIdAndDelete(user_id).exec();
            responseObj.userInDB = userInDB;
            const postsFromUser = yield mongoDB_1.Post.deleteMany({
                "user_posting._id": user_id,
            }).exec();
            responseObj.postsFromUser = postsFromUser;
            const subscriptionsFromUser = yield mongoDB_1.Subscription.deleteMany({
                "user_subscribed._id": user_id,
            }).exec();
            responseObj.subscriptionsFromUser = subscriptionsFromUser;
        }
        catch (error) {
            console.log(`Error en el handleDeleteAllDataFromUser con _id "${user_id}. ${error.message}`);
            responseObj.error = error.message;
            responseObj.status = 409;
        }
        finally {
            return responseObj;
        }
    });
}
exports.deleteAllDataFromUser = deleteAllDataFromUser;
function updateUserName(user_id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user_id) {
            console.log("Error en updateUserName. El user_id es falsy");
            throw new Error("Invalid user id");
        }
        if (!name) {
            console.log("Error en updateUserName. El name es falsy");
            throw new Error("Invalid name.");
        }
        // validar nuevo nombre:
        const validatedName = (0, user_validators_1.checkUserName)(name);
        const userInDB = yield mongoDB_1.User.findById(user_id);
        if (!userInDB) {
            console.log("Error en fn updateUserName: Usuario no encontrado en la base de datos");
            throw new Error("User not found in the DB");
        }
        // actualizo el nombre en el documento del usuario:
        userInDB.name = validatedName;
        //* si el usuario no tiene posts, entonces retorno el usuario actualizado
        if (userInDB.posts.length === 0) {
            const userUpdated = yield userInDB.save();
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
        const userUpdated = yield userInDB.save();
        console.log(`subDocsEdited = ${subDocsEdited}`);
        // actualizo los documentos del usuario en la Coll Posts:
        const userPostsInPostCollection = yield mongoDB_1.Post.where({
            "user_posting._id": user_id,
        })
            .setOptions({ runValidators: true })
            .updateMany({ $set: { "user_posting.name": validatedName } })
            .exec();
        console.log("userPostsInPostCollection = ", userPostsInPostCollection);
        // retorno el User document actualizado:
        return userUpdated;
    });
}
exports.updateUserName = updateUserName;
function updateUserProfileImg(user_id, newProfile_img) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user_id) {
            console.log("Error en updateUserName. El user_id es falsy");
            throw new Error("Invalid user id");
        }
        // validate new profile img, or use default img if falsy arg:
        const newProfileImage = (0, user_validators_1.checkUserProfileImg)(newProfile_img) ||
            defaultModelsProps_1.default.user.profile_img.defaultImage;
        // find User in DB:
        const userInDB = yield mongoDB_1.User.findById(user_id);
        if (!userInDB) {
            console.log("Error en fn updateUserName: Usuario no encontrado en la base de datos");
            throw new Error("User not found in the DB");
        }
        // actualizo la profile_img en el documento del usuario:
        userInDB.profile_img = newProfileImage;
        //* si el usuario no tiene posts, entonces retorno el usuario actualizado
        if (userInDB.posts.length === 0) {
            const userUpdated = yield userInDB.save();
            return userUpdated;
        }
        //* si el usuario tiene posts, entonces los busco y actualizo:
        // En los subdocs del doc del user en coll User:
        let subDocsEdited = 0;
        userInDB.posts.forEach((post) => {
            post.user_posting.profile_img = newProfileImage;
            subDocsEdited++;
        });
        // guardo los cambios en el doc del User:
        const userUpdated = yield userInDB.save();
        console.log(`subDocsEdited = ${subDocsEdited}`);
        // actualizo los documentos del usuario en la Coll Posts:
        const userPostsInPostCollection = yield mongoDB_1.Post.where({
            "user_posting._id": user_id,
        })
            .setOptions({ runValidators: true })
            .updateMany({ $set: { "user_posting.profile_img": newProfileImage } })
            .exec();
        console.log("userPostsInPostCollection = ", userPostsInPostCollection);
        // retorno el User document actualizado:
        return userUpdated;
    });
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
    updateUserProfileImg,
};
exports.default = userServices;
