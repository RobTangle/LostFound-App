"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSubscription = exports.validateUpdateSubscriptionData = void 0;
const genericValidators_1 = require("./genericValidators");
const post_validators_1 = require("./post-validators");
function validateUpdateSubscriptionData(bodyFromReq) {
    const { 
    // subscription_id,
    name_on_doc, number_on_doc, country_lost, date_lost, } = bodyFromReq;
    const validatedData = {
        // _id: checkObjectId(subscription_id),
        name_on_doc: (0, post_validators_1.checkNameOnDoc)(name_on_doc),
        number_on_doc: (0, post_validators_1.checkNumberOnDoc)(number_on_doc),
        country_lost: (0, post_validators_1.checkCountry)(country_lost),
        date_lost: (0, post_validators_1.checkDate)(date_lost),
    };
    return validatedData;
}
exports.validateUpdateSubscriptionData = validateUpdateSubscriptionData;
function validateSubscription(bodyFromReq) {
    const { name_on_doc, number_on_doc, country_lost, date_lost, user_subscribed, } = bodyFromReq;
    const validatedSubscription = {
        name_on_doc: (0, post_validators_1.checkNameOnDoc)(name_on_doc),
        number_on_doc: (0, post_validators_1.checkNumberOnDoc)(number_on_doc),
        country_lost: (0, post_validators_1.checkCountry)(country_lost),
        date_lost: (0, post_validators_1.checkDate)(date_lost),
        user_subscribed: checkUserSubscribed(user_subscribed),
    };
    return validatedSubscription;
}
exports.validateSubscription = validateSubscription;
function checkUserSubscribed(userFromReq) {
    const { _id, name, email } = userFromReq;
    if (!_id || !name || !email) {
        throw new Error(`El id, nombre e email del usuario que se subscribe deben ser válidos.`);
    }
    if (!(0, genericValidators_1.isValidString)(_id) || !(0, genericValidators_1.isValidString)(name) || !(0, genericValidators_1.isValidString)(email)) {
        throw new Error("El email, nombre y _id del usuario que se suscribe deben ser cadenas de texto.");
    }
    if ((0, genericValidators_1.stringContainsURLs)(_id) || (0, genericValidators_1.stringContainsURLs)(name)) {
        throw new Error(`URL detectada en el nombre u _id.`);
    }
    if (!(0, genericValidators_1.isEmail)(email)) {
        throw new Error(`El email ingresado no es válido.`);
    }
    const userSubscribedChecked = {
        _id: _id,
        name: name,
        email: email,
    };
    return userSubscribedChecked;
}
