import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from '../admin/admindashboard/page';
import { useRouter } from 'next/navigation';
// import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'; // Not "extend-expect"

import { act } from 'react-dom/test-utils';
//Code structure from ChatGPT

// Mocking the necessary modules
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the global fetch function
global.fetch = jest.fn();

describe('AdminDashboard', () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    // Create a mock function for router.push
    mockPush = jest.fn();

    // Mock the useRouter hook and return the mock push function
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // Reset the fetch mock before each test
    (global.fetch as jest.Mock).mockReset();
  });

  // test('should render loading state initially', () => {
  //   render(<AdminDashboard />);

  //   // Check for loading state
  //   expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  // });

  // test('should display error message when fetch fails', async () => {
  //   // Mock fetch to simulate a failed fetch
  //   (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch users'));

  //   render(<AdminDashboard />);

  //   // Wait for error message to appear
  //   await waitFor(() => screen.getByText(/Failed to fetch users/i));

  //   expect(screen.getByText(/Failed to fetch users/i)).toBeInTheDocument();
  // });

  test('should display users when fetch is successful', async () => {
    const mockUsers = [
      { userid: 1, full_name: 'John Doe', email: 'john@example.com', password: 'password123' },
      { userid: 2, full_name: 'Jane Smith', email: 'jane@example.com', password: 'password456' },
    ];
  
    // Mock fetch to simulate a successful fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ users: mockUsers }),
    });
  
    render(<AdminDashboard />);
  
    // Wrap async actions in act()
    await act(async () => {
      await waitFor(() => screen.getByText('John Doe'));
    });
  
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
  
  // test('should filter users based on search query', async () => {
  //   const mockUsers = [
  //     { userid: 1, full_name: 'John Doe', email: 'john@example.com', password: 'password123' },
  //     { userid: 2, full_name: 'Jane Smith', email: 'jane@example.com', password: 'password456' },
  //   ];

  //   // Mock fetch to simulate a successful fetch
  //   (global.fetch as jest.Mock).mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ users: mockUsers }),
  //   });

  //   render(<AdminDashboard />);

  //   // Wait for users to be rendered
  //   await waitFor(() => screen.getByText('John Doe'));

  //   // Simulate typing in the search input
  //   const searchInput = screen.getByPlaceholderText(/Search Users/i);
  //   fireEvent.change(searchInput, { target: { value: 'John' } });

  //   // Check that the filtered users are displayed
  //   expect(screen.getByText('John Doe')).toBeInTheDocument();
  //   expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  // });

  // test('should handle logout and redirect', async () => {
  //   // Simulate successful fetch
  //   const mockUsers = [{ userid: 1, full_name: 'John Doe', email: 'john@example.com', password: 'password123' }];
  //   (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({ users: mockUsers }) });

  //   render(<AdminDashboard />);

  //   // Wait for users to be rendered
  //   await waitFor(() => screen.getByText('John Doe'));

  //   // Simulate clicking the logout button
  //   const logoutButton = screen.getByText('Log Out');
  //   fireEvent.click(logoutButton);

  //   // Assert that the redirect happened
  //   await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  // });

  // test('should display "No users found" when no users match the search query', async () => {
  //   const mockUsers = [
  //     { userid: 1, full_name: 'John Doe', email: 'john@example.com', password: 'password123' },
  //     { userid: 2, full_name: 'Jane Smith', email: 'jane@example.com', password: 'password456' },
  //   ];

  //   // Mock fetch to simulate a successful fetch
  //   (global.fetch as jest.Mock).mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ users: mockUsers }),
  //   });

  //   render(<AdminDashboard />);

  //   // Wait for users to be rendered
  //   await waitFor(() => screen.getByText('John Doe'));

  //   // Simulate typing in the search input
  //   const searchInput = screen.getByPlaceholderText(/Search Users/i);
  //   fireEvent.change(searchInput, { target: { value: 'Alice' } });

  //   // Check for no users found message
  //   expect(screen.getByText('No users found for "Alice".')).toBeInTheDocument();
  // });
});
