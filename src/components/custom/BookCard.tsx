import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import bookImage from "@/../public/book.jpg";
import VerifyModal from "./VerifyModal";

interface Book {
  title: string;
  description: string;
  date: string;
  price: string;
}

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
        <h3 className="text-xl font-bold">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.description}</p>
        <p className="text-sm text-muted-foreground">{book.date}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold">{book.price}</span>

          <Button variant="default">
            <VerifyModal>Read This Book</VerifyModal>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
