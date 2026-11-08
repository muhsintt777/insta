import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { LoaderState } from './loader-types';
import { loaderActions } from './loader-slice';

export const useLoader = () => {
  const dispatch = useDispatch();
  const loaderState = useSelector(
    (state: { loader: LoaderState }) => state.loader,
  );

  const showGlobalBackdrop = useCallback(() => {
    dispatch(loaderActions.showBackdrop());
  }, [dispatch]);

  const hideGlobalBackdrop = useCallback(() => {
    dispatch(loaderActions.hideBackdrop());
  }, [dispatch]);

  return {
    isBackdropVisible: loaderState.showBackdrop,
    showGlobalBackdrop,
    hideGlobalBackdrop,
  };
};
