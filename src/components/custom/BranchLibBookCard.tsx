import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import bookImage from "@/../public/book.jpg";

interface Media {
  id: number;
  name: string;
  genre: string;
  publishedate: string;
  mediatype: string;
}

// Function to handle the delete operation
const handleDelete = async (id: number, refreshBooks: () => void) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("Please log in to delete a book.");
    return;
  }

  if (!confirm("Are you sure you want to delete this book?")) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:4000/api/media/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete the book.");
    }

    alert("Book deleted successfully!");
    refreshBooks(); // Refresh the book list after deletion
  } catch (error: any) {
    alert(error.message || "Failed to delete the book.");
  }
};

const BookCard: React.FC<{ book: Media; refreshBooks: () => void }> = ({
  book,
  refreshBooks,
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] bg-muted">
        <Image
          alt="Book cover"
          className="h-full w-full object-cover"
          height={300}
          src={bookImage}
          width={400}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{book.name}</h3>
        <p className="text-sm text-muted-foreground">{`Genre: ${book.genre}`}</p>
        <p className="text-sm text-muted-foreground">{`Publish Date: ${book.publishedate}`}</p>
        <p className="text-sm text-muted-foreground">{`Media Type: ${book.mediatype}`}</p>
        <p className="text-sm text-muted-foreground">{`Book ID: ${book.id}`}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <Button
            variant="destructive"
            onClick={() => handleDelete(book.id, refreshBooks)}
          >
            Delete Book
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
