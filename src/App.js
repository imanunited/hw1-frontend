import React, { useState } from 'react';
import './App.css';

function App() {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    isbn: ''
  });

  const [searchParams, setSearchParams] = useState({
    title: '',
    author: '',
    isbn: ''
  });

  const [books, setBooks] = useState([]);

  // Add Book
  const handleAddBook = async () => {
    if (!bookData.title || !bookData.author || !bookData.isbn) {
      alert('Please fill in all fields (title, author, and isbn).');
      return;  
    }
    const response = await fetch('http://localhost:8080/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    
    if (response.ok) {
      alert('Book added successfully');
      setBookData({ title: '', author: '', isbn: '' });
    } else {
      alert('Book already exists');
    }
  };

  // Search Books
  const handleSearchBooks = async () => {
    const queryParams = new URLSearchParams(searchParams).toString();
    const response = await fetch(`http://localhost:8080/book/search?${queryParams}`);
    const result = await response.json();
    setBooks(result.data); 
  };

  return (
    <div className="App">
      <h1>Book Management</h1>

      {/* Add books */}
      <div className="book-form">
        <h2>Add a Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={bookData.title}
          onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={bookData.author}
          onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="ISBN"
          value={bookData.isbn}
          onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      {/* Search Books */}
      <div className="book-search">
        <h2>Search Books</h2>
        <input
          type="text"
          placeholder="Title"
          value={searchParams.title}
          onChange={(e) => setSearchParams({ ...searchParams, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={searchParams.author}
          onChange={(e) => setSearchParams({ ...searchParams, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="ISBN"
          value={searchParams.isbn}
          onChange={(e) => setSearchParams({ ...searchParams, isbn: e.target.value })}
        />
        <button onClick={handleSearchBooks}>Search</button>
      </div>

      {/* Show result */}
      <div className="book-list">
        <h2>Book List</h2>
        {books.length > 0 ? (
          <ul>
            {books.map((book, index) => (
              <li key={index}>
                <strong>{book.title}</strong> by {book.author} (ISBN: {book.isbn})
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
