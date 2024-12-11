"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VerifyModal from "@/components/custom/VerifyModal";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

export default function AdminDashboard() {
  const [users, setUsers] = useState([]); // State for fetched users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const router = useRouter(); // Initialize router to handle redirects

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/register");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  

  // Filter users based on the search query
  const filteredUsers = users.filter((user: any) =>
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Logout handler
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }
      // Logout API request (Optional if server-side session management exists)
      await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // Clear the token from localStorage
      localStorage.removeItem("authToken");
      // Redirect to login page
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
              {/* <VerifyModal> */}
              {/* <Button>Add New Book</Button> */}
              {/* </VerifyModal> */}
              <Link href="/register-branch-librarian">
                <Button className="text-sm font-medium">
                  Register Branch Librarian
                </Button>
              </Link>
              {/* Logout Button */}
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
              {filteredUsers.map((user: any) => (
                <div
                  key={user.userid}
                  className="rounded-lg border p-4 shadow-sm"
                >
                  <h2 className="text-xl font-bold">{user.full_name}</h2>
                  <p className="text-gray-700">Email: {user.email}</p>
                  <p className="text-gray-500">Password: {user.password}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No users found for &quot;{searchQuery}&quot;.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
