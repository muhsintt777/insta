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
  error = 'sfsefef';
  return (
    <div style={customStyles} className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        ref={inputRef}
        name={name}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div
        className={styles.previewContainer + ' ' + styles.clickableBox}
        onClick={handleBoxClick}
        style={{
          height: '155px',
          width: '100%',
          background: 'var(--clr-bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderRadius: 5,
        }}
      >
        {value ? (
          <img
            src={URL.createObjectURL(value)}
            alt="Preview"
            className={styles.imagePreview}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: 8,
            }}
          />
        ) : (
          <span
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AddImageIcon size="80px" color="var(--clr-grey)" />
          </span>
        )}
      </div>
      <p className={error ? styles.errorMessageShow : styles.errorMessageHide}>
        {error}
      </p>
    </div>
  );
};
