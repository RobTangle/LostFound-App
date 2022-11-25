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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteAllDataFromUser = exports.updateNameAndProfileImg = exports.throwErrorIfUserIsNotRegisteredOrVoid = exports.userExistsInDBBoolean = exports.throwErrorIfEmailExistsInDB = exports.userIsRegisteredInDB = exports.getUserByIdLeanOrThrowError = exports.getUserByIdOrThrowError = void 0;
const mongoose_1 = require("mongoose");
const mongoDB_1 = require("../../mongoDB");
const genericValidators_1 = require("../../validators/genericValidators");
function getUserByIdOrThrowError(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let userFromDB = yield mongoDB_1.User.findById(userId);
        if (userFromDB !== null) {
            return userFromDB;
        }
        else {
            throw new Error("Usuario no encontrado en la base de datos.");
        }
    });
}
exports.getUserByIdOrThrowError = getUserByIdOrThrowError;
function getUserByIdLeanOrThrowError(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let userFromDB = yield mongoDB_1.User.findById(userId).lean();
        if (userFromDB !== null) {
            return userFromDB;
        }
        else {
            throw new Error("Usuario no encontrado en la base de datos.");
        }
    });
}
exports.getUserByIdLeanOrThrowError = getUserByIdLeanOrThrowError;
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
        }).lean();
        if (foundUserInDB) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.userIsRegisteredInDB = userIsRegisteredInDB;
function throwErrorIfEmailExistsInDB(emailFromReq) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, genericValidators_1.isEmail)(emailFromReq)) {
            throw new Error(`Error al chequear si el email existe en la DataBase: el email '${emailFromReq}' no tiene un formato de email válido.`);
        }
        let emailRegisteredAlready = yield mongoDB_1.User.findOne({
            email: emailFromReq,
        }, { _id: 1 }).lean();
        if (emailRegisteredAlready) {
            throw new Error(`El email '${emailFromReq}' ya se encuentra registrado en la Data Base. Nombre del usuario al que le pertenece ese email: '${emailRegisteredAlready.name}'`);
        }
    });
}
exports.throwErrorIfEmailExistsInDB = throwErrorIfEmailExistsInDB;
function userExistsInDBBoolean(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user_id || typeof user_id !== "string") {
            throw new Error(`El id de usuario "${user_id}"a buscar no es válido.`);
        }
        const userInDB = yield mongoDB_1.User.findById(user_id, { _id: 1 }).lean();
        if (userInDB) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.userExistsInDBBoolean = userExistsInDBBoolean;
function throwErrorIfUserIsNotRegisteredOrVoid(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userIsRegisteredInDBBoolean = yield userExistsInDBBoolean(user_id);
        if (userIsRegisteredInDBBoolean !== true) {
            throw new Error(`Usuario con id "${user_id}" no está registrado en la base de datos.`);
        }
    });
}
exports.throwErrorIfUserIsNotRegisteredOrVoid = throwErrorIfUserIsNotRegisteredOrVoid;
function updateNameAndProfileImg(name, profile_img, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInDB = yield getUserByIdOrThrowError(user_id);
        let updated = {
            name: 0,
            profile_img: 0,
            userUpdated: undefined,
        };
        if (name) {
            if ((0, genericValidators_1.isStringBetweenXAndYCharsLong)(2, 50, name) &&
                !(0, genericValidators_1.stringContainsURLs)(name)) {
                userInDB.name = name;
                updated.name = 1;
            }
            else {
                throw new Error(`El nombre ingresado "${name}" no es válido.`);
            }
        }
        if (profile_img) {
            if ((0, genericValidators_1.isValidURLImage)(profile_img)) {
                userInDB.profile_img = profile_img;
                updated.profile_img = 1;
            }
            else {
                throw new Error(`La URL de imágen de perfíl ingresada "${profile_img}" no es válida.`);
            }
        }
        yield userInDB.save();
        updated.userUpdated = userInDB;
        return updated;
    });
}
exports.updateNameAndProfileImg = updateNameAndProfileImg;
// HANDLE DELETE ALL DATA FROM USER :
function handleDeleteAllDataFromUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let responseObj = {
            status: 200,
        };
        if ((!(0, mongoose_1.isValidObjectId)(user_id) && typeof user_id !== "string") || !user_id) {
            console.log(`Error en handleDeleteAllDataFromUser. El user_id "${user_id}" no es válido.`);
            throw new Error(`El user_id ingresado "${user_id}" no es válido.`);
        }
        try {
            const userInDB = yield mongoDB_1.User.findByIdAndDelete(user_id);
            responseObj.userInDB = userInDB;
            const postsFromUser = yield mongoDB_1.Post.deleteMany({
                "user_posting._id": user_id,
            });
            responseObj.postsFromUser = postsFromUser;
            const subscriptionsFromUser = yield mongoDB_1.Subscription.deleteMany({
                "user_subscribed._id": user_id,
            });
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
exports.handleDeleteAllDataFromUser = handleDeleteAllDataFromUser;
