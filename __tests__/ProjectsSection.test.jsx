import { render, screen } from '@testing-library/react';
import ProjectsSection from '../src/app/components/ProjectsSection';

describe('ProjectsSection', () => {
  it('renders the projects heading', () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/some things i've built/i)).toBeInTheDocument();
  });
}); 