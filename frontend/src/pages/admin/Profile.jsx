import { useEffect } from 'react';

const Profile = () => {
  useEffect(() => {
    document.title = 'Profile - Admin Panel';
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Profile</h1>
      <p>This page will be implemented in the next phase.</p>
    </div>
  );
};

export default Profile;