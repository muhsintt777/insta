import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { PrimaryLayout } from "./layouts/primary-layout/primary-layout";
import { AuthLayout } from "layouts/auth-layout/auth-layout";
import { Home } from "./pages/home/home";
import { Login } from "pages/auth/login/login";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { getCurrentUser, selectUserApiStatus } from "features/userSlice";
import { protect } from "utils/protect-route";

export const App = () => {
  const dispath = useAppDispatch();
  const userApiStatus = useAppSelector(selectUserApiStatus);

  useEffect(() => {
    dispath(getCurrentUser());
  }, []);

  return (
    <>
      {userApiStatus === "loading" ? (
        <p>loadeinggg</p>
      ) : (
        <Routes>
          <Route path="/" element={<PrimaryLayout />}>
            <Route path="home" element={protect(Home)} />
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<>sefsefe</>} />
          </Route>
          <Route path="*" element={protect(Home)} />
        </Routes>
      )}
    </>
  );
};
