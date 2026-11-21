import { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux-hooks';
import appLogo from '@insta/ui/images/app-logo.svg';
import { DotLoader } from '@insta/ui/loaders';
import { ToastHost } from 'app/components/toast-host';
import { PrimaryLayout } from 'app/layouts/primary-layout/primary-layout';
import { AuthLayout } from 'app/layouts/auth-layout/auth-layout';
import { SecondaryLayout } from 'app/layouts/secondary-layout';
import { selectAuthStatus } from 'features/auth';
import { Auth, Chat, Feed, Friends, Notifications, ProfilePage } from 'remotes';
import { colors } from '@insta/ui/styles';
import { MFE_EVENT_NAMES } from '@insta/contracts';
import { EventBus } from '../shared/event-bus';
import { emitErrorToast } from './emit-error-toast';
import { ProtectedRoute } from './protected-route';
import { establishSession, restoreSession } from './session-workflows';

export const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const apiRef = useRef({ restoreSession: false });

  useEffect(() => {
    if (apiRef.current.restoreSession) return;
    dispatch(restoreSession());
    apiRef.current.restoreSession = true;
  }, [dispatch]);

  useEffect(() => {
    return EventBus.on(MFE_EVENT_NAMES.auth.sessionEstablished, () => {
      void establishSession(dispatch)
        .then(() => navigate('/', { replace: true }))
        .catch(emitErrorToast);
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    EventBus.emit(MFE_EVENT_NAMES.auth.sessionChanged, {
      status: authStatus,
    });
  }, [authStatus]);

  return (
    <>
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
              <Route index element={<Feed />} />
              <Route path="friends" element={<Friends />} />
              <Route path="chat" element={<Chat />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>

            <Route element={<SecondaryLayout />}>
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="*" element={<Auth />} />
          </Route>

          <Route path="*" element={<p>page not found</p>} />
        </Routes>
      )}
    </>
  );
};
