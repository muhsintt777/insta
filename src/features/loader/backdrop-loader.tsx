import Backdrop from '@mui/material/Backdrop';
import { useLoader } from './useLoader';
import { CircleLoader } from 'shared/components/loaders/circle-loader';

export const BackdropLoader = () => {
  const { isBackdropVisible } = useLoader();
  return (
    <Backdrop
      sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
      open={isBackdropVisible}
    >
      <CircleLoader size="large" />
    </Backdrop>
  );
};
