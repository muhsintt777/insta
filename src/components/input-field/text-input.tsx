import styles from './input-field.module.scss';
import { FC, memo, useMemo } from 'react';
import { addMultipleClassNames } from 'utils/common';

interface TextInputProps {
  value: string | null;
  name: string;
  error: string | null;
  placeholder?: string;
  label?: string;
  onchange: (value: string) => void;
}

const TextInputComp: FC<TextInputProps> = ({
  value,
  name,
  error,
  label,
  placeholder,
  onchange,
}) => {
  const errorClassNames = useMemo(() => {
    if (error) {
      return addMultipleClassNames(styles.error, styles.errorMessageShow);
    }
    return addMultipleClassNames(styles.error, styles.errorMessageHide);
  }, [error]);

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        className={styles.input}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(e) => onchange(e.target.value)}
      />
      <p className={errorClassNames}>{error}</p>
    </div>
  );
};

export const TextInput = memo(TextInputComp);
