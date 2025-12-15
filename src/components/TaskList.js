import React from 'react';
import TaskItem from './TaskItem';
const TaskList = ({ 
  tasks, 
  users, 
  onUpdateStatus, 
  isAdmin,
  onDropTask 
}) => {
  const handleDrop = (e) => {
    e.preventDefault();
    if (onDropTask) {
      const userId = parseInt(e.dataTransfer.getData('user/id'));
      const taskId = parseInt(e.dataTransfer.getData('task/id'));
      onDropTask(taskId, userId);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const filterTasks = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="task-list-container">
      {isAdmin && (
        <div className="admin-instructions">
          <p>💡 Admin Tip: Drag tasks and drop on users to reassign them</p>
        </div>
      )}
      
      <div className="task-columns">
        <div className="task-column">
          <h3>Pending ({filterTasks('pending').length})</h3>
          <div className="tasks-container">
            {filterTasks('pending').map(task => (
              <TaskItem
                key={task.id}
                task={task}
                users={users}
                onUpdateStatus={onUpdateStatus}
                isAdmin={isAdmin}
                isDraggable={isAdmin}
              />
            ))}
          </div>
        </div>
        
        <div className="task-column">
          <h3>In Progress ({filterTasks('in-progress').length})</h3>
          <div className="tasks-container">
            {filterTasks('in-progress').map(task => (
              <TaskItem
                key={task.id}
                task={task}
                users={users}
                onUpdateStatus={onUpdateStatus}
                isAdmin={isAdmin}
                isDraggable={isAdmin}
              />
            ))}
          </div>
        </div>
        
        <div className="task-column">
          <h3>Completed ({filterTasks('completed').length})</h3>
          <div className="tasks-container">
            {filterTasks('completed').map(task => (
              <TaskItem
                key={task.id}
                task={task}
                users={users}
                onUpdateStatus={onUpdateStatus}
                isAdmin={isAdmin}
                isDraggable={isAdmin}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;