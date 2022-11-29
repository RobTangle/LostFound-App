import { Router } from "express";
import jwtCheck from "../../config/jwtMiddleware";
import {
  handleFindAllSubscriptionsRequest,
  handleCreateNewSubscriptionRequest,
  handleDeleteSubscriptionByIdRequest,
  handleUpdateSubscriptionByIdRequest,
  handleGetUserSubscriptionsRequest,
} from "./subscription-middlewares";

const router = Router();

router.get("/findAll", handleFindAllSubscriptionsRequest);
// CREATE NEW SUBSCRIPTION :
router.post("/", jwtCheck, handleCreateNewSubscriptionRequest);
// DELETE SUBSCRIPTION :
router.delete(
  "/:subscription_id",
  jwtCheck,
  handleDeleteSubscriptionByIdRequest
);
// UPDATE SUBSCRIPTION :
router.patch(
  "/:subscription_id",
  jwtCheck,
  handleUpdateSubscriptionByIdRequest
);
// GET ALL USER SUBSCRIPTIONS :
router.get("/userSubs", jwtCheck, handleGetUserSubscriptionsRequest);

export default router;
