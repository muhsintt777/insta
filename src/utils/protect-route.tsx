import { selectUser } from "features/userSlice";
import { useAppSelector } from "hooks/redux-hooks";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const user = useAppSelector(selectUser);

  if (user) {
    return children;
  } else {
    return <Navigate to={"/auth/login"} replace={true} />;
  }
};

export const protect = (componet: any) => {
  return <ProtectedRoute>{componet}</ProtectedRoute>;
};
