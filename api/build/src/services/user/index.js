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
exports.deleteAllDataFromUser = exports.updateUserProfileSanitizing = exports.throwErrorIfUserIsNotRegisteredOrVoid = exports.userExistsInDBBoolean = exports.throwErrorIfEmailExistsInDB = exports.userIsRegisteredInDB = exports.getUserByIdLeanOrThrowError = exports.getUserByIdOrThrowError = exports.registerNewUser = void 0;
const mongoose_1 = require("mongoose");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const mongoDB_1 = require("../../mongoDB");
const genericValidators_1 = require("../../validators/genericValidators");
const user_validators_1 = require("../../validators/user-validators");
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
// UPDATE USER PROFILE WITH VALIDATE AND SANITIZE MONGOOSE FNS:
function updateUserProfileSanitizing(bodyFromReq, user_idFromReq) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = (0, genericValidators_1.checkValidUserIdFormatOrThrowError)(user_idFromReq);
        const userToUpdate = yield mongoDB_1.User.findByIdAndUpdate(user_id, { $set: bodyFromReq }, {
            sanitizeFilter: true,
            returnOriginal: false,
            runValidators: true,
        }).exec();
        if (userToUpdate) {
            console.log("Usuario actualizado");
            return userToUpdate;
        }
        else {
            throw new Error("Usuario no encontrado y no actualizado.");
        }
    });
}
exports.updateUserProfileSanitizing = updateUserProfileSanitizing;
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
exports.default = userServices;
