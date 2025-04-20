import React from 'react';

function BookList({ books }) {
  return (
    <div className="book-list">
      <h3>Book Inventory</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Year</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.isbn}>
              <td>{book.title}</td>
              <td>{book.genre}</td>
              <td>{book.year_written}</td>
              <td>{book.isbn}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
