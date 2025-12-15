import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const CreateTask = ({ users, onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!assignedTo) newErrors.assignedTo = 'Please assign to a user';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const newTask = {
      id: Date.now(), 
      title: title.trim(),
      description: description.trim(),
      assignedTo: parseInt(assignedTo),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    onCreateTask(newTask);
    
    
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setErrors({});
  };

  const regularUsers = users.filter(user => user.role === 'user');

  return (
    <div className="create-task-container">
      <h3>Create New Task</h3>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            rows="3"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="assignedTo">Assign To *</label>
          <select
            id="assignedTo"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className={errors.assignedTo ? 'error' : ''}
          >
            <option value="">Select a user</option>
            {regularUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.assignedTo && <span className="error-text">{errors.assignedTo}</span>}
        </div>
        
        <button type="submit" className="create-task-button">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;