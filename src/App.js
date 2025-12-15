import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { initializeStorage, getCurrentUser } from './utils/storage';
import './styles/App.css';
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeStorage();
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    
    setIsInitialized(true);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!isInitialized) {
    return <div className="app-loading">Initializing Application...</div>;
  }

  return (
    <div className="App">
      {!currentUser ? (
        <Login onLogin={handleLogin} />
      ) : currentUser.role === 'admin' ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <UserDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;