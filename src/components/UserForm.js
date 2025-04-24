import { useState, useEffect } from 'react';
import styles from '../styles/UserForm.module.css';

export default function UserForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    role: 'user',
    isActive: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Generate a new ID if creating user
      const newId = Math.max(...users.map(u => u.id), 0) + 1;
      setFormData(prev => ({ ...prev, id: newId }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className={styles.form}>
      {/* Add ID Field */}
      <div className={styles.formGroup}>
        <label>User ID *</label>
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
          min="1"
          disabled={!!initialData} // Disable editing for existing users
        />
      </div>

      {/* Rest of your form fields */}
      <div className={styles.formGroup}>
        <label>Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Keep other fields (email, role, isActive) the same */}
      {/* ... */}

      <div className={styles.buttons}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          {initialData ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
}
