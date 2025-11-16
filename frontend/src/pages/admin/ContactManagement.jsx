import { useEffect } from 'react';

const ContactManagement = () => {
  useEffect(() => {
    document.title = 'Contact Management - Admin Panel';
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Contact Management</h1>
      <p>This page will be implemented in the next phase.</p>
    </div>
  );
};

export default ContactManagement;