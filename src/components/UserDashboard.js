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
    const newUser = {
      ...userData,
      id: Math.max(...users.map(u => u.id), 0) + 1,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    setUsers([...users, newUser]);
    setIsEditing(false);
  };

  const handleEditUser = (userData) => {
    setUsers(users.map(user => 
      user.id === userData.id ? userData : user
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
      
      {selectedUser && (
        <UserProfile 
          user={selectedUser}
          onBack={() => setSelectedUser(null)}
          onEdit={() => {
            setIsEditing(true);
            setSelectedUser(selectedUser);
          }}
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
