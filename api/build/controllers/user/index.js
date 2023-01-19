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
exports.updateUserProfileImgHandler = exports.updateUserNameHandler = exports.deleteAllUserDataHandler = exports.updateUserSanitizingHandler = exports.userExistsInDBHandler = exports.registerNewUserHandler = exports.getUserInfoHandler = exports.findAllUsersHandler = void 0;
const mongoDB_1 = require("../../mongoDB");
const user_1 = require("../../services/user");
const user_2 = __importDefault(require("../../services/user"));
// GET ALL USERS FROM DB (JUST FOR TESTING. NOT FOR PRODUCTION) :
function findAllUsersHandler(req, res) {
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
exports.findAllUsersHandler = findAllUsersHandler;
// GET USER INFO :
function getUserInfoHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            const userFoundById = yield user_2.default.getUserByIdLeanOrThrowError(user_id);
            return res.status(200).send(userFoundById);
        }
        catch (error) {
            console.log(`Error en 'user/userinfo. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.getUserInfoHandler = getUserInfoHandler;
// CREATE/REGISTER NEW USER :
function registerNewUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield (0, user_1.registerNewUser)(req);
            return res.status(201).send(newUser);
        }
        catch (error) {
            console.log(`Error en POST '/newUser. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.registerNewUserHandler = registerNewUserHandler;
// USER EXSITS IN DB. res = {msg: true / false} :
function userExistsInDBHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // jwtCheck, // const userId = req.auth?.sub;
            const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            let existsBoolean = yield user_2.default.userExistsInDBBoolean(userId);
            return res.status(200).send({ msg: existsBoolean });
        }
        catch (error) {
            console.log(`Error en GET "/user/existsInDB. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.userExistsInDBHandler = userExistsInDBHandler;
// UPDATE USER INFO SANITIZING REQUEST :
function updateUserSanitizingHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            const response = yield user_2.default.updateUserNameAndProfileImg(req.body, user_id);
            return res.status(200).send(response);
        }
        catch (error) {
            console.log(`Error en PUT 'user/update'. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.updateUserSanitizingHandler = updateUserSanitizingHandler;
// DELETE ALL USER DATA FROM DB :
function deleteAllUserDataHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            const user_id_params = req.params._id;
            if (user_id !== user_id_params) {
                console.log(`Error en deleteAllUserDataHandler: El id del token del usuario no coincide con el id enviado por params.`);
                throw new Error("Something went wrong :(");
            }
            const response = yield user_2.default.deleteAllDataFromUser(user_id);
            let responseStatus = response.status;
            return res.status(responseStatus).send(response);
        }
        catch (error) {
            console.log(`Error en DELETE 'user/destroyAll'. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.deleteAllUserDataHandler = deleteAllUserDataHandler;
function updateUserNameHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            const { name } = req.body;
            const updatedUser = yield user_2.default.updateUserName(user_id, name);
            return res.status(200).send(updatedUser);
        }
        catch (error) {
            console.log(`Error en updateUserNameHandler 'user/updateName'. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.updateUserNameHandler = updateUserNameHandler;
function updateUserProfileImgHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
            const { profile_img } = req.body;
            const updatedUser = yield user_2.default.updateUserProfileImg(user_id, profile_img);
            return res.status(200).send(updatedUser);
        }
        catch (error) {
            console.log(`Error en updateUserProfileImgHandler 'user/updateProfileImg'. ${error.message}`);
            return res.status(400).send({ error: error.message });
        }
    });
}
exports.updateUserProfileImgHandler = updateUserProfileImgHandler;
const userControllers = {
    findAllUsersHandler,
    getUserInfoHandler,
    registerNewUserHandler,
    userExistsInDBHandler,
    updateUserSanitizingHandler,
    deleteAllUserDataHandler,
    updateUserNameHandler,
    updateUserProfileImgHandler,
};
exports.default = userControllers;
