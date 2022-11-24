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
exports.handleUpdateSubscription = exports.handleDeleteSubscription = exports.handleNewSubscription = void 0;
const mongoose_1 = require("mongoose");
const mongoDB_1 = require("../../mongoDB");
const subscription_validators_1 = require("../../validators/subscription-validators");
const user_auxiliaries_1 = require("../user/user-auxiliaries");
function handleNewSubscription(bodyFromReq, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInDB = yield (0, user_auxiliaries_1.getUserByIdOrThrowError)(user_id);
        const user_subscribed = {
            _id: userInDB._id,
            name: userInDB.name,
            email: userInDB.email,
        };
        const validatedSubscription = (0, subscription_validators_1.validateSubscription)(Object.assign(Object.assign({}, bodyFromReq), { user_subscribed }));
        const newSubscription = yield mongoDB_1.Subscription.create(validatedSubscription);
        userInDB.subscriptions.push(newSubscription);
        yield userInDB.save();
        console.log("New subscription pushed to user.subscriptions");
        console.log(`NEW SUBSCRIPTION = `, newSubscription);
        return {
            new_subscription: newSubscription,
            user_subscribed: userInDB,
        };
    });
}
exports.handleNewSubscription = handleNewSubscription;
function handleDeleteSubscription(subscription_id, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, mongoose_1.isValidObjectId)(subscription_id)) {
            console.log("El subscription_id enviado por params no es ObjectId válido.");
            throw new Error("El al validar el _id de la subscripción a borrar.");
        }
        // Borrar la Subscription de la collection Subscription y del arreglo user.subscriptions.
        const userInDB = yield (0, user_auxiliaries_1.getUserByIdOrThrowError)(user_id);
        let objToReturn = {
            userSubscriptions: { deleted: 0, msg: "" },
            subscriptionCollection: { deleted: 0, msg: "" },
            result: 0,
            msg: "",
        };
        try {
            if (!Array.isArray(userInDB === null || userInDB === void 0 ? void 0 : userInDB.subscriptions) == false &&
                (userInDB === null || userInDB === void 0 ? void 0 : userInDB.subscriptions.length) > 0) {
                userInDB.subscriptions.id(subscription_id).remove();
                yield userInDB.save();
                objToReturn.userSubscriptions.deleted++;
                objToReturn.result++;
            }
            else {
                objToReturn.userSubscriptions.msg =
                    "El user no posee subscripciones en sus propiedades.";
            }
        }
        catch (error) {
            objToReturn.userSubscriptions.msg = error.message;
            objToReturn.msg = error.message;
        }
        finally {
            const deletedSubscription = yield mongoDB_1.Subscription.findOneAndDelete({
                _id: subscription_id,
                "user_subscribed._id": user_id,
            });
            if (deletedSubscription) {
                objToReturn.subscriptionCollection.deleted++;
                objToReturn.result++;
            }
            else {
                console.log("No se ha encontrado y borrado un que coincida en la collection Subscription.");
                objToReturn.subscriptionCollection.msg = `No se ha encontrado y borrado un documento que coincida en la collection Subscription con subscription_id "${subscription_id}" y user_id "${user_id}".`;
                objToReturn.msg += ` No se ha encontrado y borrado un documento que coincida en la collection Subscription con subscription_id "${subscription_id}" y user_id "${user_id}".`;
            }
            return objToReturn;
        }
    });
}
exports.handleDeleteSubscription = handleDeleteSubscription;
function handleUpdateSubscription(subscription_id, user_id, reqFromBody) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, mongoose_1.isValidObjectId)(subscription_id)) {
            throw new Error(`El id de la subscripctión no es un ObjetId válido.`);
        }
        const response = {
            userSubscriptions: { updated: 0, msg: "" },
            subscriptionCollection: { updated: 0, msg: "" },
            result: 0,
        };
        const validatedData = (0, subscription_validators_1.validateUpdateSubscriptionData)(reqFromBody);
        const userFromDB = yield (0, user_auxiliaries_1.getUserByIdOrThrowError)(user_id);
        const subscriptionFromDB = yield mongoDB_1.Subscription.findOneAndUpdate({ _id: subscription_id, "user_subcribed._id": userFromDB._id }, { validatedData });
        if (subscriptionFromDB === null) {
            response.subscriptionCollection.msg =
                "No se encontró un documento en la collection Subscription que coincida con los datos recibidos.";
        }
        else {
            response.subscriptionCollection.updated++;
            response.result++;
        }
        try {
            const subscriptionToBeUpdated = userFromDB.subscriptions.id(subscription_id);
            subscriptionToBeUpdated.name_on_doc = validatedData.name_on_doc;
            subscriptionToBeUpdated.number_on_doc = validatedData.number_on_doc;
            subscriptionToBeUpdated.country_lost = validatedData.country_lost;
            subscriptionToBeUpdated.date_lost = validatedData.date_lost;
            yield userFromDB.save();
            response.userSubscriptions.updated++;
            response.result++;
        }
        catch (error) {
            response.userSubscriptions.msg = error.message;
            return response;
        }
        return response;
    });
}
exports.handleUpdateSubscription = handleUpdateSubscription;
