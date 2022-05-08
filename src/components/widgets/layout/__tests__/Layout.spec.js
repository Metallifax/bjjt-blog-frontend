import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import userReducer, {
  setIsLoggedIn,
} from '../../../../features/user/userSlice';
import { renderWithRouter, screen } from '../../../../test-utils';
import Layout from '../Layout';

const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const localRender = () => {
  renderWithRouter(
    <Provider store={store}>
      <Layout />
    </Provider>,
  );
};

describe('test the layout of the application', () => {
  it('should display the title of the application', () => {
    localRender();
    expect(screen.getByText(/blogging app/i)).toBeInTheDocument();
  });

  it('when renders, home link should have the active class', () => {
    store.dispatch(setIsLoggedIn(true));
    localRender();
    expect(screen.getByText('Home')).toHaveClass('active');
  });

  it('should render the footer component', () => {
    localRender();
    expect(
      screen.getByText('Brazil Japan Joint Team 2022 ©'),
    ).toBeInTheDocument();
  });
});
