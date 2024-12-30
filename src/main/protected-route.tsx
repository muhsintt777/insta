import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectUser } from 'features/user/userSlice';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const user = useAppSelector(selectUser);
  if (user.details) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth/login" replace={true} />;
  }
};
