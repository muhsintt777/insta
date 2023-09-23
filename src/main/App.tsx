import "./App.css";
import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { PrimaryLayout } from "layouts/primary-layout/primary-layout";
import { AuthLayout } from "layouts/auth-layout/auth-layout";
import { Home } from "pages/home/home";
import { Login } from "pages/auth/login/login";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { getCurrentUser, selectUserApiStatus } from "features/user/userSlice";
import { protect } from "utils/protect-route";

export const App = () => {
  const dispath = useAppDispatch();
  const userApiStatus = useAppSelector(selectUserApiStatus);
  const apiRef = useRef({ getCurrentUser: false });

  useEffect(() => {
    if (apiRef.current.getCurrentUser) return;
    dispath(getCurrentUser());
    apiRef.current.getCurrentUser = true;
  }, []);

  return (
    <>
      {userApiStatus === "loading" ? (
        <p>loadeinggg</p>
      ) : (
        <Routes>
          <Route path="/" element={<PrimaryLayout />}>
            <Route index element={protect(Home)} />
            <Route path="one" element={<p>sfsefsefse</p>} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<>sefsefe</>} />
          </Route>
          <Route path="*" element={<p>page not found</p>} />
        </Routes>
      )}
    </>
  );
};
