import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@context/AuthContext';
import Loader from '@components/shared/Loader';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader fullScreen text="Loading..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
