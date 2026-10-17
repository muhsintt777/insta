import { createElement, FC } from 'react';
import { ProtectedRoute } from './protected-route';

export const protect = (componet: FC) => {
  return <ProtectedRoute>{createElement(componet)}</ProtectedRoute>;
};
