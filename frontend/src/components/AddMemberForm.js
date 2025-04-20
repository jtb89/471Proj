import React, { useState } from 'react';

function AddMemberForm({ onAddMember }) {
  const [formData, setFormData] = useState({
    f_name: '',
    l_name: '',
    address: '',
    dob: '',
    email: '',
    phonenum: '',
    checked_out_books: '',
    late_charges: 0,
    card_number: '',
    pin: ''
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
    onAddMember(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="add-member-form">
      <h3>Add New Member</h3>
      
      <div>
        <label>First Name:</label>
        <input type="text" name="f_name" value={formData.f_name} onChange={handleChange} required />
      </div>
      
      <div>
        <label>Last Name:</label>
        <input type="text" name="l_name" value={formData.l_name} onChange={handleChange} required />
      </div>
      
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      
      <div>
        <label>Date of Birth:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
      </div>
      
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      
      <div>
        <label>Phone Number:</label>
        <input type="tel" name="phonenum" value={formData.phonenum} onChange={handleChange} required />
      </div>
      
      <div>
        <label>Card Number:</label>
        <input type="number" name="card_number" value={formData.card_number} onChange={handleChange} required />
      </div>
      
      <div>
        <label>PIN:</label>
        <input type="password" name="pin" value={formData.pin} onChange={handleChange} required />
      </div>
      
      <button type="submit">Add Member</button>
    </form>
  );
}

export default AddMemberForm;
