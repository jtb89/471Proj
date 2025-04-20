import React, { useState, useEffect } from 'react';
import LoanList from './LoanList';
import BorrowBookForm from './BorrowBookForm';

function Loans() {
  const [loans, setLoans] = useState([]);
  const [showBorrowForm, setShowBorrowForm] = useState(false);

  useEffect(() => {
    fetch('/api/loans')
      .then(res => res.json())
      .then(data => setLoans(data))
      .catch(err => console.error('Error fetching loans:', err));
  }, []);

  const handleBorrowBook = (loanData) => {
    fetch('/api/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loanData)
    })
      .then(res => res.json())
      .then(data => {
        setLoans([...loans, data]);
        setShowBorrowForm(false);
      });
  };

  return (
    <div className="loans">
      <h2>Loan Management</h2>
      <button onClick={() => setShowBorrowForm(!showBorrowForm)}>
        {showBorrowForm ? 'Cancel' : 'Borrow a Book'}
      </button>
      
      {showBorrowForm && <BorrowBookForm onBorrowBook={handleBorrowBook} />}
      
      <LoanList loans={loans} />
    </div>
  );
}

export default Loans;
