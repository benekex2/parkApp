import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputEmail } from '../InputEmail';

describe('InputEmail', () => {
  const handleChange = jest.fn();
  it('renders label and input', () => {
    render(<InputEmail label="Email" name="email" onChange={handleChange} />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders with value', () => {
    render(
      <InputEmail label="Email" name="email" onChange={handleChange} value="test@example.com" />
    );
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    render(<InputEmail label="Email" name="email" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'x' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error style when error field matches name', () => {
    render(<InputEmail label="Email" name="email" error={{ message: 'Error!', field: 'email' }} />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveClass('border-red-600');
    expect(input).toHaveClass('bg-red-100');
  });

  it('does not show error style when error field does not match', () => {
    render(<InputEmail label="Email" name="email" error={{ message: 'Error!', field: 'other' }} />);
    const input = screen.getByLabelText('Email');
    expect(input).not.toHaveClass('border-red-600');
    expect(input).not.toHaveClass('bg-red-100');
  });
});
