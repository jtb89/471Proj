import React, { useState } from 'react';

const Addbook = () => {
    // Set up the state to hold form data
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [year_written, setYearW] = useState('');
    const [isbn, setIsbn] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
            title,
            genre,
            year_written,
            isbn,
            author_id: null,    // optional
            branch_id: 1,
            num_copies: 1
            // num_available is handled by backend (default = num_copies)
        };

        // Send POST request to Django API
        try {
            const response = await fetch('/database/api/add_book/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
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
            <h2>Add Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Genre:</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>year written 1800-9999:</label>
                    <input
                        type="number"
                        value={year_written}
                        onChange={(e) => setYearW(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>isbn:</label>
                    <input
                        type="number"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                    />
                </div>
                {/* <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div> */}
                
                <button type="submit">Add Book</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Addbook;
