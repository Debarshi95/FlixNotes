import { useAuth } from 'providers';
import { Navigate, useLocation } from 'react-router';

const withAuthRoute = (Component) => {
  return (props) => {
    const { user } = useAuth();
    const { state } = useLocation();

    const pathname = state?.from?.pathname || '/dashboard';

    if (user) {
      return <Navigate to={pathname} />;
    }
    return <Component {...props} />;
  };
};

export default withAuthRoute;
