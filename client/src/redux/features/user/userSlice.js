import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: { pure: true },
  allUsers: [],
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
    }
  },
});
// Action creators are generated for each case reducer function
export const { setUserInfo,setAllUsers } = userSlice.actions;

export default userSlice.reducer;