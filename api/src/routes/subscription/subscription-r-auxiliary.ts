import { isValidObjectId } from "mongoose";
import { Subscription } from "../../mongoDB";
import {
  validateSubscription,
  validateUpdateSubscriptionData,
} from "../../validators/subscription-validators";
import { getUserByIdOrThrowError } from "../user/user-auxiliaries";

export async function handleNewSubscription(
  bodyFromReq: any,
  user_id: string | undefined
) {
  const userInDB = await getUserByIdOrThrowError(user_id);
  const user_subscribed = {
    _id: userInDB._id,
    name: userInDB.name,
    email: userInDB.email,
  };
  const validatedSubscription = validateSubscription({
    ...bodyFromReq,
    user_subscribed,
  });
  const newSubscription = await Subscription.create(validatedSubscription);
  userInDB.subscriptions.push(newSubscription);
  await userInDB.save();

  console.log("New subscription pushed to user.subscriptions");
  console.log(`NEW SUBSCRIPTION = `, newSubscription);
  return {
    new_subscription: newSubscription,
    user_subscribed: userInDB,
  };
}

export async function handleDeleteSubscription(
  subscription_id: string | undefined,
  user_id: string
): Promise<{
  userSubscriptions: { deleted: number; msg: string };
  subscriptionCollection: { deleted: number; msg: string };
  result: number;
  msg: string;
}> {
  if (!isValidObjectId(subscription_id)) {
    console.log("El subscription_id enviado por params no es ObjectId válido.");
    throw new Error("El al validar el _id de la subscripción a borrar.");
  }
  // Borrar la Subscription de la collection Subscription y del arreglo user.subscriptions.
  const userInDB = await getUserByIdOrThrowError(user_id);

  let objToReturn = {
    userSubscriptions: { deleted: 0, msg: "" },
    subscriptionCollection: { deleted: 0, msg: "" },
    result: 0,
    msg: "",
  };

  try {
    if (
      !Array.isArray(userInDB?.subscriptions) == false &&
      userInDB?.subscriptions.length > 0
    ) {
      userInDB.subscriptions.id(subscription_id).remove();
      await userInDB.save();
      objToReturn.userSubscriptions.deleted++;
      objToReturn.result++;
    } else {
      objToReturn.userSubscriptions.msg =
        "El user no posee subscripciones en sus propiedades.";
    }
  } catch (error: any) {
    objToReturn.userSubscriptions.msg = error.message;
    objToReturn.msg = error.message;
  } finally {
    const deletedSubscription = await Subscription.findOneAndDelete({
      _id: subscription_id,
      "user_subscribed._id": user_id,
    });
    if (deletedSubscription) {
      objToReturn.subscriptionCollection.deleted++;
      objToReturn.result++;
    } else {
      console.log(
        "No se ha encontrado y borrado un que coincida en la collection Subscription."
      );
      objToReturn.subscriptionCollection.msg = `No se ha encontrado y borrado un documento que coincida en la collection Subscription con subscription_id "${subscription_id}" y user_id "${user_id}".`;
      objToReturn.msg += ` No se ha encontrado y borrado un documento que coincida en la collection Subscription con subscription_id "${subscription_id}" y user_id "${user_id}".`;
    }
    return objToReturn;
  }
}

export async function handleUpdateSubscription(
  subscription_id: string | undefined,
  user_id: string | undefined,
  reqFromBody: any
) {
  if (!isValidObjectId(subscription_id)) {
    throw new Error(`El id de la subscripctión no es un ObjetId válido.`);
  }

  const response = {
    userSubscriptions: { updated: 0, msg: "" },
    subscriptionCollection: { updated: 0, msg: "" },
    result: 0,
  };

  const validatedData = validateUpdateSubscriptionData(reqFromBody);
  const userFromDB = await getUserByIdOrThrowError(user_id);
  const subscriptionFromDB = await Subscription.findOneAndUpdate(
    { _id: subscription_id, "user_subcribed._id": userFromDB._id },
    { validatedData }
  );
  if (subscriptionFromDB === null) {
    response.subscriptionCollection.msg =
      "No se encontró un documento en la collection Subscription que coincida con los datos recibidos.";
  } else {
    response.subscriptionCollection.updated++;
    response.result++;
  }
  try {
    const subscriptionToBeUpdated =
      userFromDB.subscriptions.id(subscription_id);
    subscriptionToBeUpdated.name_on_doc = validatedData.name_on_doc;
    subscriptionToBeUpdated.number_on_doc = validatedData.number_on_doc;
    subscriptionToBeUpdated.country_lost = validatedData.country_lost;
    subscriptionToBeUpdated.date_lost = validatedData.date_lost;
    await userFromDB.save();
    response.userSubscriptions.updated++;
    response.result++;
  } catch (error: any) {
    response.userSubscriptions.msg = error.message;
    return response;
  }
  return response;
}