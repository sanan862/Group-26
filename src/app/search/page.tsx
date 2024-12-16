"use client";

import { useState, useEffect } from "react";
import BookCard from "@/components/custom/BookCard";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the TypeScript interface for a book
interface Media {
  id: number;
  name: string;
  genre: string;
  publishedate: string;
  mediatype: string;
  
}

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Media[]>([]); // Annotate with Book[]
  const [filteredBooks, setFilteredBooks] = useState<Media[]>([]);

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/media");
        const data = await response.json();
        setBooks(data.media);
        setFilteredBooks(data.media);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

// Filter media based on the search query
useEffect(() => {
  setFilteredBooks(
    books.filter((media) =>
      media.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    media.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||   
    media.mediatype.toLowerCase().includes(searchQuery.toLowerCase()) ||    
    media.publishedate.toLowerCase().includes(searchQuery.toLowerCase())
  ));
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
            filteredBooks.map((media) => (
              <BookCard key={media.id} book={media} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No media found for &quot;{searchQuery}&quot;
            </p>
          )}
        </div>
      </div>
    </main>
    <Footer />
  </div>
  );
}
