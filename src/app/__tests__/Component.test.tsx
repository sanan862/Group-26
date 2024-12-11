/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Component from '../(auth)/login/page'; // Adjust the import path
import '@testing-library/jest-dom'; // For extended DOM matchers

beforeAll(() => {
  // Mock the alert function
  global.alert = jest.fn();
});

describe('Component', () => {
  it('renders the login form correctly', () => {
    render(<Component />);
    
    // Check that the email and password fields are present
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    
    // Check that the login button is present
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('updates input values on change', () => {
    render(<Component />);
    
    // Get input fields
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    
    // Simulate user typing into inputs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Check input values
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('displays an error when login fails', async () => {
    // Mock the fetch API to simulate a failed login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid credentials' }),
      })
    ) as jest.Mock;
  
    render(<Component />);
  
    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });
  
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
  
    // Wait for the error message to appear in the document
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument(); // Now this should pass
    });
  });
  
  it('saves token and shows success message on successful login', async () => {
    // Mock the fetch API to simulate a successful login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'mockToken123' }),
      })
    ) as jest.Mock;

    // Mock localStorage
    const setItemMock = jest.spyOn(Storage.prototype, 'setItem');
    
    render(<Component />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Wait for the alert to be called
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Login successful!');
      expect(setItemMock).toHaveBeenCalledWith('authToken', 'mockToken123');
    });

    setItemMock.mockRestore();
  });
});
