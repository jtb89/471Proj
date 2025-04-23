// this code was not used

import React, { useState } from 'react';

const About = () => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [checkedOutBooks, setCheckedOutBooks] = useState(0);
    const [lateCharges, setLateCharges] = useState(0);
    const [cardNumber, setCardNumber] = useState('');
    const [pin, setPin] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const memberData = {
            f_name: fName,
            l_name: lName,
            address: address,
            dob: dob,
            email: email,
            phonenum: phoneNum,
            checked_out_books: checkedOutBooks,
            late_charges: lateCharges,
            card_number: cardNumber,
            pin: pin,
        };

        
        try {
            const response = await fetch('/database/api/add-member/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memberData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message);
            } else {
                setMessage(result.error || 'An error occurred');
            }
        } catch (error) {
            setMessage('Error connecting to server');
        }
    };


    return (
        <div>
            <h2>Add Member</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={fName}
                        onChange={(e) => setFName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lName}
                        onChange={(e) => setLName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNum}
                        onChange={(e) => setPhoneNum(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Checked Out Books:</label>
                    <input
                        type="number"
                        value={checkedOutBooks}
                        onChange={(e) => setCheckedOutBooks(e.target.value)}
                    />
                </div>
                <div>
                    <label>Late Charges:</label>
                    <input
                        type="number"
                        value={lateCharges}
                        onChange={(e) => setLateCharges(e.target.value)}
                    />
                </div>
                <div>
                    <label>Card Number:</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>PIN:</label>
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Member</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default About;