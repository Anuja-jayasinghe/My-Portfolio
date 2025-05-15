import { render, screen } from '@testing-library/react';
import ContactSection from '../src/app/components/ContactSection';

describe('ContactSection', () => {
  it('renders the contact heading', () => {
    render(<ContactSection />);
    expect(screen.getByText(/Let's Connect/i)).toBeInTheDocument();
  });
}); 