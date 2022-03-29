import { renderWithRouter, screen } from '../../test-utils';
import Layout from './Layout';
import { fireEvent } from '@testing-library/react';

describe('test the layout of the application', () => {
  it('should display the title of the application', () => {
    renderWithRouter(<Layout />);
    expect(screen.getByText(/blogging app/i)).toBeInTheDocument();
  });

  it('when renders, home link should have the active class', () => {
    renderWithRouter(<Layout />);
    expect(screen.getByText('Home')).toHaveClass('active');
  });

  it('when clicking about, element should have active class', async () => {
    renderWithRouter(<Layout />);
    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);

    expect(aboutLink).toHaveClass('active');
  });

  it('when clicking editor, element should have active class', async () => {
    renderWithRouter(<Layout />);
    const editorLink = screen.getByText('Editor');
    fireEvent.click(editorLink);

    expect(editorLink).toHaveClass('active');
  });

  it('when clicking editor, then home, home link should have active class', () => {
    renderWithRouter(<Layout />);
    const homeLink = screen.getByText('Home');
    const editorLink = screen.getByText('Editor');
    fireEvent.click(editorLink);
    fireEvent.click(homeLink);

    expect(editorLink).not.toHaveClass('active');
    expect(homeLink).toHaveClass('active');
  });

  it('should render the footer component', () => {
    renderWithRouter(<Layout />);
    expect(
      screen.getByText('Brazil Japan Joint Team 2022 ©'),
    ).toBeInTheDocument();
  });
});
