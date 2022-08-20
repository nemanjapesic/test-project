import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

export default function ProtectedRoute({ children, redirectTo }) {
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
