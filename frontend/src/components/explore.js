import React from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const Explore = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5"> to Explore</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Textboxs here to see if i can add data to the database and then retrive it
        </Typography>
        <TextField>
          
        </TextField>
      </Paper>
    </Container>
  );
};

export default Explore;
