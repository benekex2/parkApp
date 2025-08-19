import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../Select';

describe('Select', () => {
  const options = ['one', 'two', 'three'] as const;

  it('renders label and options', () => {
    render(<Select label="Choose" value="one" options={options} onChange={() => {}} name="test" />);
    expect(screen.getByLabelText('Choose')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'one' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'two' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'three' })).toBeInTheDocument();
  });

  it('renders with correct value', () => {
    render(<Select label="Choose" value="two" options={options} onChange={() => {}} name="test" />);
    expect(screen.getByDisplayValue('two')).toBeInTheDocument();
  });

  it('calls onChange when changed', () => {
    const handleChange = jest.fn();
    render(
      <Select label="Choose" value="one" options={options} onChange={handleChange} name="test" />
    );
    fireEvent.change(screen.getByLabelText('Choose'), { target: { value: 'three' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error style when error field matches name', () => {
    render(
      <Select
        label="Choose"
        value="one"
        options={options}
        onChange={() => {}}
        name="test"
        error={{ message: 'Error!', field: 'test' }}
      />
    );
    const select = screen.getByLabelText('Choose');
    expect(select).toHaveClass('border-red-600');
  });

  it('does not show error style when error field does not match', () => {
    render(
      <Select
        label="Choose"
        value="one"
        options={options}
        onChange={() => {}}
        name="test"
        error={{ message: 'Error!', field: 'other' }}
      />
    );
    const select = screen.getByLabelText('Choose');
    expect(select).not.toHaveClass('border-red-600');
  });
});
