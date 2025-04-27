import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TodoApp from './TodoApp'; // ✅ Correct import
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
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'editor',
    isActive: true
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    role: 'user',
    isActive: false
  },
  {
    id: 5,
    name: 'Michael Wilson',
    email: 'michael@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'manager',
    isActive: true
  }
];

export default function UserDashboard() {
  const [showTodoApp, setShowTodoApp] = useState(false); // ✅ new state to control
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Authentication check
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('isAuthenticated')) {
      router.push('/login');
    }
  }, []);

  const handleAddUser = (userData) => {
    if (!userData.id) {
      alert('Please enter a User ID');
      return;
    }

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

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  // 🔥 New function to show TodoApp
  const handleTodoApp = () => {
    setShowTodoApp(true);
  };

  // 🔥 New function to go back to dashboard from TodoApp
  const handleBackToDashboard = () => {
    setShowTodoApp(false);
  };

  // ✅ If showTodoApp is true, show TodoApp
  if (showTodoApp) {
    return (
      <div className={styles.dashboard}>
        <button onClick={handleBackToDashboard} className={styles.todoButton}>
          ⬅️ Back to Dashboard
        </button>
        <TodoApp />
      </div>
    );
  }

  // ✅ Otherwise, show normal dashboard
  return (
    <div className={styles.dashboard}>
      <button 
        onClick={handleLogout}
        className={styles.logoutButton}
      >
        Logout
      </button>
      <button 
        onClick={handleTodoApp}
        className={styles.todoButton}
      >
        TodoApp
      </button>

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
