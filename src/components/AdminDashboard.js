import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskList from './TaskList';
import UserList from './UserList';
import CreateTask from './CreateTask';
import { getUsers, getTasks, saveTasks } from '../utils/storage';
import { logout } from '../utils/storage';
const AdminDashboard = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedUsers = getUsers();
    const storedTasks = getTasks();
    setUsers(storedUsers);
    setTasks(storedTasks);
    setLoading(false);
  };
    const handleCreateTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    alert('Task created successfully!');
  };

  const handleDropTask = (taskId, userId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, assignedTo: userId };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    const task = tasks.find(t => t.id === taskId);
    const user = users.find(u => u.id === userId);
    
    if (task && user) {
      alert(`Task "${task.title}" reassigned to ${user.name}`);
    }
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="admin-dashboard">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
            <p className="welcome-message">Welcome, System Administrator</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </header>
        
        <div className="dashboard-content">
          <div className="left-panel">
            <CreateTask 
              users={users} 
              onCreateTask={handleCreateTask} 
            />
            <UserList 
              users={users} 
              tasks={tasks} 
              onDropTask={handleDropTask} 
            />
          </div>
          
          <div className="right-panel">
            <div className="stats-summary">
              <div className="stat-card">
                <h4>Total Tasks</h4>
                <p className="stat-number">{tasks.length}</p>
              </div>
              <div className="stat-card">
                <h4>Pending</h4>
                <p className="stat-number">{tasks.filter(t => t.status === 'pending').length}</p>
              </div>
              <div className="stat-card">
                <h4>In Progress</h4>
                <p className="stat-number">{tasks.filter(t => t.status === 'in-progress').length}</p>
              </div>
              <div className="stat-card">
                <h4>Completed</h4>
                <p className="stat-number">{tasks.filter(t => t.status === 'completed').length}</p>
              </div>
            </div>
            
            <TaskList 
              tasks={tasks} 
              users={users} 
              isAdmin={true}
              onDropTask={handleDropTask}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default AdminDashboard;