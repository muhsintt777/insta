import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import appLogo from 'shared/assets/images/app-logo.svg';
import { DotLoader } from 'shared/components/loaders/dot-loader';
import { PrimaryLayout } from 'app/layouts/primary-layout/primary-layout';
import { AuthLayout } from 'app/layouts/auth-layout/auth-layout';
import { SecondaryLayout } from 'app/layouts/secondary-layout';
import { selectUserStatus } from 'features/user/user-slice';
import { Notifications } from 'features/notifications/notifications';
import { ProfilePage } from 'features/user/profile-page';
import { Friends } from 'features/friends/friends';
import { restoreSession, LoginPage, SignupPage } from 'features/auth';
import { Toast } from 'features/toast/toast';
import { Chat } from 'features/chat/chat';
import { HomePage } from 'features/home/home-page';
import { BackdropLoader } from 'features/loader';
import { colors } from 'shared/styles/global-style';
import { ProtectedRoute } from './protected-route';

export const App = () => {
  const dispath = useAppDispatch();
  const userApiStatus = useAppSelector(selectUserStatus);
  const apiRef = useRef({ restoreSession: false });

  useEffect(() => {
    if (apiRef.current.restoreSession) return;
    dispath(restoreSession());
    apiRef.current.restoreSession = true;
  }, [dispath]);

  return (
    <>
      <BackdropLoader />
      <Toast />
      {userApiStatus === 'LOADING' ? (
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
