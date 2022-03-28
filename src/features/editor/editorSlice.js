import { createSlice } from '@reduxjs/toolkit';
import { EditorState } from 'draft-js';

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    value: EditorState.createEmpty(),
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { update } = editorSlice.actions;
export default editorSlice.reducer;
