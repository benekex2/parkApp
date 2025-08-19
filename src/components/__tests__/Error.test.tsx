import React from 'react';
import { render, screen } from '@testing-library/react';
import { Error } from '../Error';

describe('Error', () => {
  it('renders nothing when error is null', () => {
    const { container } = render(<Error error={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders error message', () => {
    render(<Error error={{ message: 'Test error', field: 'email' }} />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('renders server error label when field is query', () => {
    render(<Error error={{ message: 'Server down', field: 'query' }} />);
    expect(screen.getByText('Server error:')).toBeInTheDocument();
    expect(screen.getByText('Server down')).toBeInTheDocument();
  });

  it('renders with correct classes', () => {
    render(<Error error={{ message: 'Error!', field: 'email' }} />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('text-red-600');
    expect(alert).toHaveClass('border-red-600');
    expect(alert).toHaveClass('bg-red-200');
  });
});
