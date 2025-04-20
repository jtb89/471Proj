import React from 'react';

function MemberList({ members }) {
  return (
    <div className="member-list">
      <h3>Library Members</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Card Number</th>
            <th>Late Charges</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.card_number}>
              <td>{member.f_name} {member.l_name}</td>
              <td>{member.email}</td>
              <td>{member.card_number}</td>
              <td>${member.late_charges}</td>
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

export default MemberList;
