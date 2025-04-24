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
      setFormData(prev => ({ ...prev, id: '' }));
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
      <div className={styles.formGroup}>
        <label>User ID *</label>
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleChange}
          className={styles.formInputNumber}
          required
          min="1"
          step="1"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Role *</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={styles.formInput}
          required
        >
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className={styles.formGroupCheckbox}>
        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active User
        </label>
      </div>

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