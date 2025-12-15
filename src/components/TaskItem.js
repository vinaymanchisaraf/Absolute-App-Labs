import React from 'react';
import { useDrag } from 'react-dnd';

const TaskItem = ({ task, users, onUpdateStatus, isAdmin, isDraggable }) => {
  const assignedUser = users.find(user => user.id === task.assignedTo);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    canDrag: isDraggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [task.id, isDraggable]);

  const handleStatusChange = (e) => {
    if (onUpdateStatus) {
      onUpdateStatus(task.id, e.target.value);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ff9800';
      case 'in-progress': return '#2196f3';
      case 'completed': return '#4caf50';
      default: return '#757575';
    }
  };

  return (
    <div 
      ref={isDraggable ? drag : null}
      className="task-item"
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: isDraggable ? 'move' : 'default'
      }}
    >
      <div className="task-header">
        <h3>{task.title}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(task.status) }}
        >
          {task.status}
        </span>
      </div>
      
      <p className="task-description">{task.description}</p>
      
      <div className="task-footer">
        <div className="assigned-to">
          <strong>Assigned to:</strong> {assignedUser ? assignedUser.name : 'Unassigned'}
        </div>
        
        <div className="task-created">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </div>
        
        {!isAdmin && onUpdateStatus && (
          <div className="status-update">
            <label htmlFor={`status-${task.id}`}>Update Status:</label>
            <select 
              id={`status-${task.id}`}
              value={task.status}
              onChange={handleStatusChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        )}
        
        {isAdmin && (
          <div className="admin-task-info">
            <div className="task-id">Task ID: {task.id}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;