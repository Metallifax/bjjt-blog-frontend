import NiceModal from '@ebay/nice-modal-react';
import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';

import userReducer, {
  setIsLoggedIn,
} from '../../../../features/user/userSlice';
import { renderWithRouter, screen, fireEvent } from '../../../../test-utils';
import Header from '../Layout';

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
      <Header />
    </Provider>,
  );
};

describe('tests for the Header component (navbar)', () => {
  test('when renders, home link should have the active class', () => {
    store.dispatch(setIsLoggedIn(true));
    localRender();
    expect(screen.getByText('Home')).toHaveClass('active');
  });

  // eslint-disable-next-line max-len
  test('when logout action is performed through modal, token is revoked', () => {
    store.dispatch(setIsLoggedIn(true));
    renderWithRouter(
      <Provider store={store}>
        <NiceModal.Provider>
          <Header />
        </NiceModal.Provider>
      </Provider>,
    );

    Cookies.set('token', '123');

    const logoutButton = screen.getByRole('link', {
      name: 'Logout',
      class: 'nav-link',
    });
    fireEvent.click(logoutButton);

    const innerLogoutButton = screen.getByRole('button', {
      name: 'Logout',
    });
    fireEvent.click(innerLogoutButton);

    expect(Cookies.get('token')).toBe(undefined);
  });

  // eslint-disable-next-line max-len
  test('when cancel action performed through modal, nothing happens and token is untouched', () => {
    store.dispatch(setIsLoggedIn(true));
    renderWithRouter(
      <Provider store={store}>
        <NiceModal.Provider>
          <Header />
        </NiceModal.Provider>
      </Provider>,
    );

    Cookies.set('token', '123');

    const logoutButton = screen.getByRole('link', {
      name: 'Logout',
      class: 'nav-link',
    });
    fireEvent.click(logoutButton);

    const modalCancelButton = screen.getByRole('button', {
      name: 'Cancel',
    });
    fireEvent.click(modalCancelButton);

    expect(Cookies.get('token')).toBe('123');
  });
});
