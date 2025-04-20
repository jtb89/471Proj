import React, { useState, useEffect } from 'react';
import MemberList from './MemberList';
import AddMemberForm from './AddMemberForm';

function Members() {
  const [members, setMembers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetch('/api/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error('Error fetching members:', err));
  }, []);

  const handleAddMember = (newMember) => {
    fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMember)
    })
      .then(res => res.json())
      .then(data => {
        setMembers([...members, data]);
        setShowAddForm(false);
      });
  };

  return (
    <div className="members">
      <h2>Member Management</h2>
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Cancel' : 'Add New Member'}
      </button>
      
      {showAddForm && <AddMemberForm onAddMember={handleAddMember} />}
      
      <MemberList members={members} />
    </div>
  );
}

export default Members;
