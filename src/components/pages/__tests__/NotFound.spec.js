import { render, screen } from '../../../test-utils';
import NotFound from '../NotFound';

describe('Render the Not Found component', () => {
  test('NotFound component should render', () => {
    render(<NotFound />);

    expect(screen.getByText(/404 - not found/i)).toBeInTheDocument();
  });
});
