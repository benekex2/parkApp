import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../page';

let mockAuthContext = {
  login: jest.fn(),
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
    type?: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }) => (
    <input
      aria-label={props.label}
      type={props.type}
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
      type="text"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  ),
}));
jest.mock('@/components/Error', () => ({
  Error: () => <div data-testid="error" />,
}));

describe('LoginPage', () => {
  beforeEach(() => {
    mockAuthContext = {
      login: jest.fn(),
      setError: jest.fn(),
      error: null,
      loading: false,
    };
  });

  it('renders form fields and button', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  it('calls setError with validation error on invalid email', () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockAuthContext.setError).toHaveBeenCalledWith({
      message: expect.stringContaining('Please use correct formatting'),
      field: 'email',
    });
    expect(mockAuthContext.login).not.toHaveBeenCalled();
  });

  it('calls login on valid submit', () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockAuthContext.setError).toHaveBeenCalledWith(null);
    expect(mockAuthContext.login).toHaveBeenCalledWith('test@email.com', 'pass');
  });

  it('disables button when loading', () => {
    mockAuthContext.loading = true;
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: /logging/i })).toBeDisabled();
  });
});
