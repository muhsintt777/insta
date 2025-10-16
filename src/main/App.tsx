import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import appLogo from 'assets/images/app-logo.svg';
import { DotLoader } from 'components/loaders/dot-loader';
import { PrimaryLayout } from 'layouts/primary-layout/primary-layout';
import { AuthLayout } from 'layouts/auth-layout/auth-layout';
import { SecondaryLayout } from 'layouts/secondary-layout';
import {
  initialUserFetch,
  selectUserApiStatus,
} from 'features/user/user-slice';
import { Notifications } from 'features/notifications/notifications';
import { ProfilePage } from 'features/user/profile-page';
import { SignupPage } from 'features/auth/signup/signup-page';
import { Friends } from 'features/friends/friends';
import { Login } from 'features/auth/login/login';
import { Toast } from 'features/toast/toast';
import { Chat } from 'features/chat/chat';
import { HomePage } from 'features/home/home-page';
import { protect } from './with-protected-route';
import { BackdropLoader } from 'features/loader';
import { colors } from './global-style';

export const App = () => {
  const dispath = useAppDispatch();
  const userApiStatus = useAppSelector(selectUserApiStatus);
  const apiRef = useRef({ initialUserFetch: false });

  useEffect(() => {
    if (apiRef.current.initialUserFetch) return;
    dispath(initialUserFetch());
    apiRef.current.initialUserFetch = true;
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
          <Route path="/" element={<PrimaryLayout />}>
            <Route index element={protect(HomePage)} />
            <Route path="friends" element={protect(Friends)} />
            <Route path="chat" element={protect(Chat)} />
            <Route path="notifications" element={protect(Notifications)} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>

          <Route element={<SecondaryLayout />}>
            <Route path="profile" element={protect(ProfilePage)} />
          </Route>

          <Route path="*" element={<p>page not found</p>} />
        </Routes>
      )}

      <Toast />
    </>
  );
};
