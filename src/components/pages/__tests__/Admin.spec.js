import Cookies from 'js-cookie';

import { fireEvent, render, screen } from '../../../test-utils';
import Admin from '../Admin';

describe('admin page tests', () => {
  // cache the original `console.error` function to be used in mocking
  beforeEach(() => {
    Cookies.remove('hey');
    console.error = jest.fn();
  });

  test('renders the page', () => {
    render(<Admin />);
    expect(screen.getByRole('heading')).toHaveTextContent('Generate Cookie');
  });

  test(// eslint-disable-next-line max-len
  'filling out the form correctly and submitting a cookie puts a cookie into the client', () => {
    render(<Admin />);

    const keyInput = screen.getByLabelText('Cookie Key');
    const valueInput = screen.getByLabelText('Cookie Value');
    const submitButton = screen.getByRole('button');

    fireEvent.change(keyInput, { target: { value: 'hey' } });
    fireEvent.change(valueInput, { target: { value: 'there' } });
    fireEvent.click(submitButton);

    const cookie = Cookies.get('hey');

    expect(cookie).toBe('there');
  });

  test('filling out the form incorrectly yields a `console.error`', () => {
    render(<Admin />);

    const keyInput = screen.getByLabelText('Cookie Key');
    const submitButton = screen.getByRole('button');

    fireEvent.change(keyInput, { target: { value: 'hey' } });
    fireEvent.click(submitButton);

    const cookie = Cookies.get('hey');

    expect(cookie).toBe(undefined);
    expect(console.error).toHaveBeenCalled();
  });
});
