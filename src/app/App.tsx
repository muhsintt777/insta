import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux-hooks';
import appLogo from 'shared/assets/images/app-logo.svg';
import { DotLoader } from 'shared/components/loaders/dot-loader';
import { PrimaryLayout } from 'app/layouts/primary-layout/primary-layout';
import { AuthLayout } from 'app/layouts/auth-layout/auth-layout';
import { SecondaryLayout } from 'app/layouts/secondary-layout';
import { Notifications } from 'features/notifications';
import { ProfilePage } from 'features/user';
import { Friends } from 'features/friends';
import {
  restoreSession,
  LoginPage,
  SignupPage,
  selectAuthStatus,
} from 'features/auth';
import { ToastHost } from 'shared/feedback/toast';
import { Chat } from 'features/chat';
import { HomePage } from 'features/home';
import { BackdropLoader } from 'features/loader';
import { colors } from 'shared/styles/global-style';
import { ProtectedRoute } from './protected-route';

export const App = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const apiRef = useRef({ restoreSession: false });

  useEffect(() => {
    if (apiRef.current.restoreSession) return;
    dispatch(restoreSession());
    apiRef.current.restoreSession = true;
  }, [dispatch]);

  return (
    <>
      <BackdropLoader />
      <ToastHost />
      {authStatus === 'LOADING' ? (
        <div className="loader-wrap">
          <img src={appLogo} alt="logo" />
          <DotLoader color={colors.PRIMARY} />
          <p>
            Note:- Initial loading may take a few extra seconds(upto 50s) as it
            is hosted on a free server.
          </p>
        </div>
      ) : (
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<PrimaryLayout />}>
              <Route index element={<HomePage />} />
              <Route path="friends" element={<Friends />} />
              <Route path="chat" element={<Chat />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>

            <Route element={<SecondaryLayout />}>
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>

          <Route path="*" element={<p>page not found</p>} />
        </Routes>
      )}
    </>
  );
};
