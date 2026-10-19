import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectUser } from 'features/user/user-slice';

export const ProtectedRoute = () => {
  const user = useAppSelector(selectUser);
  if (user.details) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" replace={true} />;
  }
};
