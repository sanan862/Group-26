"use client";

import { useState, useEffect } from "react";
import BookCard from "@/components/custom/BranchLibBookCard";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"; // Import useRouter from 'next/navigation'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React from "react";
import { Autocomplete, TextField } from '@mui/material'; // Import the necessary components

// Define the TypeScript interface for a media item
interface Media {
  id: number;
  name: string;
  genre: string;
  publishedate: string;
  mediatype: string;
}

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Media[]>([]); // Annotate with Media[]
  const [filteredBooks, setFilteredBooks] = useState<Media[]>([]);


  // Fetch books from the API
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

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter media based on the search query
  useEffect(() => {
    setFilteredBooks(
      books.filter(
        (media) =>
          media.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          media.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          media.mediatype.toLowerCase().includes(searchQuery.toLowerCase()) ||
          media.publishedate.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, books]);

  
  return (
    <div className="flex min-h-screen flex-col">
      <Header isLoggedIn />
      <main className="flex-1 px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-2 text-center">
          <strong className="text-2xl">Stock</strong>

            <div className="mx-auto flex max-w-md gap-2">
              <Input
                className="w-48"
                placeholder="Search From Your Books"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <br/>
              <Button onClick={() => setSearchQuery(searchQuery)}>
                Search
              </Button>


            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((media) => (
                <BookCard
                  key={media.id}
                  book={media}
                  refreshBooks={fetchBooks} // Pass refreshBooks to BookCard
                />
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
