import React from 'react';

function Home({ user }) {
  return (
    <div className="home">
      <h2>Welcome to the Library Management System</h2>
      
      {user ? (
        <>
          <div className="quick-stats">
            <div className="stat-card">
              <h3>Books Available</h3>
              <p>Loading...</p> {/* Replace with actual data */}
            </div>
            <div className="stat-card">
              <h3>Active Members</h3>
              <p>Loading...</p> {/* Replace with actual data */}
            </div>
            <div className="stat-card">
              <h3>Current Loans</h3>
              <p>Loading...</p> {/* Replace with actual data */}
            </div>
          </div>
          
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <ul>
              <li>No recent activity</li> {/* Replace with actual data */}
            </ul>
          </div>
        </>
      ) : (
        <div className="login-prompt">
          <p>Please log in to access the library management features.</p>
        </div>
      )}
    </div>
  );
}

export default Home;
