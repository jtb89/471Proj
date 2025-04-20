import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import AddBookForm from './AddBookForm';
import SearchBooks from './SearchBooks';
import { fetchBooks, addBook, deleteBook } from '../services/api';

function Books() {
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
        setFilteredBooks(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    loadBooks();
  }, []);

  const handleAddBook = async (newBook) => {
    try {
      const addedBook = await addBook(newBook);
      setBooks([...books, addedBook]);
      setFilteredBooks([...books, addedBook]);
      setShowAddForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteBook = async (isbn) => {
    try {
      await deleteBook(isbn);
      const updatedBooks = books.filter(book => book.isbn !== isbn);
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredBooks(books);
      return;
    }
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toString().includes(searchTerm)
    );
    setFilteredBooks(filtered);
  };

  if (isLoading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="books">
      <h2>Book Management</h2>
      
      <div className="book-actions">
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className={showAddForm ? 'cancel-button' : 'add-button'}
        >
          {showAddForm ? 'Cancel' : 'Add New Book'}
        </button>
        
        <SearchBooks onSearch={handleSearch} />
      </div>
      
      {showAddForm && <AddBookForm onAddBook={handleAddBook} />}
      
      {error && <div className="error-message">{error}</div>}
      
      <BookList 
        books={filteredBooks} 
        onDelete={handleDeleteBook} 
      />
    </div>
  );
}

export default Books;
