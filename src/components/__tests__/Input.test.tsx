import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input component', () => {
  const handleChange = jest.fn();
  it('renders label and input', () => {
    render(<Input label="Test Label" name="test" onChange={handleChange} />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders with value', () => {
    render(<Input label="Test" value="abc" name="test" onChange={handleChange} />);
    expect(screen.getByDisplayValue('abc')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    render(<Input label="Test" name="test" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('Test'), { target: { value: 'x' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error style when error field matches name', () => {
    render(<Input label="Test" name="test" error={{ message: 'Error!', field: 'test' }} />);
    const input = screen.getByLabelText('Test');
    expect(input).toHaveClass('border-red-600');
    expect(input).toHaveClass('bg-red-100');
  });

  it('does not show error style when error field does not match', () => {
    render(<Input label="Test" name="test" error={{ message: 'Error!', field: 'other' }} />);
    const input = screen.getByLabelText('Test');
    expect(input).not.toHaveClass('border-red-600');
    expect(input).not.toHaveClass('bg-red-100');
  });
});
