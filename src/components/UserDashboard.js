import { useState } from 'react';
import UserList from './UserList';
import UserProfile from './UserProfile';
import UserForm from './UserForm';
import styles from '../styles/UserDashboard.module.css';

const initialUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'admin',
    isActive: true
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'user',
    isActive: true
  }
];

export default function UserDashboard() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddUser = (userData) => {
    // Check if ID is provided
    if (!userData.id) {
      alert('Please enter a User ID');
      return;
    }

    // Check for duplicate ID
    const idExists = users.some(user => user.id === Number(userData.id));
    if (idExists) {
      alert('This ID already exists! Please use a different ID.');
      return;
    }

    const newUser = {
      ...userData,
      id: Number(userData.id),
      avatar: userData.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };

    setUsers([...users, newUser]);
    setIsEditing(false);
  };

  const handleEditUser = (userData) => {
    // Check if ID was changed to an existing one
    if (userData.id !== selectedUser.id) {
      const idExists = users.some(user => 
        user.id === Number(userData.id) && user.id !== selectedUser.id
      );
      if (idExists) {
        alert('This ID already exists! Please use a different ID.');
        return;
      }
    }

    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...userData, id: Number(userData.id) } : user
    ));
    setIsEditing(false);
    setSelectedUser(null);
  };

  return (
    <div className={styles.dashboard}>
      {!selectedUser && !isEditing && (
        <UserList 
          users={users} 
          onViewProfile={setSelectedUser}
          onAddUser={() => setIsEditing(true)}
        />
      )}
      
      {selectedUser && !isEditing && (
        <UserProfile 
          user={selectedUser}
          onBack={() => setSelectedUser(null)}
          onEdit={() => setIsEditing(true)}
        />
      )}
      
      {isEditing && (
        <UserForm
          initialData={selectedUser || null}
          onSubmit={selectedUser ? handleEditUser : handleAddUser}
          onCancel={() => {
            setIsEditing(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}