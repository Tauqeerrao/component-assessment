import { useState } from 'react';
import UserList from './UserList';
import UserProfile from './UserProfile';
import UserForm from './UserForm';

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

  return (
    <div className="dashboard">
      {!selectedUser && !isEditing && (
        <UserList 
          users={users} 
          onViewProfile={user => setSelectedUser(user)}
          onAddUser={() => setIsEditing(true)}
        />
      )}
      
      {selectedUser && (
        <UserProfile 
          user={selectedUser}
          onBack={() => setSelectedUser(null)}
          onEdit={() => setIsEditing(true)}
        />
      )}
      
      {isEditing && (
        <UserForm
          onSubmit={userData => {
            // Add your form submission logic here
            console.log(userData);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
