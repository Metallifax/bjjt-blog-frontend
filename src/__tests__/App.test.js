import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from '../App';
import editorReducer from '../features/editor/editorSlice';
import userReducer from '../features/user/userSlice';
import { renderWithRouter, screen } from '../test-utils';

const store = configureStore({
  reducer: { editor: editorReducer, user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const localRender = () => {
  renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

describe('App tests', () => {
  test('renders the login page upon initial load', () => {
    localRender();
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });
});
