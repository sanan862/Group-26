import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // For extended DOM matchers
import BookCard from "@/components/custom/BranchLibBookCard";

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

// Mock fetch API
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

// Utility function for setting up mock fetch responses
const mockFetch = (response: Partial<Response>, jsonResponse: any) => {
  (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
    ok: response.ok ?? true,
    json: jest.fn().mockResolvedValue(jsonResponse),
    ...response,
  } as Response);
};

// Mock window.alert
beforeEach(() => {
  jest.clearAllMocks();
  global.alert = jest.fn();
});

describe("BookCard Component", () => {
  const mockBook = {
    id: 1,
    name: "Test Book",
    genre: "Fiction",
    publishedate: "2022-01-01",
    mediatype: "Book",
  };

  it("renders the book details correctly", () => {
    render(<BookCard book={mockBook} refreshBooks={jest.fn()} />);
    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(screen.getByText("Genre: Fiction")).toBeInTheDocument();
    expect(screen.getByText("Publishe Date: 2022-01-01")).toBeInTheDocument();
    expect(screen.getByText("Media Type: Book")).toBeInTheDocument();
    expect(screen.getByText("Book ID: 1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /borrow/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /return/i })).toBeInTheDocument();
  });

  it("triggers borrow functionality when the Borrow button is clicked", async () => {
    localStorage.setItem("authToken", "mockToken");
    mockFetch({ ok: true }, {});

    render(<BookCard book={mockBook} refreshBooks={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /borrow/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/api/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mockToken",
        },
        body: JSON.stringify({ id: mockBook.id }),
      });
    });
    expect(global.alert).toHaveBeenCalledWith("media borrowed successfully!");
  });

  it("displays an alert if the Borrow button is clicked without authentication", () => {
    render(<BookCard book={mockBook} refreshBooks={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /borrow/i }));
    expect(global.alert).toHaveBeenCalledWith("Please log in to borrow media.");
  });

  it("triggers return functionality when the Return button is clicked", async () => {
    localStorage.setItem("authToken", "mockToken");
    mockFetch({ ok: true }, {});

    render(<BookCard book={mockBook} refreshBooks={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /return/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/api/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mockToken",
        },
        body: JSON.stringify({ id: mockBook.id }),
      });
    });
    expect(global.alert).toHaveBeenCalledWith("Book returned successfully!");
  });

  it("displays an alert if the Return button is clicked without authentication", () => {
    render(<BookCard book={mockBook} refreshBooks={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /return/i }));
    expect(global.alert).toHaveBeenCalledWith("Please log in to return a book.");
  });

  it("handles errors gracefully during borrow", async () => {
    localStorage.setItem("authToken", "mockToken");
    mockFetch({ ok: false }, { error: "Borrow failed" });

    render(<BookCard book={mockBook} refreshBooks={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /borrow/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Borrow failed");
    });
  });

  it("handles errors gracefully during return", async () => {
    localStorage.setItem("authToken", "mockToken");
    mockFetch({ ok: false }, { error: "Return failed" });

    render(<BookCard book={mockBook} refreshBooks={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /return/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Return failed");
    });
  });
});
