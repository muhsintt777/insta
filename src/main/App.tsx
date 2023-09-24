import "./App.css";
import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { getCurrentUser, selectUserApiStatus } from "features/user/userSlice";
import { protect } from "utils/protect-route";
import { PrimaryLayout } from "layouts/primary-layout/primary-layout";
import { AuthLayout } from "layouts/auth-layout/auth-layout";
import { Home } from "pages/home/home";
import { Login } from "pages/auth/login/login";
import { Chat } from "pages/chat/chat";
import { Notifications } from "pages/notifications/notifications";
import { Friends } from "pages/friends/friends";

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
            <Route path="friends" element={protect(Friends)} />
            <Route path="chat" element={protect(Chat)} />
            <Route path="notifications" element={protect(Notifications)} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<>Signup</>} />
          </Route>
          <Route path="*" element={<p>page not found</p>} />
        </Routes>
      )}
    </>
  );
};
