import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newSubscription: { pure: true },
  // Las suscriptiones del usuario se deberían obtener del user profile, ya que las suscripciones están embebidas en el user profile / info.
  // userSubscriptions: { pure: true },
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    // setUserSubscriptions: (state, action) => {
    //   state.userSubscriptions = action.payload;
    // },
    setNewSubscription: (state, action) => {
      state.newSubscription = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
