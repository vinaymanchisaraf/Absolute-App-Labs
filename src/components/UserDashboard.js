import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import { getTasks, saveTasks, getCurrentUser, getUsers, logout } from '../utils/storage';
const UserDashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedTasks = getTasks();
    const storedUsers = getUsers();
    const user = getCurrentUser();
    
    setCurrentUser(user);
    const userTasks = storedTasks.filter(task => task.assignedTo === user.id);
    setTasks(userTasks);
    setUsers(storedUsers);
    setLoading(false);
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    const allTasks = getTasks();
    const updatedAllTasks = allTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    saveTasks(updatedAllTasks);
    const userTasks = updatedAllTasks.filter(task => task.assignedTo === currentUser.id);
    setTasks(userTasks);
    const task = allTasks.find(t => t.id === taskId);
    if (task) {
      alert(`Task "${task.title}" marked as ${newStatus}`);
    }
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>My Tasks</h1>
          <p className="welcome-message">Welcome, {currentUser?.name}</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      
      <div className="user-stats">
        <div className="stat-card">
          <h4>Pending Tasks</h4>
          <p className="stat-number">{pendingTasks}</p>
        </div>
        <div className="stat-card">
          <h4>In Progress</h4>
          <p className="stat-number">{inProgressTasks}</p>
        </div>
        <div className="stat-card">
          <h4>Completed</h4>
          <p className="stat-number">{completedTasks}</p>
        </div>
        <div className="stat-card">
          <h4>Total Assigned</h4>
          <p className="stat-number">{tasks.length}</p>
        </div>
      </div>
      
      <div className="user-instructions">
        <p>💡 Instructions: Update task status using the dropdown menu below each task</p>
      </div>
      
      {tasks.length === 0 ? (
        <div className="no-tasks">
          <h3>No tasks assigned to you yet</h3>
          <p>Tasks assigned by the admin will appear here</p>
        </div>
      ) : (
        <TaskList 
          tasks={tasks} 
          users={users} 
          onUpdateStatus={handleUpdateStatus}
          isAdmin={false}
        />
      )}
    </div>
  );
};

export default UserDashboard;