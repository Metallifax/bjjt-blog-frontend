import { renderWithRouter, screen } from './test-utils';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import editorReducer from './features/editor/editorSlice';

describe('App tests', () => {
  const store = configureStore({
    reducer: { editor: editorReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  test('renders the title of the application', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByText('Welcome to The App!');
    expect(linkElement).toBeInTheDocument();
  });

  test('renders home page on url change', () => {
    renderWithRouter(<App />);
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
    expect(screen.getByLabelText(/rdw-wrapper/i)).toBeInTheDocument();
  });
});
