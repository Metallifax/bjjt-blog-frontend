import { render, screen } from '../../../test-utils';
import DisplayMarkupFromEditor from '../DisplayMarkupFromEditor';

describe('Tests for the DisplayMarkupFromEditor component', () => {
  test('it should be able to render', () => {
    render(<DisplayMarkupFromEditor />);

    expect(screen.getByTestId('display-markup')).toBeInTheDocument();
  });
});
