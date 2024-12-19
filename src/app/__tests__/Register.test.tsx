import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Component from "../(auth)/signup/page";  // Import your component
import '@testing-library/jest-dom/extend-expect';
import { useRouter } from "next/navigation";
//Code structure from ChatGPT

// Mock Next.js useRouter hook to prevent actual navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock global fetch function to simulate API response
global.fetch = jest.fn();

describe("Component", () => {
  const mockPush = jest.fn();  // Mock useRouter push function

  beforeEach(() => {
    // Reset fetch mock before each test
    (global.fetch as jest.Mock).mockClear();

    // Mock the useRouter hook
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("renders form elements", () => {
    render(<Component />);

    // Check for form fields and submit button
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();

    // Use getAllByPlaceholderText for multiple password inputs
    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    expect(passwordInputs.length).toBe(2); // Ensure two inputs are found
    expect(passwordInputs[0]).toHaveAttribute('id', 'password'); // First password input
    expect(passwordInputs[1]).toHaveAttribute('id', 'confirmPassword'); // Second password input

    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  it("updates form data on input change", () => {
    render(<Component />);

    // Input elements
    const fullNameInput = screen.getByPlaceholderText(/full name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);

    // Simulate user typing
    userEvent.type(fullNameInput, "John Doe");
    userEvent.type(emailInput, "john@example.com");
    userEvent.type(passwordInput, "password123");
    userEvent.type(confirmPasswordInput, "password123");

    // Verify input values are updated
    expect(fullNameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");
  });

  it("shows error if passwords do not match", async () => {
    render(<Component />);

    // Input elements
    const fullNameInput = screen.getByPlaceholderText(/full name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);
    const submitButton = screen.getByText(/create account/i);

    // Simulate user input with mismatched passwords
    userEvent.type(fullNameInput, "John Doe");
    userEvent.type(emailInput, "john@example.com");
    userEvent.type(passwordInput, "password123");
    userEvent.type(confirmPasswordInput, "password321");

    // Submit the form
    userEvent.click(submitButton);

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it("handles successful form submission", async () => {
    render(<Component />);

    // Mock successful API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Account created successfully!" }),
    });

    // Input elements
    const fullNameInput = screen.getByPlaceholderText(/full name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);
    const submitButton = screen.getByText(/create account/i);

    // Simulate user input
    userEvent.type(fullNameInput, "John Doe");
    userEvent.type(emailInput, "john@example.com");
    userEvent.type(passwordInput, "password123");
    userEvent.type(confirmPasswordInput, "password123");

    // Submit the form
    userEvent.click(submitButton);

    // Wait for success message to appear
    await waitFor(() => {
      expect(screen.getByText(/account created successfully!/i)).toBeInTheDocument();
    });

    // Check if the router push function is called
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("handles error during form submission", async () => {
    render(<Component />);

    // Mock API failure
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Something went wrong" }),
    });

    // Input elements
    const fullNameInput = screen.getByPlaceholderText(/full name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);
    const submitButton = screen.getByText(/create account/i);

    // Simulate user input
    userEvent.type(fullNameInput, "John Doe");
    userEvent.type(emailInput, "john@example.com");
    userEvent.type(passwordInput, "password123");
    userEvent.type(confirmPasswordInput, "password123");

    // Submit the form
    userEvent.click(submitButton);

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
