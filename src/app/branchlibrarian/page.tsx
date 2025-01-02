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
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newMedia, setNewMedia] = useState({
    name: "",
    genre: "",
    publishedate: "",
    mediatype: "",
    userid: 1, // Example user ID, you should dynamically assign it
  });
  
  const [selectedValue, setSelectedValue] = React.useState('');

  // Options for the media type
  const mediaTypeOptions = ["Book", "CD", "DVD", "Game", "Journals", "Periodical"];

  // Handle changes in the Autocomplete ComboBox
  const handleMediaTypeChange = (event: any, value: string | null) => {
    setNewMedia((prevMedia) => ({
      ...prevMedia,
      mediatype: value || "", // Set to the selected value or an empty string if null
    }));
  };


  const router = useRouter(); // Use the useRouter hook for navigation

  const handleChange = (event:any) => {
    setSelectedValue(event.target.value);
  };

  // Fetch books from the API
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/media");
      const data = await response.json();
      setBooks(data.media);
      setFilteredBooks(data.media);
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/");
        return;
      }

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

  // Handle logout functionality
  const handleLogout = async () => {
    // Clear the token from localStorage
    localStorage.removeItem("authToken");

    // Optionally call the API to invalidate the session on the server side
    await fetch("http://localhost:4000/api/logout", {
      method: "POST",
    });

    // Redirect the user to the search page
    router.push("/");
  };

  // Handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMedia((prevMedia) => ({
      ...prevMedia,
      [name]: value,
    }));
  };

  // some snippets of this function were found using chatgpt
  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/addmedia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMedia),
      });

      const data = await response.json();

      if (response.ok) {
        // Close the modal and reset form data
        closeModal();
        setNewMedia({
          name: "",
          genre: "",
          publishedate: "",
          mediatype: "",
          userid: 1, // Example user ID
        });

        // Refresh the book list
        fetchBooks();
      } else {
        alert("Error adding media: " + data.error);
      }
    } catch (error) {
      console.error("Error adding media:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header isLoggedIn />
      <main className="flex-1 px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-2 text-center">
          <strong className="text-2xl">Welcome Branch Librarian</strong>

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

              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={openModal}
              >
                Add Media
              </Button>

              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={handleLogout}
              >
                Log Out
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

      {/* Modal for adding media */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Media</h3>
            <form onSubmit={handleAddMedia}>
              <div className="mb-4">
                <Input
                  name="name"
                  value={newMedia.name}
                  onChange={handleInputChange}
                  placeholder="Media Name"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  name="genre"
                  value={newMedia.genre}
                  onChange={handleInputChange}
                  placeholder="Genre"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  name="publishedate"
                  value={newMedia.publishedate}
                  onChange={handleInputChange}
                  placeholder="Publish Date"
                  required
                />
              </div>
              <div className="mb-4">
              <Autocomplete
                  options={mediaTypeOptions}
                  value={newMedia.mediatype}
                  onChange={handleMediaTypeChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Media Type" required />
                  )}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="submit" className="bg-green-600 text-white">
                  Add Media
                </Button>
                <Button
                  type="button"
                  className="bg-gray-400 text-white"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
