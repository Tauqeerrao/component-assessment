import { useState } from 'react';
import UserCard from './UserCard';
import styles from '../styles/UserList.module.css';

export default function UserList({ users, onViewProfile, onAddUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && user.isActive) || 
                         (filter === 'inactive' && !user.isActive);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />
        <button onClick={onAddUser} className={styles.addButton}>
          Add User
        </button>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className={styles.filter}
        >
          <option value="all">All Users</option>
          <option value="active">Active Users</option>
          <option value="inactive">Inactive Users</option>
        </select>
      </div>

      <div className={styles.grid}>
        {filteredUsers.map(user => (
          <UserCard 
            key={user.id} 
            user={user} 
            onViewProfile={onViewProfile} 
          />
        ))}
      </div>
    </div>
  );
}
