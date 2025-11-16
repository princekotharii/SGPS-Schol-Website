import { useEffect } from 'react';

const EventManagement = () => {
  useEffect(() => {
    document.title = 'Event Management - Admin Panel';
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Event Management</h1>
      <p>This page will be implemented in the next phase.</p>
    </div>
  );
};

export default EventManagement;