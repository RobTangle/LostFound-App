"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const user_middlewares_1 = require("./user-middlewares");
const router = (0, express_1.Router)();
// FIND ALL USERS (JUST FOR TESTING. NOT FOR PRODUCTION) :
router.get("/findAll", user_middlewares_1.handleFindAllUsersRequest);
// GET USER INFO :
router.get("/userInfo", jwtMiddleware_1.default, user_middlewares_1.handleGetUserInfoRequest);
// CREATE/REGISTER NEW USER :
router.post("/register", jwtMiddleware_1.default, user_middlewares_1.handleRegisterNewUserRequest);
// USER EXSITS IN DB. res = {msg: true / false}
router.get("/existsInDB", jwtMiddleware_1.default, user_middlewares_1.handleUserExistsInDBRequest);
// UPDATE USER INFO :
router.patch("/update", jwtMiddleware_1.default, user_middlewares_1.handleUpdateUserSanitizingRequest);
// DELETE ALL USER DATA FROM DB :
router.delete("/destroyAll/:_id", jwtMiddleware_1.default, user_middlewares_1.handleDeleteAllUserDataRequest);
exports.default = router;
