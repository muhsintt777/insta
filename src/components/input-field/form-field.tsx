import { ChangeEvent, FC, useCallback } from 'react';
import styles from './form-field.module.scss';

interface TextInputProps {
  type: 'TEXT';
  value: string;
  onchange: (e: string) => void;
}

interface PasswordInputProps {
  type: 'PASSWORD';
  value: string;
  onchange: (e: string) => void;
}

interface NumberInputProps {
  type: 'NUMBER';
  value: number;
  onchange: (e: number) => void;
}

interface FormFieldProps {
  placeholder: string;
  label: string;
  name: string;
  error: string | null;
  controls: TextInputProps | PasswordInputProps | NumberInputProps;
}

export const FormField: FC<FormFieldProps> = ({
  placeholder,
  label,
  name,
  error,
  controls,
}) => {
  const handleNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, onChange: (e: number) => void) => {
      const value = Number(e.target.value);
      if (isNaN(value)) return;
      onChange(value);
    },
    [],
  );

  return (
    <div className={styles.container}>
      {controls.type === 'TEXT' && (
        <>
          <label htmlFor={name}>{label}</label>
          <input
            name={name}
            type="text"
            placeholder={placeholder}
            value={controls.value}
            onChange={(e) => controls.onchange(e.target.value)}
          />
          <p
            className={
              error ? styles.errorMessageShow : styles.errorMessageHide
            }
          >
            {error}
          </p>
        </>
      )}

      {controls.type === 'PASSWORD' && (
        <>
          <label htmlFor={name}>{label}</label>
          <input
            name={name}
            type="password"
            placeholder={placeholder}
            value={controls.value}
            onChange={(e) => controls.onchange(e.target.value)}
          />
          <p
            className={
              error ? styles.errorMessageShow : styles.errorMessageHide
            }
          >
            {error}
          </p>
        </>
      )}

      {controls.type === 'NUMBER' && (
        <>
          <label htmlFor={name}>{label}</label>
          <input
            name={name}
            type="number"
            placeholder={placeholder}
            value={controls.value}
            onChange={(e) => handleNumberChange(e, controls.onchange)}
          />
          <p
            className={
              error ? styles.errorMessageShow : styles.errorMessageHide
            }
          >
            {error}
          </p>
        </>
      )}
    </div>
  );
};
