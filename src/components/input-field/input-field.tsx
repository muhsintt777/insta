import { FC, ChangeEvent } from "react";
import styles from "./input-fieldStyle.module.scss";

interface InputFieldProps {
  placeholder: string;
  label: string;
  type: "text" | "number" | "password";
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}
export const InputField: FC<InputFieldProps> = ({
  placeholder,
  label,
  type,
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p className={error ? styles.errorMessageShow : styles.errorMessageHide}>
        {error}
      </p>
    </div>
  );
};
