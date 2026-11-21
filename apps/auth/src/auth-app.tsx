import { MFE_EVENT_NAMES } from '@insta/contracts';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { EventBus } from './event-bus';
import { LoginPage } from './login/login';
import { SignupPage } from './signup/signup-page';
import type { AuthMountOptions } from './mount-types';
import { NavigationBridge } from './navigation-bridge';

export const AuthApp = ({ initialSessionStatus }: AuthMountOptions) => {
  const [sessionStatus, setSessionStatus] = useState(initialSessionStatus);

  useEffect(
    () =>
      EventBus.on(MFE_EVENT_NAMES.auth.sessionChanged, ({ status }) => {
        setSessionStatus(status);
      }),
    [],
  );

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      aria-busy={sessionStatus === 'LOADING'}
    >
      <NavigationBridge />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
              state={{ source: 'mfe', intent: 'replace' }}
            />
          }
        />
      </Routes>
    </div>
  );
};
