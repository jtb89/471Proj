import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Books from './components/Books';
import Members from './components/Members';
import Loans from './components/Loans';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Branches from './components/Branches';

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route 
              path="/books" 
              element={user ? <Books /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/members" 
              element={user ? <Members /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/loans" 
              element={user ? <Loans /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/branches" 
              element={user ? <Branches /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={<Login setUser={setUser} />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
