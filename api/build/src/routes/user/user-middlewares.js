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
exports.handleDeleteAllUserDataRequest = exports.handleUpdateUserRequest = exports.handleUserExistsInDBRequest = exports.handleRegisterNewUserRequest = exports.handleGetUserInfoByIdRequest = exports.handleFindAllUsersRequest = void 0;
const mongoDB_1 = require("../../mongoDB");
const user_validators_1 = require("../../validators/user-validators");
const user_auxiliaries_1 = require("./user-auxiliaries");
function handleFindAllUsersRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let allUsersFromDB = yield mongoDB_1.User.find().exec();
            return res.status(200).send(allUsersFromDB);
        }
        catch (error) {
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleFindAllUsersRequest = handleFindAllUsersRequest;
function handleGetUserInfoByIdRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // jwtCheck // const user_id = req.auth?.sub
            const user_id = req.params._id;
            const userFoundById = yield (0, user_auxiliaries_1.getUserByIdLeanOrThrowError)(user_id);
            return res.status(200).send(userFoundById);
        }
        catch (error) {
            console.log(`Error en 'user/userinfo. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleGetUserInfoByIdRequest = handleGetUserInfoByIdRequest;
function handleRegisterNewUserRequest(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("REQ.BODY = ", req.body);
            console.log(req.auth);
            const _id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            // CHEQUEAR SI REQ.AUTH.EMAIL_VERIFIED es true o false. Si es false, retornar con error y decir que debe verificar su email para registrarse.
            const email_verified = (_b = req.auth) === null || _b === void 0 ? void 0 : _b.email_verified;
            if (email_verified !== true) {
                console.log("Error: Email de usuario no verificado.");
                throw new Error(`El email de tu cuenta debe estar verificado para poder registrarte en LostFound.`);
            }
            const validatedNewUser = (0, user_validators_1.validateNewUser)(req.body, _id);
            yield (0, user_auxiliaries_1.throwErrorIfEmailExistsInDB)(validatedNewUser.email);
            const newUser = yield mongoDB_1.User.create(validatedNewUser);
            return res.status(201).send(newUser);
        }
        catch (error) {
            console.log(`Error en POST '/newUser. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleRegisterNewUserRequest = handleRegisterNewUserRequest;
function handleUserExistsInDBRequest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // jwtCheck, // const userId = req.auth?.sub;
            const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            let existsBoolean = yield (0, user_auxiliaries_1.userExistsInDBBoolean)(userId);
            return res.status(200).send({ msg: existsBoolean });
        }
        catch (error) {
            console.log(`Error en GET "/user/existsInDB. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleUserExistsInDBRequest = handleUserExistsInDBRequest;
function handleUpdateUserRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //  jwtCheck // const _id = req.auth?.sub;
            const _id = req.body._id; // TEMPORARY UNTIL JWT APPLIES
            const { name, profile_img } = req.body;
            const updatedObj = yield (0, user_auxiliaries_1.updateNameAndProfileImg)(name, profile_img, _id);
            return res.status(200).send(updatedObj);
        }
        catch (error) {
            console.log(`Error en PUT 'user/update'. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleUpdateUserRequest = handleUpdateUserRequest;
function handleDeleteAllUserDataRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // jwtCheck // const user_id = req.auth?.sub
            const user_id = req.params._id;
            const response = yield (0, user_auxiliaries_1.handleDeleteAllDataFromUser)(user_id);
            let responseStatus = response.status;
            return res.status(responseStatus).send(response);
        }
        catch (error) {
            console.log(`Error en DELETE 'user/destroyAll'. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.handleDeleteAllUserDataRequest = handleDeleteAllUserDataRequest;
