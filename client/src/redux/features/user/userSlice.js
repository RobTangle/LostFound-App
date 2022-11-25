import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: { pure: true },
  allUsers: [],
  countries: [],
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
      state.countries = Object.entries(action.payload);
    },
  },
});
// Action creators are generated for each case reducer function
export const { setUserInfo, setAllUsers, setCountries } = userSlice.actions;

export default userSlice.reducer;
