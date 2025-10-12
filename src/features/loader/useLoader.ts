import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { loaderActions, selectLoader } from './loader-slice';

export const useLoader = () => {
  const dispatch = useAppDispatch();
  const loaderState = useAppSelector(selectLoader);

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
