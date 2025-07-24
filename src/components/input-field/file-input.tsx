import { AddImageIcon } from 'assets/icons-components/add-image-icon';
import styles from './file-input.module.scss';
import { CSSProperties, FC } from 'react';

const SIZE_LIMITs = {
  '5_MB': 5 * 1024 * 1024,
  '2_MB': 2 * 1024 * 1024,
};

interface FileInputProps {
  value: File | null;
  type: 'IMAGE';
  name: string;
  label: string;
  error: string | null;
  onChange: (file: File | null) => void;
  sizeLimit: '5_MB' | '2_MB';
  customStyles?: CSSProperties;
}

export const FileInput: FC<FileInputProps> = ({
  onChange,
  sizeLimit,
  type,
  value,
  customStyles,
  label,
  error,
  name,
}) => {
  return (
    <div style={customStyles} className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input name={name} type="file" accept="image/*" onChange={(e) => {}} />
      <p className={error ? styles.errorMessageShow : styles.errorMessageHide}>
        {error}
      </p>
      {value ? (
        <div className={styles.previewContainer}>
          <img
            src={URL.createObjectURL(value)}
            alt="Preview"
            className={styles.imagePreview}
          />
        </div>
      ) : (
        <AddImageIcon />
      )}
    </div>
  );
};
