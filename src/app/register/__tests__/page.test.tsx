import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from '../page';

let mockAuthContext = {
  register: jest.fn(),
  setError: jest.fn(),
  error: null,
  loading: false,
};

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => mockAuthContext,
}));
jest.mock('@/components/Header', () => ({
  Header: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock('@/components/Input', () => ({
  Input: (props: {
    label: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }) => (
    <input
      aria-label={props.label}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  ),
}));
jest.mock('@/components/InputEmail', () => ({
  InputEmail: (props: {
    label: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }) => (
    <input
      aria-label={props.label}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  ),
}));
jest.mock('@/components/Select', () => ({
  Select: (props: {
    label: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  }) => (
    <select
      aria-label={props.label}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    >
      <option value="English">English</option>
      <option value="Polish">Polski</option>
    </select>
  ),
}));
jest.mock('@/components/Checkbox', () => ({
  Checkbox: (props: {
    label: string;
    name?: string;
    checked?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }) => (
    <input
      aria-label={props.label}
      type="checkbox"
      name={props.name}
      checked={props.checked}
      onChange={props.onChange}
    />
  ),
}));
jest.mock('@/components/Error', () => ({
  Error: () => <div data-testid="error" />,
}));

describe('RegisterPage', () => {
  beforeEach(() => {
    mockAuthContext = {
      register: jest.fn(),
      setError: jest.fn(),
      error: null,
      loading: false,
    };
  });

  it('renders all form fields and button', () => {
    render(<RegisterPage />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('calls setError with validation error on invalid email', () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(mockAuthContext.setError).toHaveBeenCalledWith({
      message: expect.stringContaining('Please use correct formatting'),
      field: 'email',
    });
    expect(mockAuthContext.register).not.toHaveBeenCalled();
  });

  it('calls register on valid submit', () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jan' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    fireEvent.change(screen.getByLabelText(/language/i), { target: { value: 'Polish' } });
    fireEvent.click(screen.getByLabelText(/accept terms/i));
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(mockAuthContext.setError).toHaveBeenCalledWith(null);
    expect(mockAuthContext.register).toHaveBeenCalledWith(
      'test@email.com',
      'pass',
      'Jan',
      'Polish',
      true
    );
  });

  it('disables button when loading', () => {
    mockAuthContext.loading = true;
    render(<RegisterPage />);
    expect(screen.getByRole('button', { name: /registering/i })).toBeDisabled();
  });
});
