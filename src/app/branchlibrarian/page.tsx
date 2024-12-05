"use client";

import { useState, useEffect } from "react";
import BookCard from "@/components/custom/BookCard";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import Modal from "@/components/ui/modal"; // Assume you have a reusable Modal component
import Modal from "@/components/ui/Modal";

// Define the TypeScript interface for a book
interface Book {
  bookid: number;
  bookname: string;
}

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [newBookName, setNewBookName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/books");
        const data = await response.json();
        setBooks(data.books);
        setFilteredBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Filter books based on the search query
  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.bookname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, books]);

  // Handle adding a new book
  const handleAddBook = async () => {
    if (!newBookName.trim()) {
      setErrorMessage("Book name is required.");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookname: newBookName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add book.");
      }

      // Refresh the book list after adding a new book
      const updatedBooks = await fetch("http://localhost:4000/api/books").then((res) =>
        res.json()
      );
      setBooks(updatedBooks.books);
      setFilteredBooks(updatedBooks.books);

      // Close the modal and reset the form
      setIsAddBookModalOpen(false);
      setNewBookName("");
      setErrorMessage("");
    } catch (error:any) {
      console.error("Error adding book:", error);
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header isLoggedIn />
      <main className="flex-1 px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Hello Branch Librarian Search</h1>
            <div className="mx-auto flex max-w-md gap-2">
              <Input
                placeholder="Search From Your Books"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={() => setSearchQuery(searchQuery)}>Search</Button>
              <Button onClick={() => setIsAddBookModalOpen(true)}>
                Add New Book
              </Button>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard key={book.bookid} book={book} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No books found for &quot;{searchQuery}&quot;
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* Add Book Modal */}
      {isAddBookModalOpen && (
        <Modal onClose={() => setIsAddBookModalOpen(false)}>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Add New Book</h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <Input
              placeholder="Book Name"
              value={newBookName}
              onChange={(e) => setNewBookName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button onClick={handleAddBook} className="bg-blue-500 text-white">
                Add
              </Button>
              <Button onClick={() => setIsAddBookModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
