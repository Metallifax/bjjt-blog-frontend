import { render, screen } from '../../../../test-utils';
import FormContainer from '../FormContainer';
import FormInput from '../FormInput';

describe('FormInput tests', () => {
  test('renders properly', () => {
    render(<FormContainer />);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('renders default button text if no buttonText prop given', () => {
    render(<FormContainer />);

    expect(screen.queryByRole('button')).toHaveTextContent('Go!');
  });

  // eslint-disable-next-line max-len
  test('renders child elements when they are passed to the FormContainer', () => {
    render(
      <FormContainer>
        <p>Hello, World!</p>
      </FormContainer>,
    );

    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('renders a form group when passed to the FormContainer', () => {
    render(
      <FormContainer>
        <FormInput />
      </FormContainer>,
    );

    expect(screen.getByTestId('input')).toBeInTheDocument();
  });
});
