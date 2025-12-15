const STORAGE_KEYS = {
  USERS: 'taskManager_users',
  TASKS: 'taskManager_tasks',
  CURRENT_USER: 'taskManager_currentUser'
};
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers = [
      { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'System Administrator' },
      { id: 2, username: 'john', password: 'user123', role: 'user', name: 'John Doe' },
      { id: 3, username: 'jane', password: 'user123', role: 'user', name: 'Jane Smith' },
      { id: 4, username: 'mike', password: 'user123', role: 'user', name: 'Mike Johnson' }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
    const defaultTasks = [
      { id: 1, title: 'Design Homepage', description: 'Create wireframes for homepage', assignedTo: 2, status: 'pending', createdAt: new Date().toISOString() },
      { id: 2, title: 'API Development', description: 'Build REST API endpoints', assignedTo: 3, status: 'in-progress', createdAt: new Date().toISOString() },
      { id: 3, title: 'Database Setup', description: 'Configure database schema', assignedTo: 4, status: 'completed', createdAt: new Date().toISOString() },
      { id: 4, title: 'Testing', description: 'Write unit tests for components', assignedTo: 2, status: 'pending', createdAt: new Date().toISOString() }
    ];
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(defaultTasks));
  }
};


export const getUsers = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
};

export const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};


export const getTasks = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS)) || [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
};

export const setCurrentUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};