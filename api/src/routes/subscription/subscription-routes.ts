import { Router, Request, Response } from "express";
import { Subscription } from "../../mongoDB";
import { ISubscription } from "../../mongoDB/models/Subscription";
import { validateSubscription } from "../../validators/subscription-validators";

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

router.post("/", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const validatedSubscription = validateSubscription(req.body);
    const newSubscription = await Subscription.create(validatedSubscription);
    console.log(`NEW SUBSCRIPTION = `, newSubscription);
    return res.status(200).send(newSubscription);
  } catch (error: any) {
    console.log(`Error en POST 'subscription/'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
