
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";

const Makeaccount = () => {
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
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState('success');

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
                setSeverity('success');
            } else {
                setMessage(result.error || 'An error occurred');
                setSeverity('error');
            }
            setOpenSnackbar(true);
        } catch (error) {
            setMessage('Error connecting to server');
            setSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom align="center">
                    Create Account
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                value={fName}
                                onChange={(e) => setFName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                                value={lName}
                                onChange={(e) => setLName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                variant="outlined"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                type="date"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                variant="outlined"
                                value={phoneNum}
                                onChange={(e) => setPhoneNum(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Checked Out Books"
                                type="number"
                                variant="outlined"
                                value={checkedOutBooks}
                                onChange={(e) => setCheckedOutBooks(e.target.value)}
                                InputProps={{ inputProps: { min: 0 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Late Charges"
                                type="number"
                                variant="outlined"
                                value={lateCharges}
                                onChange={(e) => setLateCharges(e.target.value)}
                                InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Card Number"
                                variant="outlined"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="PIN"
                                type="password"
                                variant="outlined"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                fullWidth
                                size="large"
                                sx={{ mt: 2 }}
                            >
                                Create Account
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Makeaccount;