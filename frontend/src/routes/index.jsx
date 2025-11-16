import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes';
import PrivateRoute from './PrivateRoute';
import Login from '@pages/auth/Login';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes (Protected) */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;