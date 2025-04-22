import React, { useState, useEffect } from 'react';
import {
  Box, CircularProgress, Typography, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Alert
} from '@mui/material';
import { useAuth } from "./authcontext";

const Mybooks = () => {
  const { authInfo } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authInfo?.identifier) {
      fetchBooks();
    }
  }, [authInfo]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/database/api/member_books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ card_number: authInfo.identifier })
      });

      if (!response.ok) throw new Error("Failed to fetch borrowed books");

      const data = await response.json();
      setBooks(data.borrowed_books || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        My Borrowed Books
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        ) : (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Date Out</TableCell>
                  <TableCell>Date Due</TableCell>
                  <TableCell>Date In</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.length > 0 ? (
                  books.map((book, index) => (
                    <TableRow key={`${book.title}-${index}`}>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.date_out || "N/A"}</TableCell>
                      <TableCell>{book.date_due || "N/A"}</TableCell>
                      <TableCell>{book.date_in || "N/A"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No borrowed books found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </>
  );
};

export default Mybooks;
