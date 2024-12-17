import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Dashboard from "../dashboard/page"; // Adjust the path to your component
import { useRouter } from "next/navigation";

// Mocking dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mocking global fetch API
global.fetch = jest.fn() as jest.Mock;

// Mocking localStorage
beforeAll(() => {
  // Mocking localStorage for test cases
  global.localStorage = {
    getItem: jest.fn(() => "fakeToken"),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    length: 0, // Can return the number of items stored
    key: jest.fn((index: number) => `key${index}`), // Providing a mock for the key method
  } as Storage; // Explicitly typing the object as Storage
});

describe("Dashboard Component", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    localStorage.clear();
    (fetch as jest.Mock).mockClear();
  });

  it("should render loading text initially", () => {
    render(<Dashboard />);

    // Check for the loading state
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("should fetch user details and borrowed books on mount", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          fullName: "John Doe",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          borrowedBooks: [
            { title: "Book 1" },
            { title: "Book 2" },
          ],
        }));

    render(<Dashboard />);

    // Wait for the component to finish loading and rendering data
    await waitFor(() => screen.getByText(/Welcome, John Doe!/i));

    // Check that the user's full name and borrowed books are rendered
    expect(screen.getByText(/Welcome, John Doe!/i)).toBeInTheDocument();
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
  });

  it("should display an error if user details fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch user details"));

    render(<Dashboard />);

    // Wait for the error message to appear
    await waitFor(() => screen.getByText(/Error fetching user details./i));

    expect(screen.getByText(/Error fetching user details./i)).toBeInTheDocument();
  });

  it("should display an error if borrowed books fetch fails", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          fullName: "John Doe",
        }),
      })
      .mockRejectedValueOnce(new Error("Failed to fetch borrowed books"));

    render(<Dashboard />);

    // Wait for the error message related to books
    await waitFor(() => screen.getByText(/Failed to fetch borrowed books./i));

    expect(screen.getByText(/Failed to fetch borrowed books./i)).toBeInTheDocument();
  });

  it("should handle user logout", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          fullName: "John Doe",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          borrowedBooks: [],
        }));

    render(<Dashboard />);

    // Click logout button
    const logoutButton = screen.getByText(/logout/i);
    userEvent.click(logoutButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer fakeToken`,
          "Content-Type": "application/json",
        },
      });

      expect(localStorage.removeItem).toHaveBeenCalledWith("authToken");
      expect(mockRouterPush).toHaveBeenCalledWith("/login");
    });
  });

  it("should display 'No borrowed books found.' if no books are borrowed", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          fullName: "John Doe",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          borrowedBooks: [],
        }));

    render(<Dashboard />);

    // Wait for the component to render the message for no borrowed books
    await waitFor(() => screen.getByText(/No borrowed books found./i));

    expect(screen.getByText(/No borrowed books found./i)).toBeInTheDocument();
  });
});
