import {
  isEmail,
  isValidString,
  stringContainsURLs,
} from "./genericValidators";
import { ISubscription } from "../mongoDB/models/Subscription";
import {
  checkCountry,
  checkDate,
  checkNameOnDoc,
  checkNumberOnDoc,
} from "./post-validators";

export function validateUpdateSubscriptionData(bodyFromReq: any) {
  const {
    // subscription_id,
    name_on_doc,
    number_on_doc,
    country_lost,
    date_lost,
  } = bodyFromReq;
  const validatedData = {
    // _id: checkObjectId(subscription_id),
    name_on_doc: checkNameOnDoc(name_on_doc),
    number_on_doc: checkNumberOnDoc(number_on_doc),
    country_lost: checkCountry(country_lost),
    date_lost: checkDate(date_lost),
  };
  return validatedData;
}

export function validateSubscription(bodyFromReq: any): ISubscription {
  const {
    name_on_doc,
    number_on_doc,
    country_lost,
    date_lost,
    user_subscribed,
  } = bodyFromReq;
  const validatedSubscription = {
    name_on_doc: checkNameOnDoc(name_on_doc),
    number_on_doc: checkNumberOnDoc(number_on_doc),
    country_lost: checkCountry(country_lost),
    date_lost: checkDate(date_lost),
    user_subscribed: checkUserSubscribed(user_subscribed),
  };
  return validatedSubscription;
}

function checkUserSubscribed(userFromReq: any): {
  _id: string;
  name: string;
  email: string;
} {
  const { _id, name, email } = userFromReq;
  if (!_id || !name || !email) {
    throw new Error(
      `El id, nombre e email del usuario que se subscribe deben ser válidos.`
    );
  }
  if (!isValidString(_id) || !isValidString(name) || !isValidString(email)) {
    throw new Error(
      "El email, nombre y _id del usuario que se suscribe deben ser cadenas de texto."
    );
  }
  if (stringContainsURLs(_id) || stringContainsURLs(name)) {
    throw new Error(`URL detectada en el nombre u _id.`);
  }
  if (!isEmail(email)) {
    throw new Error(`El email ingresado no es válido.`);
  }
  const userSubscribedChecked = {
    _id: _id,
    name: name,
    email: email,
  };
  return userSubscribedChecked;
}
