import { Router } from "express";
import { config } from "../../config/config";
import jwtCheck from "../../config/jwtMiddleware";
import subscriptionControllers from "../../controllers/subscription";

const router = Router();

// FIND ALL SUBSCRIPTION. FOR DEVELOPMENT, NOT PRODUCTION! :
if (config.environment.env === config.environment.development) {
  router.get(
    "/findAll",
    subscriptionControllers.handleFindAllSubscriptionsRequest
  );
}

// CREATE NEW SUBSCRIPTION :
router.post(
  "/",
  jwtCheck,
  subscriptionControllers.handleCreateNewSubscriptionRequest
);

// DELETE SUBSCRIPTION :
router.delete(
  "/:subscription_id",
  jwtCheck,
  subscriptionControllers.handleDeleteSubscriptionByIdRequest
);

// UPDATE SUBSCRIPTION :
router.patch(
  "/:subscription_id",
  jwtCheck,
  subscriptionControllers.handleUpdateSubscriptionByIdRequest
);

// GET ALL USER SUBSCRIPTIONS :
router.get(
  "/userSubs",
  jwtCheck,
  subscriptionControllers.handleGetUserSubscriptionsRequest
);

export default router;
