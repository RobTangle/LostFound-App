"use strict";
// import { Request as JWTRequest } from "express-jwt";
// import { Response } from "express";
// import { Subscription } from "../../mongoDB";
// import {
//   handleNewSubscription,
//   handleDeleteSubscription,
//   handleUpdateSubscription,
//   handleGetUserSubscriptions,
// } from "./subscription-r-auxiliary";
// export async function handleFindAllSubscriptionsRequest(
//   req: JWTRequest,
//   res: Response
// ) {
//   try {
//     const allSubscriptionsFromDB = await Subscription.find().exec();
//     return res.status(200).send(allSubscriptionsFromDB);
//   } catch (error: any) {
//     console.log(`Error en 'subscription/findAll'. ${error.message}`);
//     return res.status(400).send(error.message);
//   }
// }
// export async function handleCreateNewSubscriptionRequest(
//   req: JWTRequest,
//   res: Response
// ) {
//   try {
//     console.log(req.body);
//     const user_id = req.auth?.sub;
//     if (!user_id) {
//       throw new Error(`El user id '${user_id}' es inválido.`);
//     }
//     const objToReturn = await handleNewSubscription(req.body, user_id);
//     return res.status(201).send(objToReturn);
//   } catch (error: any) {
//     console.log(`Error en POST 'subscription/'. ${error.message}`);
//     return res.status(400).send({ error: error.message });
//   }
// }
// export async function handleDeleteSubscriptionByIdRequest(
//   req: JWTRequest,
//   res: Response
// ) {
//   try {
//     const user_id = req.auth?.sub;
//     if (!user_id) {
//       throw new Error(`El user id '${user_id}' es inválido.`);
//     }
//     const subscription_id = req.params.subscription_id;
//     const confirmationOfDeletion = await handleDeleteSubscription(
//       subscription_id,
//       user_id
//     );
//     return res.status(200).send(confirmationOfDeletion);
//   } catch (error: any) {
//     console.log(`Error en DELETE 'subscription/'. ${error.message}`);
//     return res.status(400).send({ error: error.message });
//   }
// }
// export async function handleUpdateSubscriptionByIdRequest(
//   req: JWTRequest,
//   res: Response
// ) {
//   try {
//     const user_id = req.auth?.sub;
//     const subscription_id = req.params.subscription_id;
//     if (!user_id || !subscription_id) {
//       throw new Error(
//         `El user id '${user_id}' y/o la subscription id '${subscription_id} es inválido.`
//       );
//     }
//     const confirmationOfUpdate = await handleUpdateSubscription(
//       subscription_id,
//       user_id,
//       req.body
//     );
//     return res.status(200).send(confirmationOfUpdate);
//   } catch (error: any) {
//     console.log(`Error en PATCH 'subscription/'. ${error.message}`);
//     return res.status(400).send({ error: error.message });
//   }
// }
// export async function handleGetUserSubscriptionsRequest(
//   req: JWTRequest,
//   res: Response
// ) {
//   try {
//     const user_id = req.auth?.sub;
//     if (!user_id) {
//       throw new Error(`El user id '${user_id}' es inválido.`);
//     }
//     const userSubscriptions = await handleGetUserSubscriptions(user_id);
//     return res.status(200).send(userSubscriptions);
//   } catch (error: any) {
//     console.log(`Error en GET 'subscription/userSubs'. ${error.message}`);
//     return res.status(400).send({ error: error.message });
//   }
// }
// module.exports = {
//   handleFindAllSubscriptionsRequest,
//   handleCreateNewSubscriptionRequest,
//   handleDeleteSubscriptionByIdRequest,
//   handleUpdateSubscriptionByIdRequest,
//   handleGetUserSubscriptionsRequest,
// };
