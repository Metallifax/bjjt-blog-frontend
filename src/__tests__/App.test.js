import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from '../App';
import editorReducer from '../features/editor/editorSlice';
import { renderWithRouter, screen } from '../test-utils';

describe('App tests', () => {
  const store = configureStore({
    reducer: { editor: editorReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  test('renders home page on render', () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.getByText(/home!/i)).toBeInTheDocument();
  });

  test('renders about page on url change', () => {
    renderWithRouter(<App />, { route: '/about' });
    expect(screen.getByText(/about!/i)).toBeInTheDocument();
  });

  test('renders nothing when a bad page is reached', () => {
    renderWithRouter(<App />, { route: '/bad/route' });
    expect(screen.getByText(/404 - not found/i)).toBeInTheDocument();
  });

  test('renders editor page on url change', () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
      { route: '/editor' },
    );
    expect(screen.getByText('Create a Blog Post!')).toBeInTheDocument();
  });
});
