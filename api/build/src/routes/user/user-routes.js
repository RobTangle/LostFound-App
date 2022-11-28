"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const user_middlewares_1 = require("./user-middlewares");
const router = (0, express_1.Router)();
router.get("/findAll", user_middlewares_1.handleFindAllUsersRequest);
router.get("/userInfo/:_id", user_middlewares_1.handleGetUserInfoByIdRequest);
router.post("/register", jwtMiddleware_1.default, user_middlewares_1.handleRegisterNewUserRequest);
router.get("/existsInDB", jwtMiddleware_1.default, user_middlewares_1.handleUserExistsInDBRequest);
router.patch("/update", user_middlewares_1.handleUpdateUserRequest);
router.delete("/destroyAll/:_id", user_middlewares_1.handleDeleteAllUserDataRequest);
exports.default = router;
