import React, { useState } from 'react';

function AddBookForm({ onAddBook }) {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year_written: '',
    isbn: '',
    author_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <h3>Add New Book</h3>
      <div>
        <label>Title:</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label>Genre:</label>
        <input 
          type="text" 
          name="genre" 
          value={formData.genre} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label>Year Written:</label>
        <input 
          type="number" 
          name="year_written" 
          value={formData.year_written} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>ISBN:</label>
        <input 
          type="number" 
          name="isbn" 
          value={formData.isbn} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label>Author ID (optional):</label>
        <input 
          type="number" 
          name="author_id" 
          value={formData.author_id} 
          onChange={handleChange} 
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBookForm;
