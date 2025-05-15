import { render, screen } from '@testing-library/react';
import AboutSection from '../src/app/components/AboutSection';

describe('AboutSection', () => {
  it('renders the about heading', () => {
    render(<AboutSection />);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
}); 