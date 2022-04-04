import { renderWithRouter, screen } from '../../../../test-utils';
import Layout from '../Layout';

describe('test the layout of the application', () => {
  it('should display the title of the application', () => {
    renderWithRouter(<Layout />);
    expect(screen.getByText(/blogging app/i)).toBeInTheDocument();
  });

  it('when renders, home link should have the active class', () => {
    renderWithRouter(<Layout />);
    expect(screen.getByText('Home')).toHaveClass('active');
  });

  it('should render the footer component', () => {
    renderWithRouter(<Layout />);
    expect(
      screen.getByText('Brazil Japan Joint Team 2022 ©'),
    ).toBeInTheDocument();
  });
});
