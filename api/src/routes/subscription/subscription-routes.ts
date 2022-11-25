import { Router } from "express";
import {
  handleFindAllSubscriptionsRequest,
  handleCreateNewSubscriptionRequest,
  handleDeleteSubscriptionByIdRequest,
  handleUpdateSubscriptionByIdRequest,
  handleGetUserSubscriptionsRequest,
} from "./subscription-middlewares";

const router = Router();

router.get("/findAll", handleFindAllSubscriptionsRequest);
router.post("/", handleCreateNewSubscriptionRequest);
router.delete("/:subscription_id", handleDeleteSubscriptionByIdRequest);
router.patch("/:subscription_id", handleUpdateSubscriptionByIdRequest);
router.get("/userSubs", handleGetUserSubscriptionsRequest);

export default router;
