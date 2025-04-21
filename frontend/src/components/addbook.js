
// import React, { useState } from 'react';

// const Addbook = () => {
//     // Set up the state to hold form data
//     const [title, setTitle] = useState('');
//     const [genre, setGenre] = useState('');
//     const [year_written, setYearW] = useState('');
//     const [isbn, setIsbn] = useState('');
//     const [authorId, setAuthorId] = useState('');
//     const [branchId, setBranchId] = useState(1);
//     const [numCopies, setNumCopies] = useState(1);
//     const [message, setMessage] = useState('');

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const bookData = {
//             title,
//             genre,
//             year_written,
//             isbn,
//             author_id: authorId === '' ? null : parseInt(authorId),
//             branch_id: parseInt(branchId),
//             num_copies: parseInt(numCopies)
//         };

//         // Send POST request to Django API
//         try {
//             const response = await fetch('/database/api/add_book/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(bookData),
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 setMessage(result.message);
//             } else {
//                 setMessage(result.error || 'An error occurred');
//             }
//         } catch (error) {
//             setMessage('Error connecting to server');
//         }
//     };

//     return (
//         <div>
//             <h2>Add Book</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Title:</label>
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Genre:</label>
//                     <input
//                         type="text"
//                         value={genre}
//                         onChange={(e) => setGenre(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Year Written (1800–9999):</label>
//                     <input
//                         type="number"
//                         value={year_written}
//                         onChange={(e) => setYearW(e.target.value)}
//                         min="1800"
//                         max="9999"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>ISBN:</label>
//                     <input
//                         type="number"
//                         value={isbn}
//                         onChange={(e) => setIsbn(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Author ID (optional):</label>
//                     <input
//                         type="number"
//                         value={authorId}
//                         onChange={(e) => setAuthorId(e.target.value)}
//                         placeholder="Leave blank for no author"
//                     />
//                 </div>
//                 <div>
//                     <label>Branch ID:</label>
//                     <input
//                         type="number"
//                         value={branchId}
//                         onChange={(e) => setBranchId(e.target.value)}
//                         min="1"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Number of Copies:</label>
//                     <input
//                         type="number"
//                         value={numCopies}
//                         onChange={(e) => setNumCopies(e.target.value)}
//                         min="1"
//                         required
//                     />
//                 </div>
                
//                 <button type="submit">Add Book</button>
//             </form>

//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default Addbook;

import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Typography, Container, Grid, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress,
  Snackbar, Alert
} from '@mui/material';

const Addbook = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year_written, setYearW] = useState('');
  const [isbn, setIsbn] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [branchId, setBranchId] = useState(1);
  const [numCopies, setNumCopies] = useState(1);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('/database/api/books/');
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data.books || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      title,
      genre,
      year_written,
      isbn,
      author_id: authorId || null,
      branch_id: branchId,
      num_copies: numCopies
    };

    try {
      const response = await fetch('/database/api/add_book/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();

      if (response.ok) {
        showNotification(result.message || 'Book added successfully!', 'success');
        fetchBooks();
      } else {
        showNotification(result.error || 'An error occurred', 'error');
      }
    } catch {
      showNotification('Error connecting to server', 'error');
    }
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>Add New Book</Typography>

        {/* Form */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth required label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth required label="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth required label="Year Written" type="number" value={year_written} onChange={(e) => setYearW(e.target.value)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth required label="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Author ID" value={authorId} onChange={(e) => setAuthorId(e.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Branch ID" type="number" value={branchId} onChange={(e) => setBranchId(e.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Number of Copies" type="number" value={numCopies} onChange={(e) => setNumCopies(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">Add Book</Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        {/* Books Table */}
        <Typography variant="h5" gutterBottom>Books in Library</Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
          ) : (
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>ISBN</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Author ID</TableCell>
                    <TableCell>Branch ID</TableCell>
                    <TableCell>Copies</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.length > 0 ? books.map((book) => (
                    <TableRow key={book.isbn}>
                      <TableCell>{book.isbn}</TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.genre}</TableCell>
                      <TableCell>{book.year_written}</TableCell>
                      <TableCell>{book.author_id}</TableCell>
                      <TableCell>{book.branch_id}</TableCell>
                      <TableCell>{book.num_copies}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">No books found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>

      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Addbook;
