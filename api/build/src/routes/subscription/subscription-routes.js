"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const subscription_middlewares_1 = require("./subscription-middlewares");
const router = (0, express_1.Router)();
router.get("/findAll", subscription_middlewares_1.handleFindAllSubscriptionsRequest);
// CREATE NEW SUBSCRIPTION :
router.post("/", jwtMiddleware_1.default, subscription_middlewares_1.handleCreateNewSubscriptionRequest);
// DELETE SUBSCRIPTION :
router.delete("/:subscription_id", jwtMiddleware_1.default, subscription_middlewares_1.handleDeleteSubscriptionByIdRequest);
// UPDATE SUBSCRIPTION :
router.patch("/:subscription_id", jwtMiddleware_1.default, subscription_middlewares_1.handleUpdateSubscriptionByIdRequest);
// GET ALL USER SUBSCRIPTIONS :
router.get("/userSubs", jwtMiddleware_1.default, subscription_middlewares_1.handleGetUserSubscriptionsRequest);
exports.default = router;
