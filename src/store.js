import { configureStore } from '@reduxjs/toolkit';

import editorReducer from './features/editor/editorSlice';
import userReducer from './features/user/userSlice';

export default configureStore({
  reducer: {
    editor: editorReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
