import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';

import editorReducer from '../../../features/editor/editorSlice';
import userReducer from '../../../features/user/userSlice';
import { renderWithRouter, screen, fireEvent } from '../../../test-utils';
import SignUp from '../SignUp';

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
      <SignUp />
    </Provider>,
  );
};

describe('signup page tests', () => {
  beforeEach(() => {
    Cookies.remove('hey');
  });

  test('renders the page', () => {
    localRender();
    expect(screen.getByRole('heading')).toHaveTextContent('Sign Up');
  });

  test('entering text in the email input changes the value', () => {
    localRender();

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'hello' } });

    expect(emailInput.value).toBe('hello');
  });

  test('entering text in the password input changes the value', () => {
    localRender();

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'hello' } });

    expect(passwordInput.value).toBe('hello');
  });

  test('entering text in the passwordConfirm input changes the value', () => {
    localRender();

    const passwordConfirmInput = screen.getByLabelText('Password confirm');
    fireEvent.change(passwordConfirmInput, { target: { value: 'hello' } });

    expect(passwordConfirmInput.value).toBe('hello');
  });

  // eslint-disable-next-line max-len
  test("When 'Save!' is pressed with no input content, all inputs should show error", () => {
    localRender();

    const submitButton = screen.getByRole('button', { name: 'Sign Up!' });
    fireEvent.click(submitButton);

    const inputs = screen.getAllByTestId('input');
    expect(inputs[0]).toHaveTextContent('Cannot be blank');
    expect(inputs[1]).toHaveTextContent('Cannot be blank');
    expect(inputs[2]).toHaveTextContent('Cannot be blank');
  });

  // eslint-disable-next-line max-len
  test("When 'Save!' is pressed with no input content in email, then text is entered, error should go away", () => {
    localRender();

    const submitButton = screen.getByRole('button', { name: 'Sign Up!' });
    fireEvent.click(submitButton);

    const inputs = screen.getAllByTestId('input');
    expect(inputs[0]).toHaveTextContent('Cannot be blank');

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'h' } });

    expect(inputs[0]).not.toHaveTextContent('Cannot be blank');
  });

  // eslint-disable-next-line max-len
  test("When 'Save!' is pressed with no input content in password, then text is entered, error should go away", () => {
    localRender();

    const submitButton = screen.getByRole('button', { name: 'Sign Up!' });
    fireEvent.click(submitButton);

    const inputs = screen.getAllByTestId('input');
    expect(inputs[1]).toHaveTextContent('Cannot be blank');

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'h' } });

    expect(inputs[1]).not.toHaveTextContent('Cannot be blank');
  });

  // eslint-disable-next-line max-len
  test("When 'Save!' is pressed with no input content in password confirm, then text is entered, error should go away", () => {
    localRender();

    const submitButton = screen.getByRole('button', { name: 'Sign Up!' });
    fireEvent.click(submitButton);

    const inputs = screen.getAllByTestId('input');
    expect(inputs[2]).toHaveTextContent('Cannot be blank');

    const passwordConfirmInput = screen.getByLabelText('Password confirm');
    fireEvent.change(passwordConfirmInput, { target: { value: 'h' } });

    expect(inputs[2]).not.toHaveTextContent('Cannot be blank');
  });

  // eslint-disable-next-line max-len
  test('When passwords do not match and submit is pushed, "Passwords must match" should appear', () => {
    localRender();

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: '1' } });

    const passwordConfirmInput = screen.getByLabelText('Password confirm');
    fireEvent.change(passwordConfirmInput, { target: { value: '123' } });

    const submitButton = screen.getByRole('button', { name: 'Sign Up!' });
    fireEvent.click(submitButton);

    const inputs = screen.getAllByTestId('input');
    expect(inputs[2]).toHaveTextContent('Passwords must match');
  });

  // // NEEDS MOCKED API BASED TESTING
  // test('filling the form and submitting does something', () => {
  //   localRender();
  //
  //   const emailInput = screen.getByLabelText('Email');
  //   const passwordInput = screen.getByLabelText('Password');
  //   const passwordConfirmInput = screen.getByLabelText('Password confirm');
  //   const submitButton = screen.getByRole('button', { name: 'Sign Up!' });
  //
  //   fireEvent.change(emailInput, { target: { value: 'mail' } });
  //   fireEvent.change(passwordInput, { target: { value: 'pass1' } });
  //   fireEvent.change(passwordConfirmInput, { target: { value: 'pass2' } });
  //   fireEvent.click(submitButton);
  //
  //   expect(true).toBe(true);
  // });
  //
  // test("if 'hey' is in cookies, display the alert", () => {
  //   render(<SignUp />);
  //
  //   Cookies.set('hey', 'there');
  //   expect(
  //     screen.getByText("It looks like you don't have an account yet!"),
  //   ).toBeInTheDocument();
  // });

  // // will implement when the API is
  // test("if 'hey' is not in cookies, display the alert", () => {
  //   render(<SignUp />);
  //
  //   expect(
  //     screen.queryByText("It looks like you don't have an account yet!"),
  //   ).not.toBeInTheDocument();
  // });
});
