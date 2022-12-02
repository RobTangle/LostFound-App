import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  newPost: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getSearch: (state, action) => {
      state.searchResults = action.payload;
    },
    postDocument: (state, action) => {
      state.newPost = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { getSearch, postDocument } = postSlice.actions;

export default postSlice.reducer;
