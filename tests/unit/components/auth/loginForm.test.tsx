import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoginForm from '@/components/auth/loginForm';

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
});