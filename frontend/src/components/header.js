import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";

// const cc = #f5f5f5
export default function Header() {
  
  return (
    <AppBar position="static"sx={{ backgroundColor: '#ffffff' }}>
      <Toolbar>
        <div>
        {/* Left side title */}
        <Button
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: 'black' }}
        >
          Library
        </Button>

        {/* Right side buttons with routing */}
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ mx: 1, color: 'black' }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/explore"
          sx={{ mx: 1, color: 'black' }}
        >
          Explore
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/about"
          sx={{ mx: 1, color: 'black' }}
        >
          About
        </Button>
        </div>
        <div>
          <Button
          color="inherit"
          component={Link}
          to="/signin"
          sx={{ mx: 1, color: 'black' }}
        >
          Sign in
          <Avatar sx={{ m: 1, bgcolor: 'black' }}></Avatar>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
