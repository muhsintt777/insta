import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux-hooks';
import appLogo from '@insta/ui/assets/images/app-logo.svg';
import { DotLoader } from '@insta/ui/components/loaders/dot-loader';
import { PrimaryLayout } from 'app/layouts/primary-layout/primary-layout';
import { AuthLayout } from 'app/layouts/auth-layout/auth-layout';
import { SecondaryLayout } from 'app/layouts/secondary-layout';
import { Notifications } from 'modules/notifications';
import { ProfilePage } from 'modules/user';
import { Friends } from 'modules/friends';
import { LoginPage, SignupPage, selectAuthStatus } from 'modules/auth';
import { ToastHost } from '@insta/ui/feedback/toast';
import { Chat } from 'modules/chat';
import { HomePage } from 'modules/home';
import { BackdropLoader } from '@insta/ui/feedback/loader';
import { colors } from '@insta/ui/styles/global-style';
import { ProtectedRoute } from './protected-route';
import { restoreSession, signIn } from './session-workflows';
import type { LoginParams } from 'modules/auth';

export const App = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const apiRef = useRef({ restoreSession: false });
  const handleSignIn = (credentials: LoginParams) =>
    signIn(dispatch, credentials);

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
            <Route
              path="login"
              element={<LoginPage onSignIn={handleSignIn} />}
            />
            <Route
              path="signup"
              element={<SignupPage onSignIn={handleSignIn} />}
            />
          </Route>

          <Route path="*" element={<p>page not found</p>} />
        </Routes>
      )}
    </>
  );
};
