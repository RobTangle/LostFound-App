import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import postSlice from "../features/post/postSlice";
import subscriptionSlice from "../features/subscription/subscriptionSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    subscription: subscriptionSlice,
  },
});
