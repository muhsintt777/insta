import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'app/hooks/redux-hooks';
import { selectAuthStatus } from 'modules/auth';

export const ProtectedRoute = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  if (authStatus === 'AUTHENTICATED') {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" replace={true} />;
  }
};
