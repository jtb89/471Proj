import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Typography, Container, Grid, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress,
  Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const BookManagement = () => {
  // State for book list
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  
  // State for add book form
  const [openAddDialog, setOpenAddDialog] = useState(false);
  
  const [newBook, setNewBook] = useState({
    title: '',
    genre: '',
    year_written: '',
    isbn: '',
    author_id: '',
    branch_id: 1,
    num_copies: 1,
    num_availible: 1
  });
  
  
  // State for notifications
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Load books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Update filtered books when books or search term changes
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

  // Fetch books from API
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('/database/api/books/');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data.books);
      setError(null);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value
    });
  };

  // Handle add book
  const handleAddBook = async () => {
    try {
      const response = await fetch('/database/api/add_book/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to add book');
      }
      
      showNotification('Book added successfully!', 'success');
      setOpenAddDialog(false);
      resetNewBookForm();
      fetchBooks();
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  // Reset the new book form
  const resetNewBookForm = () => {
    setNewBook({
      title: '',
      genre: '',
      year_written: '',
      isbn: '',
      author_id: ''
    });
  };

  // Show notification
  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Library Book Management
        </Typography>
        
        {/* Search and Add Book Controls */}
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
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setOpenAddDialog(true)}
            >
              Add New Book
            </Button>
          </Grid>
        </Grid>
        
        {/* Books Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
          ) : (
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="books table">
                <TableHead>
                  <TableRow>
                    <TableCell>ISBN</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Year Written</TableCell>
                    <TableCell>Author ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                      <TableRow hover key={book.isbn}>
                        <TableCell>{book.isbn}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.genre}</TableCell>
                        <TableCell>{book.year_written}</TableCell>
                        <TableCell>{book.author_id}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        {searchTerm ? "No books match your search" : "No books found in the database"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
      
      {/* Add Book Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  label="Title"
                  value={newBook.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="genre"
                  required
                  fullWidth
                  label="Genre"
                  value={newBook.genre}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="year_written"
                  required
                  fullWidth
                  label="Year Written"
                  type="number"
                  value={newBook.year_written}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="isbn"
                  required
                  fullWidth
                  label="ISBN"
                  value={newBook.isbn}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="author_id"
                  fullWidth
                  label="Author ID (Optional)"
                  value={newBook.author_id}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddBook}>Add Book</Button>
        </DialogActions>
      </Dialog>
      
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

export default BookManagement;