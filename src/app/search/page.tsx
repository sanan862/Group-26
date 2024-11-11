"use client";

import { useState } from "react";
import BookCard from "@/components/custom/BookCard";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const books = [
  {
    title: "Book 1",
    description: "An introductory book on JavaScript.",
    price: "$29",
    date: "29 Oct - 5 Nov",
  },
  {
    title: "Book 2",
    description: "Advanced techniques in web development.",
    price: "$45",
    date: "1 Nov - 8 Nov",
  },

  {
    title: "Book 3",
    description: "Understanding TypeScript.",
    price: "$35",
    date: "10 Nov - 17 Nov",
  },
  {
    title: "Book 4",
    description: "Mastering React.",
    price: "$40",
    date: "20 Nov - 27 Nov",
  },
  {
    title: "Book 5",
    description: "CSS for Beginners.",
    price: "$25",
    date: "5 Dec - 12 Dec",
  },
];
export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              filteredBooks.map((book, i) => <BookCard key={i} book={book} />)
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
