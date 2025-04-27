// src/components/TodoApp.js

import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFetch } from '../hooks/useFetch';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import styles from '../styles/TodoApp.module.css';

export default function TodoApp() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [userCleared, setUserCleared] = useState(false); // ✅ Added
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [todos, setTodos] = useLocalStorage('todos', []);
  const { data: fetchedTodos, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  const { values, handleChange, handleSubmit, resetForm } = useForm(
    { title: '' },
    (values) => {
      const errors = {};
      if (!values.title.trim()) {
        errors.title = 'Title is required';
      }
      return errors;
    }
  );

  useEffect(() => {
    if (fetchedTodos && fetchedTodos.length > 0 && todos.length === 0 && !userCleared) {
      setTodos(fetchedTodos.map(todo => ({ id: todo.id, title: todo.title, completed: todo.completed })));
    }
  }, [fetchedTodos, todos, userCleared, setTodos]); // ✅ updated dependencies

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: values.title.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    resetForm();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    setShowDeleteSuccess(true);
    setTimeout(() => setShowDeleteSuccess(false), 2000);
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteAll = () => {
    setTodos([]);
    setUserCleared(true); // ✅ mark that user cleared manually
    setShowDeleteSuccess(true);
    setTimeout(() => setShowDeleteSuccess(false), 2000);
  };

  if (!user) {
    return (
      <div className={`${styles.pageWrapper} ${styles[theme]}`}>
        <h2 className={styles.noUser}>Please log in to view your Todo App 🚀</h2>
      </div>
    );
  }

  return (
    <div className={`${styles.pageWrapper} ${styles[theme]}`}>
      <header className={styles.header}>
        <h1 className={`${styles.title} ${styles[theme]}`}>🚀 Todo App</h1>
        <div className={styles.themeSwitcher}>
          <label className={styles.switch}>
            <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
            <span className={styles.slider}></span>
          </label>
          <span className={styles.themeText}>
            {theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
          </span>
        </div>
      </header>

      {showSuccess && (
        <div className={styles.successPopup}>
          ✅ Task added successfully!
        </div>
      )}

      {showDeleteSuccess && (
        <div className={styles.deletePopup}>
          ❌ Task(s) deleted successfully!
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e, handleAddTodo)} className={styles.todoForm}>
        <input
          type="text"
          name="title"
          placeholder="Enter new task..."
          value={values.title}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.addButton}>Add Task</button>
      </form>

      {loading && <p>Loading todos...</p>}
      {error && <p>Error loading todos: {error.message}</p>}

      {todos.length > 0 && (
        <button onClick={handleDeleteAll} className={styles.deleteAllButton}>
          🧹 Clear All Tasks
        </button>
      )}

      <ul className={styles.todoList}>
        {todos.length === 0 ? (
          <p className={styles.noTasks}>🎉 No pending tasks remaining!</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
              />
              <span className={todo.completed ? styles.completed : ''}>
                {todo.title}
              </span>
              <button onClick={() => handleDeleteTodo(todo.id)} className={styles.deleteButton}>
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
