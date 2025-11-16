import { useEffect } from 'react';

const AdmissionManagement = () => {
  useEffect(() => {
    document.title = 'Admission Management - Admin Panel';
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admission Management</h1>
      <p>This page will be implemented in the next phase.</p>
    </div>
  );
};

export default AdmissionManagement;