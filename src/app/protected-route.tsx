import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectAuthStatus } from 'features/auth';

export const ProtectedRoute = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  if (authStatus === 'AUTHENTICATED') {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" replace={true} />;
  }
};
