import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';


const Home = () => {
  return (
    <>
      {/* Hero Section (Book Image) */}
      <Box 
        sx={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          backgroundImage: 'url("https://imgs.search.brave.com/F9qmmS1eMwAKgBKnNphdtOILhLVw8GRLjpzG_awfgsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vOTMvMTc2Mjkz/LTEzMS1BQjdCNzgw/MS9BbGZyZWQtVGVu/bnlzb24tQm9va3Mt/Qnlyb24tUmVhZGlu/Zy1MaXRlcmFjeS1Q/b2V0cnkuanBnP3c9/MjAwJmg9MjAwJmM9/Y3JvcA")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay with text */}
        <Container component="main" maxWidth="xs">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2, color: 'black'  }}>
            Library
          </Typography>

        </Box>
        </Container>
      </Box>

      <Container>
        <Typography>
          asdfnlkann
        </Typography>
      </Container>
    </>
  );
};

export default Home;
