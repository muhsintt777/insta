import { InputField } from "components/input-field/input-field";
import styles from "./loginStyle.module.scss";
import { TitleHead } from "./title-head";
import { ChangeEvent, useState } from "react";
import { PrimaryButton } from "components/primary-button/primary-button";

interface EmailInpType {
  value: string;
  isValid: boolean;
}
interface PasswordInpType {
  value: string;
  isValid: boolean;
}

export const Login = () => {
  const [emailInp, setEmailInp] = useState<EmailInpType>({
    value: "",
    isValid: false,
  });
  const [passwordInp, setPasswordInp] = useState<PasswordInpType>({
    value: "",
    isValid: false,
  });

  function handleEmailInpChange(e: ChangeEvent<HTMLInputElement>) {
    setEmailInp({ value: e.target.value, isValid: true });
  }
  function handlePasswordInpChange(e: ChangeEvent<HTMLInputElement>) {
    setPasswordInp({ value: e.target.value, isValid: true });
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
              error={"testingg..."}
            />
            <InputField
              error={null}
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
