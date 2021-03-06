import { createSlice } from '@reduxjs/toolkit';

// import data from './test-data';

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    // remove the posts data or Cypress will fail, will make this robust later
    // posts: data,
    posts: [],
  },
  reducers: {
    save: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((item) => item.id !== action.payload.id);
    },
    update: (state, action) => {
      let temp = state.posts;

      const postIndex = temp.findIndex((obj) => obj.id === action.id);
      temp[postIndex] = action;
      state.posts = temp;
    },
  },
});

export const { save, deletePost, update } = editorSlice.actions;
export default editorSlice.reducer;
