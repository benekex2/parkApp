import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../AuthContext';
import LoginPage from '@/app/login/page';
import RegisterPage from '@/app/register/page';
import { Language } from '@/graphql/generated';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    back: jest.fn(),
  }),
}));

const loginUserMutationMock = jest.fn();
const registerUserMutationMock = jest.fn();
jest.mock('@/graphql/generated', () => ({
  ...jest.requireActual('@/graphql/generated'),
  useLoginUserMutation: () => [loginUserMutationMock, { loading: false }],
  useRegisterUserMutation: () => [registerUserMutationMock, { loading: false }],
  Language: { English: 'English', Polish: 'Polish' },
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
    type?: string;
  }) => (
    <input
      aria-label={props.label}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      type={props.type}
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
      type="text"
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
      <option value={Language.English}>English</option>
      <option value={Language.Polish}>Polish</option>
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

import { useAuth } from '../AuthContext';
function TestComponent() {
  const { logout, setError, error } = useAuth();
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <button onClick={() => setError({ message: 'err', field: 'query' })}>SetError</button>
      <span data-testid="error">{error ? error.message : ''}</span>
    </div>
  );
}

describe('AuthContext with real views', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('sets token and redirects on successful login', async () => {
    loginUserMutationMock.mockResolvedValueOnce({
      data: { loginUser: { token: 'abc123' } },
    });
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });
    expect(localStorage.getItem('auth-token')).toBe('abc123');
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('sets error on failed login', async () => {
    loginUserMutationMock.mockResolvedValueOnce({
      data: { loginUser: null },
    });
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('registers and redirects on success', async () => {
    registerUserMutationMock.mockResolvedValueOnce({
      data: { registerUser: { status: true } },
    });
    render(
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    );
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jan' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    fireEvent.change(screen.getByLabelText(/language/i), { target: { value: Language.Polish } });
    fireEvent.click(screen.getByLabelText(/accept terms/i));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
    });
    expect(pushMock).toHaveBeenCalledWith('/login');
  });

  it('sets error on failed register', async () => {
    registerUserMutationMock.mockResolvedValueOnce({
      data: { registerUser: { status: false } },
    });
    render(
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    );
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jan' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    fireEvent.change(screen.getByLabelText(/language/i), { target: { value: Language.Polish } });
    fireEvent.click(screen.getByLabelText(/accept terms/i));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
    });
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('logout clears token and redirects', () => {
    localStorage.setItem('auth-token', 'tok');
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    act(() => {
      screen.getByText('Logout').click();
    });
    expect(localStorage.getItem('auth-token')).toBeNull();
    expect(pushMock).toHaveBeenCalledWith('/login');
  });

  it('setError updates error', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    act(() => {
      screen.getByText('SetError').click();
    });
    expect(screen.getByTestId('error').textContent).toBe('err');
  });
});
