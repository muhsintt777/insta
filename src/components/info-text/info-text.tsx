import { addMultipleClassNames } from 'utils/common';
import styles from './info-text.module.css';
import { FC, memo, useMemo } from 'react';

interface InfoTextProps {
  text: string;
  type?: 'INFO' | 'ERROR';
}

const InfoTextComp: FC<InfoTextProps> = ({ text, type = 'INFO' }) => {
  const className = useMemo(() => {
    return type === 'ERROR'
      ? addMultipleClassNames(styles.text, styles.error)
      : addMultipleClassNames(styles.text, styles.info);
  }, [type]);

  return <p className={className}>{text}</p>;
};

export const InfoText = memo(InfoTextComp);
