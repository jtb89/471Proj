import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>Library Management System</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {user && (
          <>
            <Link to="/books">Books</Link>
            <Link to="/members">Members</Link>
            <Link to="/loans">Loans</Link>
            <Link to="/branches">Branches</Link>
          </>
        )}
      </div>
      <div className="auth-section">
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
