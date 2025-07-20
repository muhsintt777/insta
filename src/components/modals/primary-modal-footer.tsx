import { PrimaryButton } from 'components/primary-button/primary-button';
import { FC, PropsWithChildren } from 'react';

export const PrimaryModalFooter: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={styles.footer}>
      <PrimaryButton text="sefe" />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    borderTop: '1px solid var(--clr-light-grey)',
  },
};
