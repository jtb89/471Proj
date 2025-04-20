import React from 'react';

function LoanList({ loans }) {
  return (
    <div className="loan-list">
      <h3>Current Loans</h3>
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Member</th>
            <th>Date Out</th>
            <th>Date Due</th>
            <th>Date In</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={`${loan.card_number}-${loan.isbn}`}>
              <td>{loan.title}</td>
              <td>{loan.card_number}</td>
              <td>{new Date(loan.date_out).toLocaleDateString()}</td>
              <td>{new Date(loan.date_due).toLocaleDateString()}</td>
              <td>{loan.date_in ? new Date(loan.date_in).toLocaleDateString() : 'Not returned'}</td>
              <td>
                {!loan.date_in && <button>Return</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoanList;
