import Cookies from 'js-cookie';

import { fireEvent, render, screen } from '../../../test-utils';
import SignUp from '../SignUp';

describe('signup page tests', () => {
  beforeEach(() => {
    Cookies.remove('hey');
    console.log = jest.fn();
  });

  test('renders the page', () => {
    render(<SignUp />);
    expect(screen.getByRole('heading')).toHaveTextContent('Sign Up');
  });

  test('filling the form and submitting calls `console.log`', () => {
    render(<SignUp />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const passwordConfirmInput = screen.getByLabelText('Password confirm');
    const submitButton = screen.getByRole('button', { name: 'Sign Up!' });

    fireEvent.change(emailInput, { target: { value: 'mail' } });
    fireEvent.change(passwordInput, { target: { value: 'pass1' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'pass2' } });
    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalled();
  });

  test("if 'hey' is in cookies, display the alert", () => {
    render(<SignUp />);

    Cookies.set('hey', 'there');
    expect(
      screen.getByText("It looks like you don't have an account yet!"),
    ).toBeInTheDocument();
  });

  // // will implement when the API is
  // test("if 'hey' is not in cookies, display the alert", () => {
  //   render(<SignUp />);
  //
  //   expect(
  //     screen.queryByText("It looks like you don't have an account yet!"),
  //   ).not.toBeInTheDocument();
  // });
});
