import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import editorReducer from '../../../../../features/editor/editorSlice';
import { cleanup, renderWithRouter } from '../../../../../test-utils';
import CustomModal from '../CustomModal';

const store = configureStore({
  reducer: { editor: editorReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const localRender = ({ ...options }) => {
  renderWithRouter(
    <Provider store={store}>
      <CustomModal id='test' {...options} />
    </Provider>,
  );
};

describe('tests run', () => {
  afterEach(() => {
    cleanup();
  });
});
