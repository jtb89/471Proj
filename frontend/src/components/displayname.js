// dont think code Actually used and was only for testing

import React from 'react';
import { useAuth } from './authcontext';
import { Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const DisplayName = () => {
  const { authInfo, logout } = useAuth(); 
  console.log("AuthContext authInfo:", authInfo); 
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        {authInfo ? (
          <>
            <Typography variant="h4" gutterBottom>
              Welcome, {authInfo.identifier}!
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              You are logged in as a {authInfo.is_employee ? "Employee" : "Member"}.
            </Typography>
            <button onClick={logout}>Log out</button> 
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Nobody is logged in
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Please <Link to="/signin">Login</Link> to access the system.
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default DisplayName;
