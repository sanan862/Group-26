import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
//Code structure from ChatGPT

//Code structure from ChatGPT
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn() as jest.Mock;

describe("Logout Functionality", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    localStorage.clear();
    (fetch as jest.Mock).mockClear();
  });

  it("should logout and redirect to login", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Logged out successfully" }),
    });

    localStorage.setItem("authToken", "mockToken");

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

    const { getByText } = render(<LogoutButton />);

    fireEvent.click(getByText("Logout"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer mockToken`,
          "Content-Type": "application/json",
        },
      });

      expect(localStorage.getItem("authToken")).toBeNull();

      expect(mockRouter.push).toHaveBeenCalledWith("/login");
    });
  });
});

