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
const express_1 = require("express");
const mongoDB_1 = require("../../mongoDB");
const subscription_r_auxiliary_1 = require("./subscription-r-auxiliary");
const router = (0, express_1.Router)();
router.get("/findAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSubscriptionsFromDB = yield mongoDB_1.Subscription.find();
        return res.status(200).send(allSubscriptionsFromDB);
    }
    catch (error) {
        console.log(`Error en 'subscription/findAll'. ${error.message}`);
        return res.status(400).send(error.message);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        //  jwtCheck    // const user_id = req.auth?.sub
        const user_id = req.body.user_subscribed._id;
        const objToReturn = yield (0, subscription_r_auxiliary_1.handleNewSubscription)(req.body, user_id);
        return res.status(200).send(objToReturn);
    }
    catch (error) {
        console.log(`Error en POST 'subscription/'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
router.delete("/:subscription_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  jwtCheck    // const user_id = req.auth?.sub
        const user_id = req.body.user_id;
        const subscription_id = req.params.subscription_id;
        const confirmationOfDeletion = yield (0, subscription_r_auxiliary_1.handleDeleteSubscription)(subscription_id, user_id);
        return res.status(200).send(confirmationOfDeletion);
    }
    catch (error) {
        console.log(`Error en DELETE 'subscription/'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
router.patch("/:subscription_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // jwtCheck // const user_id = req.auth.sub
        const user_id = req.body.user_id;
        const subscription_id = req.params.subscription_id;
        const confirmationOfUpdate = yield (0, subscription_r_auxiliary_1.handleUpdateSubscription)(subscription_id, user_id, req.body);
        return res.status(200).send(confirmationOfUpdate);
    }
    catch (error) {
        console.log(`Error en PATCH 'subscription/'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
router.get("/userSubs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // jwtCheck // const user_id = req.auth?.sub
        const user_id = req.body.user_id;
        const userSubscriptions = yield (0, subscription_r_auxiliary_1.handleGetUserSubscriptions)(user_id);
        return res.status(200).send(userSubscriptions);
    }
    catch (error) {
        console.log(`Error en GET 'subscription/userSubs'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
