import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  newPost: { pure: true },
  postDetail: { pure: true },
  postUpdated: { pure: true },
  deletedPost: { pure: true },
  contactPostOwner: { pure: true },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setNewPost: (state, action) => {
      state.newPost = action.payload;
    },
    setPostDetail: (state, action) => {
      state.postDetail = action.payload;
    },
    setUpdatePost: (state, action) => {
      state.postUpdated = action.payload;
    },
    setDeletedPost: (state, action) => {
      state.deletedPost = action.payload;
    },
    setContactPostOwner: (state, action) => {
      state.contactPostOwner = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  setSearchResults,
  setNewPost,
  setPostDetail,
  setUpdatePost,
  setDeletedPost,
  setContactPostOwner,
} = postSlice.actions;

export default postSlice.reducer;
