import styles from './form-field.module.scss';
import { ChangeEvent, CSSProperties, FC, useCallback } from 'react';

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

interface ImageInputProps {
  type: 'IMAGE';
  value: File | null;
  onchange: (e: File | null) => void;
  sizeLimit?: number; // in bytes
}

interface FormFieldProps {
  placeholder: string;
  label: string;
  name: string;
  error: string | null;
  controls:
    | TextInputProps
    | PasswordInputProps
    | NumberInputProps
    | ImageInputProps;
  customStyles?: CSSProperties;
}

export const FormField: FC<FormFieldProps> = ({
  placeholder,
  label,
  name,
  error,
  controls,
  customStyles,
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
    <div style={customStyles} className={styles.container}>
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

      {controls.type === 'IMAGE' && (
        <>
          <label htmlFor={name}>{label}</label>
          <input
            name={name}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (
                file &&
                controls.sizeLimit &&
                file.size > controls.sizeLimit
              ) {
                // Optionally, you can set error state here or call onchange with null
                controls.onchange(null);
                return;
              }
              controls.onchange(file);
            }}
          />
          {controls.value && (
            <div className={styles.previewContainer}>
              <img
                src={URL.createObjectURL(controls.value)}
                alt="Preview"
                className={styles.imagePreview}
              />
            </div>
          )}
          <p
            className={
              error ? styles.errorMessageShow : styles.errorMessageHide
            }
          >
            {error}
          </p>
          {controls.sizeLimit && (
            <span className={styles.sizeLimitInfo}>
              Max size: {Math.round(controls.sizeLimit / 1024)} KB
            </span>
          )}
        </>
      )}
    </div>
  );
};
