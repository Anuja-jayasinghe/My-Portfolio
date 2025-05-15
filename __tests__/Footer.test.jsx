import { render, screen } from '@testing-library/react';
import Footer from '../src/app/components/Footer';

describe('Footer', () => {
  it('renders the thank you message', () => {
    render(<Footer />);
    expect(screen.getByText(/thank you for visiting/i)).toBeInTheDocument();
  });

  it('renders the copyright', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} All rights reserved.`)).toBeInTheDocument();
  });

  it('renders the current year dynamically', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
}); 