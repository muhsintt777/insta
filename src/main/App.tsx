import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { PrimaryLayout } from 'layouts/primary-layout/primary-layout';
import { AuthLayout } from 'layouts/auth-layout/auth-layout';
import { fetchCurrentUser, selectUserApiStatus } from 'features/user/userSlice';
import { Login } from 'features/auth/login/login';
import { Chat } from 'features/chat/chat';
import { Notifications } from 'features/notifications/notifications';
import { Friends } from 'features/friends/friends';
import { Home } from 'features/home/home';
import { SignupPage } from 'features/auth/signup/signup-page';
import { Toast } from 'features/toast/toast';
import { protect } from './with-protected-route';

export const App = () => {
  const dispath = useAppDispatch();
  const userApiStatus = useAppSelector(selectUserApiStatus);
  const apiRef = useRef({ fetchCurrentUser: false });

  useEffect(() => {
    if (apiRef.current.fetchCurrentUser) return;
    dispath(fetchCurrentUser());
    apiRef.current.fetchCurrentUser = true;
  }, [dispath]);

  return (
    <>
      {userApiStatus === 'LOADING' ? (
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
            <Route path="signup" element={<SignupPage />} />
          </Route>
          <Route path="*" element={<p>page not found</p>} />
        </Routes>
      )}

      <Toast />
    </>
  );
};
