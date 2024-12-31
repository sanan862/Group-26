"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigation
import BookCard from "@/components/custom/BookCard";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import ProfileNav from "@/components/custom/Profilenav";


export default function Dashboard() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [userFullName, setUserFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Next.js router for navigation

  // Logout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("authToken"); // Remove token from storage
      router.push("/login"); // Navigate to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Fetch user full name
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }
      

      const response = await fetch("http://localhost:4000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details.");
      }

      const data = await response.json();
      setUserFullName(data.fullName);
    } catch (err: any) {
      console.error(err.message || "Error fetching user details.");
    }
  };

  // Fetch borrowed books
  const fetchBorrowedBooks = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:4000/api/borrowed-books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch borrowed books.");
      }

      const data = await response.json();
      setBorrowedBooks(data.borrowedBooks);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchBorrowedBooks();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header isLoggedIn />
      <ProfileNav />

      <main className="flex-1 px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex items-center justify-between">
          {/* <ProfileNav /> */}
            <h1 className="text-3xl font-bold">Welcome, {userFullName}!</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          <h2 className="text-3xl font-bold text-center">My Borrowed Media</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : borrowedBooks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {borrowedBooks.map((book, i) => (
                <BookCard key={i} book={book} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No borrowed books found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
