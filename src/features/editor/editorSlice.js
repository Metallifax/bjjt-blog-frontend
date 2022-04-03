import { createSlice } from '@reduxjs/toolkit';
// import data from './test-data';

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    // remove the posts data or Cypress will fail, will make this robust later
    // posts: data,
    posts: [],
    value: undefined,
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
    save: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
  },
});

export const { update, save } = editorSlice.actions;
export default editorSlice.reducer;
