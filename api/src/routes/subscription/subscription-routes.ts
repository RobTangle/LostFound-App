import { Router, Request, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { Subscription } from "../../mongoDB";
import {
  handleDeleteSubscription,
  handleGetUserSubscriptions,
  handleNewSubscription,
  handleUpdateSubscription,
} from "./subscription-r-auxiliary";

const router = Router();

router.get("/findAll", async (req: Request, res: Response) => {
  try {
    const allSubscriptionsFromDB = await Subscription.find();
    return res.status(200).send(allSubscriptionsFromDB);
  } catch (error: any) {
    console.log(`Error en 'subscription/findAll'. ${error.message}`);
    return res.status(400).send(error.message);
  }
});

router.post("/", async (req: JWTRequest, res: Response) => {
  try {
    console.log(req.body);
    //  jwtCheck    // const user_id = req.auth?.sub
    const user_id = req.body.user_subscribed._id;
    const objToReturn = await handleNewSubscription(req.body, user_id);
    return res.status(200).send(objToReturn);
  } catch (error: any) {
    console.log(`Error en POST 'subscription/'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

router.delete("/:subscription_id", async (req: JWTRequest, res: Response) => {
  try {
    //  jwtCheck    // const user_id = req.auth?.sub
    const user_id = req.body.user_id;
    const subscription_id = req.params.subscription_id;
    const confirmationOfDeletion = await handleDeleteSubscription(
      subscription_id,
      user_id
    );
    return res.status(200).send(confirmationOfDeletion);
  } catch (error: any) {
    console.log(`Error en DELETE 'subscription/'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

router.patch("/:subscription_id", async (req: JWTRequest, res: Response) => {
  try {
    // jwtCheck // const user_id = req.auth.sub
    const user_id = req.body.user_id;
    const subscription_id = req.params.subscription_id;
    const confirmationOfUpdate = await handleUpdateSubscription(
      subscription_id,
      user_id,
      req.body
    );
    return res.status(200).send(confirmationOfUpdate);
  } catch (error: any) {
    console.log(`Error en PATCH 'subscription/'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

router.get("/userSubs", async (req: JWTRequest, res: Response) => {
  try {
    // jwtCheck // const user_id = req.auth?.sub
    const user_id = req.body.user_id;
    const userSubscriptions = await handleGetUserSubscriptions(user_id);
    return res.status(200).send(userSubscriptions);
  } catch (error: any) {
    console.log(`Error en GET 'subscription/userSubs'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
