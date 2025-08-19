import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  const handleChange = jest.fn();
  it('renders label and checkbox', () => {
    render(<Checkbox label="Accept" checked={false} onChange={() => {}} name="terms" />);
    expect(screen.getByLabelText('Accept')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    render(<Checkbox label="Accept" checked={false} onChange={handleChange} name="terms" />);
    fireEvent.click(screen.getByLabelText('Accept'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error style when error field matches name', () => {
    render(
      <Checkbox
        label="Accept"
        checked={false}
        onChange={() => {}}
        name="terms"
        error={{ message: 'Error!', field: 'terms' }}
      />
    );
    const input = screen.getByLabelText('Accept');
    expect(input).toHaveClass('ring-2');
    expect(input).toHaveClass('ring-red-600');
    expect(input).toHaveClass('border-red-600');
    expect(screen.getByText('Accept')).toHaveClass('text-red-600');
  });

  it('does not show error style when error field does not match', () => {
    render(
      <Checkbox
        label="Accept"
        checked={false}
        onChange={() => {}}
        name="terms"
        error={{ message: 'Error!', field: 'other' }}
      />
    );
    const input = screen.getByLabelText('Accept');
    expect(input).not.toHaveClass('ring-2');
    expect(input).not.toHaveClass('ring-red-600');
    expect(input).not.toHaveClass('border-red-600');
    expect(screen.getByText('Accept')).not.toHaveClass('text-red-600');
  });
});
