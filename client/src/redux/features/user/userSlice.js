import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: { pure: true },
  allUsers: [],
  countries: [],
  userProfile: {},
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
  },
});
// Action creators are generated for each case reducer function
export const { setUserInfo, setAllUsers, setCountries, setUserProfile } =
  userSlice.actions;

export default userSlice.reducer;
