import { createSlice } from '@reduxjs/toolkit';

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
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
