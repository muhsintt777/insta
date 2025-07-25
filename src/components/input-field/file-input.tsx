import styles from './file-input.module.scss';
import { AddImageIcon } from 'assets/icons-components/add-image-icon';
import { CSSProperties, FC, useRef } from 'react';

const SIZE_LIMITs = {
  '5_MB': 5 * 1024 * 1024,
  '2_MB': 2 * 1024 * 1024,
};

interface FileInputProps {
  value: File | null;
  // type: 'IMAGE';
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
  value,
  customStyles,
  label,
  error,
  name,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > SIZE_LIMITs[sizeLimit]) {
      onChange(null);
      return;
    }
    onChange(file);
  };

  return (
    <div style={customStyles} className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        ref={inputRef}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div
        className={styles.previewContainer + ' ' + styles.clickableBox}
        onClick={handleBoxClick}
      >
        {value ? (
          <img
            src={URL.createObjectURL(value)}
            alt="Preview"
            className={styles.imagePreview}
          />
        ) : (
          <AddImageIcon size="80px" color="var(--clr-grey)" />
        )}
      </div>
      <p className={error ? styles.errorMessageShow : styles.errorMessageHide}>
        {error}
      </p>
    </div>
  );
};
