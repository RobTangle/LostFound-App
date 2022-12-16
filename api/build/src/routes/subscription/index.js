"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const subscription_1 = __importDefault(require("../../controllers/subscription"));
const router = (0, express_1.Router)();
router.get("/findAll", subscription_1.default.handleFindAllSubscriptionsRequest);
// CREATE NEW SUBSCRIPTION :
router.post("/", jwtMiddleware_1.default, subscription_1.default.handleCreateNewSubscriptionRequest);
// DELETE SUBSCRIPTION :
router.delete("/:subscription_id", jwtMiddleware_1.default, subscription_1.default.handleDeleteSubscriptionByIdRequest);
// UPDATE SUBSCRIPTION :
router.patch("/:subscription_id", jwtMiddleware_1.default, subscription_1.default.handleUpdateSubscriptionByIdRequest);
// GET ALL USER SUBSCRIPTIONS :
router.get("/userSubs", jwtMiddleware_1.default, subscription_1.default.handleGetUserSubscriptionsRequest);
exports.default = router;
