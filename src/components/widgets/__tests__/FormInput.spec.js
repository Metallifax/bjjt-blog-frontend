import { fireEvent, render, screen } from '../../../test-utils';
import FormInput from '../FormInput';

describe('FormInput tests', () => {
  test('FormInput renders', () => {
    render(<FormInput />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  // eslint-disable-next-line max-len
  test('FormInput with no props renders empty input, no label, default placeholder', () => {
    render(<FormInput />);

    expect(screen.queryByRole('label')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox').placeholder).toBe('Enter text here!');
    expect(screen.queryByRole('textbox').value).toBe('');
  });

  test('FormInput with placeholder prop correctly renders placeholder', () => {
    render(<FormInput placeholder='hello world!' />);

    expect(screen.queryByRole('textbox').placeholder).toBe('hello world!');
  });

  test('FormInput with label prop correctly renders label', () => {
    render(<FormInput label='hello world!' />);

    expect(screen.getByText('hello world!')).toHaveTextContent('hello world!');
  });

  test('FormInput with formGroupClass correctly adds the class', () => {
    render(<FormInput formGroupClass='my-class' />);

    const input = screen.getByRole('textbox', { class: 'my-class' });
    fireEvent.change(input, { target: { value: 'hello world!' } });

    expect(input.value).toBe('hello world!');
  });
});
