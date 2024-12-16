"use client";

import { useEffect, useState } from "react";
import Header from "@/components/custom/Header";
import ProfileNav from "@/components/custom/Profilenav";

interface BorrowingHistory {
  borrowinghistoryid: number;
  bookname: string;
  genre: string;
  publishedate: string;
  dateborrowed: string;
}

function Page() {
  const [borrowingHistory, setBorrowingHistory] = useState<BorrowingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBorrowingHistory = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("User is not authenticated.");
        }

        const response = await fetch("http://localhost:4000/api/borrow/history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch borrowing history.");
        }

        const data = await response.json();
        setBorrowingHistory(data.history);
      } catch (err: any) {
        console.error("Error fetching borrowing history:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowingHistory();
  }, []);

  return (
    <div>
      <Header isLoggedIn />
      <ProfileNav />
      <div className="mx-auto max-w-4xl p-4">
        <strong className="text-2xl block mb-4">Borrow History</strong>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : borrowingHistory.length > 0 ? (
          <div className="space-y-4">
            {borrowingHistory.map((record) => (
              <div
                key={record.borrowinghistoryid}
                className="rounded-lg border p-4 shadow-sm"
              >
                <h3 className="text-xl font-bold">{record.bookname}</h3>
                <p className="text-gray-700">Genre: {record.genre}</p>
                <p className="text-gray-500">Published Date: {record.publishedate}</p>
                <p className="text-gray-500">Date Borrowed: {record.dateborrowed}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No borrowing history found.</p>
        )}
      </div>
    </div>
  );
}

export default Page;
