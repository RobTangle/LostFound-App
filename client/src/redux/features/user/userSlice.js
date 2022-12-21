import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: { pure: true },
  allUsers: [],
  countries: [],
  userProfile: {},
  userIsRegistered: { pure: true },
  registerUser: { pure: true },
  isUserRegistered: { pure: true },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setUserIsRegistered: (state, action) => {
      state.userIsRegistered = action.payload;
    },
    setRegisterUser: (state, action) => {
      state.registerUser = action.payload;
    },
    setIsUserRegistered: (state, action) => {
      state.isUserRegistered = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  setUserInfo,
  setAllUsers,
  setCountries,
  setUserProfile,
  setRegisterUser,
  setIsUserRegistered,
  setUserIsRegistered,
} = userSlice.actions;

export default userSlice.reducer;
