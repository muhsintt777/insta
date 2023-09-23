import { selectUser } from "features/user/userSlice";
import { useAppSelector } from "hooks/redux-hooks";
import { FC, createElement } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<any> = ({ children }) => {
  const user = useAppSelector(selectUser);
  console.log(user);

  if (user) {
    return children;
  } else {
    return <Navigate to="/auth/login" replace={true} />;
  }
};

export const protect = (componet: any) => {
  return <ProtectedRoute>{createElement(componet)}</ProtectedRoute>;
};
