import React, { useEffect, useState } from 'react';

function BooksPage() {
  const [books, setBooks] = useState([]); // State to hold books
  const [searchTerm, setSearchTerm] = useState(''); // State to hold search term

  // Function to fetch books from the API
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/books'); // Update URL if necessary
      const data = await response.json();
      setBooks(data.books); // Set the books in state
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Fetch books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []); // Empty dependency array means this runs once after the initial render

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter books based on search term
  const filteredBooks = books.filter(book => 
    book.bookname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Books Page</h2>
      
      <input 
        placeholder='Search book' 
        value={searchTerm} 
        onChange={handleSearchChange} 
      />

      <ul>
        {filteredBooks.map(book => (
          <li key={book.bookid}>
            {book.bookname}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksPage;
