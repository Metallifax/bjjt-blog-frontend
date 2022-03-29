import { render, screen } from './test-utils';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByRole('heading', /editor test/i);
  expect(linkElement).toBeInTheDocument();
});
