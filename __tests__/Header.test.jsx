import { render, screen } from '@testing-library/react';
import Header from '../src/app/components/Header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
    // Check for a common element, e.g., a nav or logo
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
}); 