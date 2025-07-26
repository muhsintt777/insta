import styles from './file-input.module.scss';
import { AddImageIcon } from 'assets/icons-components/add-image-icon';
import { CSSProperties, FC, useRef } from 'react';

interface FileInputProps {
  value: File | null;
  name: string;
  label: string;
  error: string | null;
  onChange: (file: File | null) => void;
  sizeLabelInMb: number;
  customStyles?: CSSProperties;
}

export const FileInput: FC<FileInputProps> = ({
  onChange,
  sizeLabelInMb,
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
      <div className={styles.previewContainer} onClick={handleBoxClick}>
        {value ? (
          <img
            src={URL.createObjectURL(value)}
            alt="Preview"
            className={styles.imagePreview}
          />
        ) : (
          <AddImageIcon size="80px" color="var(--clr-grey)" />
        )}
        <span className={styles.sizeLimit}>{sizeLabelInMb} MB max</span>
      </div>
      <p className={error ? styles.errorMessageShow : styles.errorMessageHide}>
        {error}
      </p>
    </div>
  );
};
