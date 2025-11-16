import { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '@context/AuthContext';
import Sidebar from '@components/layout/Sidebar';
import { FaBars } from 'react-icons/fa';

// Admin Pages (will create later)
import Dashboard from '@pages/admin/Dashboard';
import GalleryManagement from '@pages/admin/GalleryManagement';
import EventManagement from '@pages/admin/EventManagement';
import AdmissionManagement from '@pages/admin/AdmissionManagement';
import ContactManagement from '@pages/admin/ContactManagement';
import UserManagement from '@pages/admin/UserManagement';
import Profile from '@pages/admin/Profile';

const AdminRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={logout}
      />

      <div
        style={{
          flex: 1,
          marginLeft: window.innerWidth > 992 ? '280px' : '0',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* Mobile Header */}
        <div
          style={{
            display: window.innerWidth <= 992 ? 'block' : 'none',
            padding: '1rem',
            background: 'var(--background)',
            borderBottom: '1px solid var(--border-color)',
            position: 'sticky',
            top: 0,
            zIndex: 999,
          }}
        >
          <button
            onClick={() => setIsSidebarOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            <FaBars />
          </button>
        </div>

        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gallery" element={<GalleryManagement />} />
            <Route path="/events" element={<EventManagement />} />
            <Route path="/admissions" element={<AdmissionManagement />} />
            <Route path="/contact" element={<ContactManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminRoutes;
