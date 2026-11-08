import Backdrop from '@mui/material/Backdrop';
import { CircleLoader } from '../../components/loaders/circle-loader';
import { useLoader } from './use-loader';

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
