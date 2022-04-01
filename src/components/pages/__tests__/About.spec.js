import { render, screen } from '../../../test-utils';
import About from '../About';

describe('test the about component', () => {
  test('About page should render', () => {
    render(<About />);

    expect(screen.getByText(/about!/i)).toBeInTheDocument();
  });
});
