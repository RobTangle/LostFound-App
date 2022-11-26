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
exports.handleGetUserSubscriptionsRequest = exports.handleUpdateSubscriptionByIdRequest = exports.handleDeleteSubscriptionByIdRequest = exports.handleCreateNewSubscriptionRequest = exports.handleFindAllSubscriptionsRequest = void 0;
const mongoDB_1 = require("../../mongoDB");
const subscription_r_auxiliary_1 = require("./subscription-r-auxiliary");
function handleFindAllSubscriptionsRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allSubscriptionsFromDB = yield mongoDB_1.Subscription.find().exec();
            return res.status(200).send(allSubscriptionsFromDB);
        }
        catch (error) {
            console.log(`Error en 'subscription/findAll'. ${error.message}`);
            return res.status(400).send(error.message);
        }
    });
}
exports.handleFindAllSubscriptionsRequest = handleFindAllSubscriptionsRequest;
function handleCreateNewSubscriptionRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.handleCreateNewSubscriptionRequest = handleCreateNewSubscriptionRequest;
function handleDeleteSubscriptionByIdRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.handleDeleteSubscriptionByIdRequest = handleDeleteSubscriptionByIdRequest;
function handleUpdateSubscriptionByIdRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.handleUpdateSubscriptionByIdRequest = handleUpdateSubscriptionByIdRequest;
function handleGetUserSubscriptionsRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.handleGetUserSubscriptionsRequest = handleGetUserSubscriptionsRequest;