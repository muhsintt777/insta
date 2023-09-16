import styles from "./loginStyle.module.scss";
import { ChangeEvent, useState } from "react";
import { InputField } from "components/input-field/input-field";
import { PrimaryButton } from "components/primary-button/primary-button";
import { TitleHead } from "./title-head";
import { REGEX } from "constants/validation";
import { trimAllWhitespace } from "utils/common";

interface EmailInpType {
  value: string;
  isValid: boolean;
  error: null | string;
}
interface PasswordInpType {
  value: string;
  isValid: boolean;
  error: null | string;
}

export const Login = () => {
  const [emailInp, setEmailInp] = useState<EmailInpType>({
    value: "",
    isValid: false,
    error: null,
  });
  const [passwordInp, setPasswordInp] = useState<PasswordInpType>({
    value: "",
    isValid: false,
    error: null,
  });

  function handleEmailInpChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const trimmedValue = trimAllWhitespace(value);
    const isValid = REGEX.email.test(trimmedValue);
    const error = !isValid && trimmedValue ? "Please enter valid email" : null;

    setEmailInp({ value, isValid, error });
  }

  function handlePasswordInpChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const trimmedValue = trimAllWhitespace(value);
    const isValid = REGEX.password.test(trimmedValue);
    const error =
      !isValid && trimmedValue ? "Please enter valid password" : null;

    setPasswordInp({ value, isValid, error });
  }
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <TitleHead title="LOGIN" />
      </div>
      <div className={styles.main}>
        <div className={styles.loginBox}>
          <div>
            <InputField
              value={emailInp.value}
              label="EMAIL"
              name="email"
              onChange={handleEmailInpChange}
              placeholder="john@email.com"
              type="text"
              error={emailInp.error}
            />
            <InputField
              error={passwordInp.error}
              label="PASSWORD"
              name="password"
              onChange={handlePasswordInpChange}
              placeholder="Password@123"
              type="password"
              value={passwordInp.value}
            />
            <div className={styles.buttonWrap}>
              <PrimaryButton disabled={false} text="LOGIN" />
            </div>
          </div>
          <div>SSO coming soon...</div>
        </div>
      </div>
    </div>
  );
};
