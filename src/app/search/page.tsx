"use client";

import { useState, useEffect } from "react";
import BookCard from "@/components/custom/BookCard";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the TypeScript interface for a book
interface Book {
  bookid: number;
  bookname: string;
  
}

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]); // Annotate with Book[]
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

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

  return (
    <div className="flex min-h-screen flex-col">
      <Header isLoggedIn />
      <main className="flex-1 px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Search</h1>
            <div className="mx-auto flex max-w-md gap-2">
              <Input
                placeholder="Search From Your Books"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={() => setSearchQuery(searchQuery)}>
                Search
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
    </div>
  );
}
