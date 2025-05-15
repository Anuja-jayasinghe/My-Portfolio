import { render, screen } from '@testing-library/react';
import Hero from '../src/app/components/Hero';

describe('Hero', () => {
  it('renders the main introduction', () => {
    render(<Hero />);
    expect(screen.getByText(/Anuja Jayasinghe/i)).toBeInTheDocument();
  });
}); 