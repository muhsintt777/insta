import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { hideBackdrop, selectLoader, showBackdrop } from './loader-slice';

export const useLoader = () => {
  const dispatch = useAppDispatch();
  const loaderState = useAppSelector(selectLoader);

  const showGlobalBackdrop = useCallback(() => {
    dispatch(showBackdrop());
  }, [dispatch]);

  const hideGlobalBackdrop = useCallback(() => {
    dispatch(hideBackdrop());
  }, [dispatch]);

  return {
    isBackdropVisible: loaderState.showBackdrop,
    showGlobalBackdrop,
    hideGlobalBackdrop,
  };
};
