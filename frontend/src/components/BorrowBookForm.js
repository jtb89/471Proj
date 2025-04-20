import React, { useState } from 'react';

function BorrowBookForm({ onBorrowBook }) {
  const [formData, setFormData] = useState({
    card_number: '',
    isbn: '',
    branch_id: ''
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
    const loanData = {
      ...formData,
      date_out: new Date().toISOString().split('T')[0],
      date_due: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 14 days from now
    };
    onBorrowBook(loanData);
  };

  return (
    <form onSubmit={handleSubmit} className="borrow-book-form">
      <h3>Borrow a Book</h3>
      
      <div>
        <label>Member Card Number:</label>
        <input 
          type="number" 
          name="card_number" 
          value={formData.card_number} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div>
        <label>Book ISBN:</label>
        <input 
          type="number" 
          name="isbn" 
          value={formData.isbn} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div>
        <label>Branch ID:</label>
        <input 
          type="number" 
          name="branch_id" 
          value={formData.branch_id} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <button type="submit">Borrow Book</button>
    </form>
  );
}

export default BorrowBookForm;
