import { selectUser } from "features/user/userSlice";
import { useAppSelector } from "hooks/redux-hooks";
import { FC, createElement } from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
const ProtectedRoute: FC<any> = ({ children }) => {
  const user = useAppSelector(selectUser);

  if (user) {
    return children;
  } else {
    return <Navigate to="/auth/login" replace={true} />;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const protect = (componet: any) => {
  return <ProtectedRoute>{createElement(componet)}</ProtectedRoute>;
};
