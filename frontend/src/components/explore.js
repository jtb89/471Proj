// import React, { useState, useEffect } from 'react';
// import {
//   Box, Button, TextField, Typography, Container, Grid, Paper, Table,
//   TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress,
//   Snackbar, Alert
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useAuth } from "./authcontext";

// const Explore = () => {
//   // State for book list
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // State for search
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredBooks, setFilteredBooks] = useState([]);

//   // State for notifications
//   const [notification, setNotification] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });

//   // Load books on component mount
//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   // Update filtered books when books or search term changes
//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = books.filter(book => 
//         book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.isbn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.genre?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredBooks(filtered);
//     } else {
//       setFilteredBooks(books);
//     }
//   }, [books, searchTerm]);

//   // Fetch books from API
//   const fetchBooks = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('/database/api/books/');
//       if (!response.ok) {
//         throw new Error('Failed to fetch books');
//       }
//       const data = await response.json();
//       setBooks(data.books);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       showNotification(err.message, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show notification
//   const showNotification = (message, severity) => {
//     setNotification({
//       open: true,
//       message,
//       severity
//     });
//   };

//   // Close notification
//   const handleCloseNotification = () => {
//     setNotification({
//       ...notification,
//       open: false
//     });
//   };

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Library Book Management
//         </Typography>

//         {/* Search Bar */}
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               label="Search books by title, ISBN or genre"
//               variant="outlined"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
//               }}
//             />
//           </Grid>
//         </Grid>

//         {/* Books Table */}
//         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//           {loading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
//               <CircularProgress />
//             </Box>
//           ) : error ? (
//             <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
//           ) : (
//             <TableContainer sx={{ maxHeight: 440 }}>
//               <Table stickyHeader aria-label="books table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>ISBN</TableCell>
//                     <TableCell>Title</TableCell>
//                     <TableCell>Genre</TableCell>
//                     <TableCell>Year Written</TableCell>
//                     <TableCell>Author ID</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredBooks.length > 0 ? (
//                     filteredBooks.map((book) => (
//                       <TableRow hover key={book.isbn}>
//                         <TableCell>{book.isbn}</TableCell>
//                         <TableCell>{book.title}</TableCell>
//                         <TableCell>{book.genre}</TableCell>
//                         <TableCell>{book.year_written}</TableCell>
//                         <TableCell>{book.author_id}</TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={5} align="center">
//                         {searchTerm ? "No books match your search" : "No books found in the database"}
//                       </TableCell>
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

// export default Explore;

import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Typography, Container, Grid, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress,
  Snackbar, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from "./authcontext";

const Explore = () => {
  const { authInfo } = useAuth();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [isbnInput, setIsbnInput] = useState('');
  const [branchInput, setBranchInput] = useState('');
  const [dateOutInput, setDateOutInput] = useState('');
  const [dateDueInput, setDateDueInput] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = books.filter(book =>
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [books, searchTerm]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/database/api/get_books_full");
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      setBooks(data.books || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleBorrow = async () => {
    try {
      const response = await fetch('/database/api/borrow_book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card_number: authInfo.identifier,
          isbn: isbnInput,
          branch_id: parseInt(branchInput),
          date_out: dateOutInput || new Date().toISOString().split('T')[0],
          date_due: dateDueInput || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        }),
      });
      const data = await response.json();
      if (response.ok) {
        showNotification('Book borrowed successfully!', 'success');
      } else {
        showNotification(data.message || 'Failed to borrow book', 'error');
      }
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  const handleReturn = async () => {
    try {
      const response = await fetch('/database/api/return_book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card_number: authInfo.identifier,
          isbn: isbnInput,
          branch_id: parseInt(branchInput),
          date_in: new Date().toISOString().split('T')[0],
        }),
      });
      const data = await response.json();
      if (response.ok) {
        showNotification('Book returned successfully!', 'success');
      } else {
        showNotification(data.message || 'Failed to return book', 'error');
      }
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Library Book Management
        </Typography>

        {!authInfo?.is_employee && authInfo?.identifier && (
          <Paper elevation={3} sx={{ p: 2, mb: 3, backgroundColor: '#f0f8ff' }}>
            <Typography variant="h6" gutterBottom>
              Borrow or Return a Book
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Book ISBN"
                  variant="outlined"
                  value={isbnInput}
                  onChange={(e) => setIsbnInput(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Branch ID"
                  variant="outlined"
                  value={branchInput}
                  onChange={(e) => setBranchInput(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date Out"
                  type="date"
                  variant="outlined"
                  value={dateOutInput}
                  onChange={(e) => setDateOutInput(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date Due"
                  type="date"
                  variant="outlined"
                  value={dateDueInput}
                  onChange={(e) => setDateDueInput(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleBorrow}>
                  Borrow Book
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={handleReturn}>
                  Return Book
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search books by title, ISBN or genre"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
              }}
            />
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom>
          View Books
        </Typography>

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
                    <TableCell>Year Written</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Branch ID</TableCell>
                    <TableCell>Branch Name</TableCell>
                    <TableCell>Available Copies</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                      <TableRow key={`${book.isbn}-${book.branch_id || 'null'}-${index}`}>
                        <TableCell>{book.isbn}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.genre}</TableCell>
                        <TableCell>{book.year_written}</TableCell>
                        <TableCell>{book.author_name || "N/A"}</TableCell>
                        <TableCell>{book.branch_id || "N/A"}</TableCell>
                        <TableCell>{book.branch_name || "N/A"}</TableCell>
                        <TableCell>{book.total_available ?? book.num_availible ?? 0}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No books found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>

      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Explore;
