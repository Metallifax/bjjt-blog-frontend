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
});
