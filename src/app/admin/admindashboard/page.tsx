"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import Media from "../media/page"


// Define the type for a user
interface User {
  userid: number;
  full_name: string;
  email: string;
  password: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]); // State for fetched users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [editingUser, setEditingUser] = useState<User | null>(null); // User being edited
  const router = useRouter(); // Initialize router to handle redirects

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/register");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users); // Ensure backend returns users in the correct format
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // some snippets of this function were found using chatgpt
  const handleDelete = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/register/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove user from state after successful deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.userid !== userId));
      alert("User deleted successfully!");
    } catch (err: any) {
      console.error("Error deleting user:", err.message);
    }
  };

  // Update user handler
  const handleUpdate = async () => {
    if (!editingUser) return;

    try {
      const response = await fetch(`http://localhost:4000/api/register/${editingUser.userid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // Update user in state after successful update
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userid === editingUser.userid ? editingUser : user
        )
      );

      setEditingUser(null); // Clear the editing state
      alert("User updated successfully!");
    } catch (err: any) {
      console.error("Error updating user:", err.message);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }
      await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("authToken");
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header isLoggedIn />
      <main className="flex-1 px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Admin</h1>
            <div className="mx-auto flex max-w-md gap-2">
              <Input
                placeholder="Search Users"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={() => setSearchQuery(searchQuery)}>Search</Button>
              <Link href="/register-branch-librarian">
                <Button className="text-sm font-medium">
                  Register Branch Librarian
                </Button>
              </Link>
              <Link href="/admin/media" className="text-base hover:text-blue-500  font-medium hover/80">
              <Button>
              Check Media
              </Button>
          </Link>

              <Button
                onClick={handleLogout}
                className="text-sm font-medium text-red-500"
              >
                Log Out
              </Button>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredUsers.length > 0 ? (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.userid}
                  className="rounded-lg border p-4 shadow-sm"
                >
                  <h2 className="text-xl font-bold">{user.full_name}</h2>
                  <p className="text-gray-700">Email: {user.email}</p>
                  <p className="text-gray-500">Password: {user.password}</p>
                  <Button
                    onClick={() => setEditingUser(user)}
                    className="mt-2 text-sm font-medium text-blue-500"
                  >
                    Edit User
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.userid)}
                    className="mt-2 text-sm font-medium text-red-500"
                  >
                    Delete User
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No users found for &quot;{searchQuery}&quot;.
            </p>
          )}

          {/* Edit User Modal */}
          {editingUser && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-xl font-bold">Edit User</h2>
                <div className="space-y-4">
                  <Input
                    placeholder="Full Name"
                    value={editingUser.full_name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, full_name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    value={editingUser.password}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, password: e.target.value })
                    }
                  />
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    onClick={() => setEditingUser(null)}
                    className="text-sm font-medium text-gray-500"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdate}
                    className="text-sm font-medium text-green-500"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
