import { configureStore } from '@reduxjs/toolkit';
import editorReducer from './features/editor/editorSlice';

export default configureStore({
  reducer: {
    editor: editorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
