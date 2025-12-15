import React from 'react';
import { useDrop } from 'react-dnd';

const UserList = ({ users, tasks, onDropTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => ({ userId: 'all' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  const handleDropOnUser = (userId) => {
    return (e) => {
      e.preventDefault();
      const taskId = parseInt(e.dataTransfer.getData('task/id'));
      if (taskId && onDropTask) {
        onDropTask(taskId, userId);
      }
    };
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getUserTaskCount = (userId) => {
    return tasks.filter(task => task.assignedTo === userId).length;
  };

  return (
    <div className="user-list-container">
      <h3>Users ({users.filter(u => u.role === 'user').length})</h3>
      <p className="drop-hint">Drop tasks here to reassign</p>
      
      <div className="users-grid">
        {users
          .filter(user => user.role === 'user')
          .map(user => (
            <div
              key={user.id}
              className="user-card"
              onDrop={handleDropOnUser(user.id)}
              onDragOver={handleDragOver}
              data-user-id={user.id}
            >
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <h4>{user.name}</h4>
                <p className="username">@{user.username}</p>
                <div className="user-stats">
                  <span className="task-count">
                    Tasks: {getUserTaskCount(user.id)}
                  </span>
                </div>
              </div>
              <div className="drop-zone-label">
                ↓ Drop task here
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default UserList;