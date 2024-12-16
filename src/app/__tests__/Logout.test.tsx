import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

// Mocking Next.js useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock global fetch
global.fetch = jest.fn() as jest.Mock;

describe("Logout Functionality", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    // Mock the useRouter hook
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Clear localStorage and fetch mocks
    localStorage.clear();
    (fetch as jest.Mock).mockClear();
  });

  it("should logout and redirect to login", async () => {
    // Mock a successful logout API response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Logged out successfully" }),
    });

    // Simulate an auth token in localStorage
    localStorage.setItem("authToken", "mockToken");

    // Mock Logout Button Component
    const LogoutButton = () => {
      const router = useRouter();

      const handleLogout = async () => {
        const response = await fetch("http://localhost:4000/api/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          localStorage.removeItem("authToken");
          router.push("/login");
        }
      };

      return <button onClick={handleLogout}>Logout</button>;
    };

    // Render the Logout Button
    const { getByText } = render(<LogoutButton />);

    // Simulate clicking the logout button
    fireEvent.click(getByText("Logout"));

    // Verify the fetch call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer mockToken`,
          "Content-Type": "application/json",
        },
      });

      // Verify the token is removed
      expect(localStorage.getItem("authToken")).toBeNull();

      // Verify redirection to login
      expect(mockRouter.push).toHaveBeenCalledWith("/login");
    });
  });
});

