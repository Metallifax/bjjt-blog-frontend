import { fireEvent, renderWithRouter, screen } from '../../../test-utils';
import Login from '../Login';

const localRender = () => {
  renderWithRouter(<Login />);
};

describe('login page tests', () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  test('renders the page', () => {
    localRender();
    expect(screen.getByRole('heading')).toHaveTextContent('Login');
  });

  test('filling the form and submitting calls `console.log`', () => {
    localRender();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'mail' } });
    fireEvent.change(passwordInput, { target: { value: 'pass1' } });
    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalled();
  });

  // eslint-disable-next-line max-len
  test('not filling both the email and password fields yield both errors', () => {
    localRender();

    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.click(submitButton);

    const inputs = screen.getAllByTestId('input');
    expect(inputs[0]).toHaveTextContent('Cannot be blank');
    expect(inputs[1]).toHaveTextContent('Cannot be blank');
  });

  // eslint-disable-next-line max-len
  test('filling the email but leaving the password field empty yields one error', () => {
    localRender();

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'email' } });

    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    const inputs = screen.getAllByTestId('input');
    expect(inputs[0]).not.toHaveTextContent('Cannot be blank');
    expect(inputs[1]).toHaveTextContent('Cannot be blank');
  });

  // eslint-disable-next-line max-len
  test('filling the password but leaving the email field empty yields one error', () => {
    localRender();

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    const inputs = screen.getAllByTestId('input');
    expect(inputs[1]).not.toHaveTextContent('Cannot be blank');
    expect(inputs[0]).toHaveTextContent('Cannot be blank');
  });

  test('filling both inputs and pressing submit does not yield errors', () => {
    localRender();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'email' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    const inputs = screen.getAllByTestId('input');
    expect(inputs[1]).not.toHaveTextContent('Cannot be blank');
    expect(inputs[0]).not.toHaveTextContent('Cannot be blank');
  });

  // eslint-disable-next-line max-len
  test('after triggering error then re-entering text, errors go away', () => {
    localRender();

    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    const inputs = screen.getAllByTestId('input');
    expect(inputs[0]).toHaveTextContent('Cannot be blank');

    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'hello' } });

    expect(inputs[0]).not.toHaveTextContent('Cannot be blank');
  });
});
