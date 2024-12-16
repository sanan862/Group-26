import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Component from "../(auth)/login/page"; // Adjust the import path as needed
import { useRouter } from "next/navigation";
import '@testing-library/jest-dom'; // Not "extend-expect"

// Mock the useRouter function from Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock window.alert
beforeEach(() => {
  global.alert = jest.fn(); // Mock alert function
});

describe("Login Component", () => {
  const mockPush = jest.fn();

  // beforeEach(() => {
  //   jest.clearAllMocks();
  //   (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  // });
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    global.console.error = jest.fn(); // Mocking console.error to prevent clutter
  });
  

  it("renders the login form correctly", () => {
    render(<Component />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("updates email and password state on input change", () => {
    render(<Component />);
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("displays an error message on failed login", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Invalid credentials" }),
    });

    render(<Component />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() =>
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
    );
  });

  it("stores token and redirects on successful login", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: "test-token" }),
    });

    render(<Component />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "correctpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(localStorage.getItem("authToken")).toBe("test-token");
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  // it("does not redirect or store token if login fails", async () => {
  //   global.fetch = jest.fn().mockResolvedValueOnce({
  //     ok: false,
  //     json: async () => ({ error: "Invalid credentials" }),
  //   });

  //   render(<Component />);

  //   fireEvent.change(screen.getByPlaceholderText("Email"), {
  //     target: { value: "test@example.com" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("Password"), {
  //     target: { value: "wrongpassword" },
  //   });

  //   fireEvent.click(screen.getByRole("button", { name: /log in/i }));

  //   await waitFor(() => {
  //     expect(localStorage.getItem("authToken")).toBeNull();
  //     expect(mockPush).not.toHaveBeenCalled();
  //   });
  // });
    
});
