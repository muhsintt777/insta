import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useLoader } from './useLoader';

export const BackdropLoader = () => {
  const { isBackdropVisible } = useLoader();
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={isBackdropVisible}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
