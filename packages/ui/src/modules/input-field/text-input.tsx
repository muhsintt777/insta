import styles from './input-field.module.scss';
import { CSSProperties, FC, memo } from 'react';

interface TextInputProps {
  value: string | null;
  name: string;
  error: string | null;
  placeholder?: string;
  label?: string;
  customStyle?: CSSProperties;
  onchange: (value: string) => void;
}

const TextInputComp: FC<TextInputProps> = ({
  value,
  name,
  error,
  label,
  placeholder,
  customStyle,
  onchange,
}) => {
  const errorClassNames = [
    styles.error,
    error ? styles.errorMessageShow : styles.errorMessageHide,
  ].join(' ');

  return (
    <div style={customStyle} className={styles.container}>
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
