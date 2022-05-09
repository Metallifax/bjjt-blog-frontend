import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import editorReducer from '../../../features/editor/editorSlice';
import userReducer, { setIsLoggedIn } from '../../../features/user/userSlice';
import { renderWithRouter, screen } from '../../../test-utils';
import Home from '../Home';

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
      <Home />
    </Provider>,
  );
};

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('home page tests', () => {
  test('renders the component', () => {
    localRender();
    expect(screen.getByText(/home!/i)).toBeInTheDocument();
  });

  test('there should be no list items with empty store', () => {
    localRender();

    expect(screen.queryByRole('li')).not.toBeInTheDocument();
  });

  test('if `loginStore` is false, mockedNavigate is called', () => {
    store.dispatch(setIsLoggedIn(false));

    localRender();

    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });

  test('if `loginStore` is true, mockedNavigate is not called', () => {
    store.dispatch(setIsLoggedIn(true));

    localRender();

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  // test('getPosts() should return a list of posts', () => {});
  //
  // // On hold until we can find a way to update redux state and display
  // // it in the view
  // test('there should be a list item with text with store item', () => {
  //   localRender();
  //
  //   expect(
  //     screen.getByRole('li', { name: /hello there!/i }),
  //   ).toBeInTheDocument();
  // });
});
