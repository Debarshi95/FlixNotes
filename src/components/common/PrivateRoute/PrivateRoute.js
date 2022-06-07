import BounceLoader from 'react-spinners/BounceLoader';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { colors } from 'styles/defaultStyles';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex h-screen w-full content-center items-center">
        <BounceLoader color={colors.colorPrimary} loading={loading} size={50} />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
