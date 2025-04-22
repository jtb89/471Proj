import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Order = () => {
  const [isbn, setIsbn] = useState("");
  const [numCopies, setNumCopies] = useState(1);
  const [publisher, setPublisher] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const [cost, setCost] = useState("");
  const [branchNum, setBranchNum] = useState("");
  const [employeeNum, setEmployeeNum] = useState("");
  const [deleteOrderNum, setDeleteOrderNum] = useState("");


  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("/database/api/get_all_orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data.orders || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const orderData = {
      isbn,
      num_copies: parseInt(numCopies),
      publisher,
      order_num: orderNum,
      cost: parseFloat(cost),
      branch_num: parseInt(branchNum),
      employee_num: parseInt(employeeNum),
    };

    try {
      const response = await fetch("/database/api/place_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        showNotification(result.message || "Order placed successfully!", "success");
        fetchOrders();
      } else {
        showNotification(result.error || "An error occurred", "error");
      }
    } catch {
      showNotification("Error connecting to server", "error");
    }
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleDeleteOrder = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/database/api/cancel_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_num: deleteOrderNum }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        showNotification(result.message || "Order cancelled successfully!", "success");
        setDeleteOrderNum("");
        fetchOrders(); // Refresh list
      } else {
        showNotification(result.error || "Failed to cancel order", "error");
      }
    } catch (err) {
      showNotification("Error connecting to server", "error");
    }
  };
  

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Place Order
        </Typography>
        <Paper sx={{ p: 3, mb: 6 }}>
          <form onSubmit={handlePlaceOrder}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  label="ISBN"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  label="Number of Copies"
                  type="number"
                  value={numCopies}
                  onChange={(e) => setNumCopies(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  label="Publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  label="Order Number"
                  value={orderNum}
                  onChange={(e) => setOrderNum(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  label="Cost"
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  label="Branch Number"
                  value={branchNum}
                  onChange={(e) => setBranchNum(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  label="Employee Number"
                  value={employeeNum}
                  onChange={(e) => setEmployeeNum(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Typography variant="h4" gutterBottom>
                  cancel order
                </Typography>
                <Paper sx={{ p: 3, mb: 6 }}>
                  <form onSubmit={handleDeleteOrder}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={9}>
                        <TextField
                          fullWidth
                          required
                          label="Enter Order# to Cancel"
                          value={deleteOrderNum}
                          onChange={(e) => setDeleteOrderNum(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Button
                          fullWidth
                          variant="outlined"
                          type="submit"
                          color="error"
                        >
                          Cancel Order
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
        

        <Typography variant="h4" gutterBottom>
          View Orders
        </Typography>
        <Paper sx={{ width: "100%", overflow: "auto" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ m: 2 }}>
              {error}
            </Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order #</TableCell>
                    <TableCell>ISBN</TableCell>
                    <TableCell>Copies</TableCell>
                    <TableCell>Publisher</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Employee</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Date Ordered</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.order_num}>
                      <TableCell>{order.order_num}</TableCell>
                      <TableCell>{order.isbn}</TableCell>
                      <TableCell>{order.num_copies}</TableCell>
                      <TableCell>{order.publisher_name}</TableCell>
                      <TableCell>{order.branch_id}</TableCell>
                      <TableCell>{order.employee_num}</TableCell>
                      <TableCell>${parseFloat(order.cost).toFixed(2)}</TableCell>
                      <TableCell>{new Date(order.date_ordered).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Order;
