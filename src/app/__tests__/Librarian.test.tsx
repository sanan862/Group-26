import { renderHook, act } from '@testing-library/react';
import { useState, useEffect } from 'react';

// Define the TypeScript interface for a book
interface Book {
  bookid: number;
  bookname: string;
}

// Custom hook to manage book search
const useBookSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const filtered = books.filter((book) =>
      book.bookname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log({ searchQuery, books, filtered }); // Debugging info
    setFilteredBooks(filtered);
  }, [searchQuery, books]);

  return { searchQuery, setSearchQuery, books, setBooks, filteredBooks };
};

// Test suite
describe('Book Search Functionality', () => {
  it('should filter books based on search query', () => {
    const { result } = renderHook(() => useBookSearch());

    // Add books to the hook's state
    act(() => {
      result.current.setBooks([
        { bookid: 1, bookname: 'The Great Gatsby' },
        { bookid: 2, bookname: 'To Kill a Mockingbird' },
        { bookid: 3, bookname: '1984' },
      ]);
    });

    // Search for a term that matches a subset of books
    act(() => {
      result.current.setSearchQuery('the');
    });

    // Debugging: Log filtered books
    console.log("Filtered Books:", result.current.filteredBooks);

    // Assert the filtered results
    expect(result.current.filteredBooks.length).toBe(1); // Corrected expectation: only "The Great Gatsby"
    expect(result.current.filteredBooks[0].bookname).toBe('The Great Gatsby');
  });

  it('should perform case-insensitive search', () => {
    const { result } = renderHook(() => useBookSearch());

    // Add books to the hook's state
    act(() => {
      result.current.setBooks([
        { bookid: 1, bookname: 'The Great Gatsby' },
        { bookid: 2, bookname: 'To Kill a Mockingbird' },
      ]);
    });

    // Perform a case-insensitive search
    act(() => {
      result.current.setSearchQuery('GREAT');
    });

    // Assert that it finds the correct book regardless of case
    expect(result.current.filteredBooks.length).toBe(1);
    expect(result.current.filteredBooks[0].bookname).toBe('The Great Gatsby');
  });

  it('should handle an empty search query by returning all books', () => {
    const { result } = renderHook(() => useBookSearch());

    // Add books to the hook's state
    act(() => {
      result.current.setBooks([
        { bookid: 1, bookname: 'The Great Gatsby' },
        { bookid: 2, bookname: 'To Kill a Mockingbird' },
      ]);
    });

    // Set an empty search query
    act(() => {
      result.current.setSearchQuery('');
    });

    // Assert that all books are returned
    expect(result.current.filteredBooks.length).toBe(2);
    expect(result.current.filteredBooks).toEqual([
      { bookid: 1, bookname: 'The Great Gatsby' },
      { bookid: 2, bookname: 'To Kill a Mockingbird' },
    ]);
  });
});
