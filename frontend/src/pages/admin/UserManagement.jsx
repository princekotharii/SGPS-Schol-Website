import { useEffect } from 'react';

const UserManagement = () => {
  useEffect(() => {
    document.title = 'User Management - Admin Panel';
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Management</h1>
      <p>This page will be implemented in the next phase.</p>
    </div>
  );
};

export default UserManagement;