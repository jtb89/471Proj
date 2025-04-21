
// import React, { useState, useEffect } from 'react';
// import {
//   Box, Button, TextField, Typography, Container, Grid, Paper, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress,
//   Snackbar, Alert
// } from '@mui/material';

// const Addbook = () => {
//   const [title, setTitle] = useState('');
//   const [genre, setGenre] = useState('');
//   const [year_written, setYearW] = useState('');
//   const [isbn, setIsbn] = useState('');
//   const [authorId, setAuthorId] = useState('');
//   const [branchId, setBranchId] = useState(1);
//   const [numCopies, setNumCopies] = useState(1);

//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [notification, setNotification] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('/database/api/books/');
//       if (!response.ok) throw new Error('Failed to fetch books');
//       const data = await response.json();
//       setBooks(data.books || []);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       showNotification(err.message, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const bookData = {
//       title,
//       genre,
//       year_written,
//       isbn,
//       author_id: authorId || null,
//       branch_id: branchId,
//       num_copies: numCopies
//     };

//     try {
//       const response = await fetch('/database/api/add_book/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(bookData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         showNotification(result.message || 'Book added successfully!', 'success');
//         fetchBooks();
//       } else {
//         showNotification(result.error || 'An error occurred', 'error');
//       }
//     } catch {
//       showNotification('Error connecting to server', 'error');
//     }
//   };

//   const showNotification = (message, severity) => {
//     setNotification({ open: true, message, severity });
//   };

//   const handleCloseNotification = () => {
//     setNotification({ ...notification, open: false });
//   };

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h4" gutterBottom>Add New Book</Typography>

//         {/* Form */}
//         <Paper sx={{ p: 3, mb: 4 }}>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField fullWidth required label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField fullWidth required label="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField fullWidth required label="Year Written" type="number" value={year_written} onChange={(e) => setYearW(e.target.value)} />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField fullWidth required label="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField fullWidth label="Author ID" value={authorId} onChange={(e) => setAuthorId(e.target.value)} />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField fullWidth label="Branch ID" type="number" value={branchId} onChange={(e) => setBranchId(e.target.value)} />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField fullWidth label="Number of Copies" type="number" value={numCopies} onChange={(e) => setNumCopies(e.target.value)} />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button variant="contained" type="submit">Add Book</Button>
//               </Grid>
//             </Grid>
//           </form>
//         </Paper>

//         {/* Books Table */}
//         <Typography variant="h5" gutterBottom>Books in Library</Typography>
//         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//           {loading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
//               <CircularProgress />
//             </Box>
//           ) : error ? (
//             <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
//           ) : (
//             <TableContainer sx={{ maxHeight: 440 }}>
//               <Table stickyHeader>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>ISBN</TableCell>
//                     <TableCell>Title</TableCell>
//                     <TableCell>Genre</TableCell>
//                     <TableCell>Year</TableCell>
//                     <TableCell>Author ID</TableCell>
//                     <TableCell>Branch ID</TableCell>
//                     <TableCell>Copies</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {books.length > 0 ? books.map((book) => (
//                     <TableRow key={book.isbn}>
//                       <TableCell>{book.isbn}</TableCell>
//                       <TableCell>{book.title}</TableCell>
//                       <TableCell>{book.genre}</TableCell>
//                       <TableCell>{book.year_written}</TableCell>
//                       <TableCell>{book.author_id}</TableCell>
//                       <TableCell>{book.branch_id}</TableCell>
//                       <TableCell>{book.num_copies}</TableCell>
//                     </TableRow>
//                   )) : (
//                     <TableRow>
//                       <TableCell colSpan={7} align="center">No books found</TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Paper>
//       </Box>

//       {/* Notification */}
//       <Snackbar 
//         open={notification.open} 
//         autoHideDuration={6000} 
//         onClose={handleCloseNotification}
//       >
//         <Alert 
//           onClose={handleCloseNotification} 
//           severity={notification.severity}
//           sx={{ width: '100%' }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
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
  const [deleteIsbn, setDeleteIsbn] = useState('');

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

  const handleDeleteBook = async (e) => {
    e.preventDefault();
    if (!deleteIsbn.trim()) {
      showNotification('Please enter an ISBN to delete', 'warning');
      return;
    }

    try {
      const response = await fetch('/database/api/delete_book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isbn: deleteIsbn }),
      });

      const result = await response.json();

      if (response.ok) {
        showNotification(result.message || 'Book deleted successfully!', 'success');
        setDeleteIsbn('');
        fetchBooks(); // Refresh book list
      } else {
        showNotification(result.error || 'Failed to delete book', 'error');
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

  
        <Typography variant="h4" gutterBottom>Add Book</Typography>
        <Paper sx={{ p: 3, mb: 6 }}>
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

        <Typography variant="h4" gutterBottom>Delete Book</Typography>
        <Paper sx={{ p: 3, mb: 6 }}>
          <form onSubmit={handleDeleteBook}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  required
                  label="Enter ISBN to Delete"
                  value={deleteIsbn}
                  onChange={(e) => setDeleteIsbn(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button fullWidth variant="outlined" type="submit" color="error">
                  Delete Book
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Typography variant="h4" gutterBottom>View Books</Typography>
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

      {/* Notifications */}
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
