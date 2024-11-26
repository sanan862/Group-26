import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import bookImage from "@/../public/book.jpg";
import VerifyModal from "./VerifyModal";

interface Book {
  // title: string;
  // description: string;
  // date: string;
  // price: string;
  bookid: number;
  bookname: string;

}
const handleBorrow = async (bookId:any) => {
  const token = localStorage.getItem('authToken'); // Retrieve the stored token
  if (!token) {
      alert('Please log in to borrow a book.');
      return;
  }

  try {
      const response = await fetch('http://localhost:4000/api/borrow', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
          },
          body: JSON.stringify({ bookId }),
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.error);
      }

      alert('Book borrowed successfully!');
  } catch (error:any) {
      alert(error.message || 'Failed to borrow book.');
  }
};

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
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
        <h3 className="text-xl font-bold">{book.bookname}</h3>
        <p className="text-sm text-muted-foreground">{book.bookid}</p>

        {/* <p className="text-sm text-muted-foreground">{book.description}</p> */}
        {/* <p className="text-sm text-muted-foreground">{book.date}</p> */}
        {/* <div className="mt-4 flex items-center justify-between"> */}
          {/* <span className="text-2xl font-bold">{book.price}</span> */}

          <Button variant="default">
            Read This Book
            {/* <VerifyModal>Read This Book</VerifyModal> */}
          </Button>
          <Button variant="default" onClick={() => handleBorrow(book.bookid)}>
          Borrow Book
        </Button>

        </div>
      {/* </div> */}
    </Card>
  );
};

export default BookCard;
