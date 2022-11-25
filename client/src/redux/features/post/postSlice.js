import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getSearch: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { getSearch } = postSlice.actions;

export default postSlice.reducer;
