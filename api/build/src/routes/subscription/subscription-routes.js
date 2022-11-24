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
const subscription_validators_1 = require("../../validators/subscription-validators");
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
        const validatedSubscription = (0, subscription_validators_1.validateSubscription)(req.body);
        const newSubscription = yield mongoDB_1.Subscription.create(validatedSubscription);
        console.log(`NEW SUBSCRIPTION = `, newSubscription);
        return res.status(200).send(newSubscription);
    }
    catch (error) {
        console.log(`Error en POST 'subscription/'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
