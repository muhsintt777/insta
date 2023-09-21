import styles from "./loginStyle.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { InputField } from "components/input-field/input-field";
import { PrimaryButton } from "components/primary-button/primary-button";
import { TitleHead } from "./title-head";
import { trimAllWhitespace } from "utils/common";
import { REGEX } from "utils/constants";
import { ApiService } from "utils/api-service";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState(false);
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!emailInp.isValid || !passwordInp.isValid) return;
    setShowLoader(true);

    try {
      const trimmedEmail = trimAllWhitespace(emailInp.value);
      const trimmedPassword = trimAllWhitespace(passwordInp.value);
      console.log(trimmedEmail, trimmedPassword);

      await ApiService.login(trimmedEmail, trimmedPassword);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }

    setShowLoader(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <TitleHead title="LOGIN" />
      </div>
      <div className={styles.main}>
        <div className={styles.loginBox}>
          <div>
            <form onSubmit={handleSubmit}>
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
                <PrimaryButton
                  showLoader={showLoader}
                  type="submit"
                  disabled={false}
                  text="LOGIN"
                />
              </div>
            </form>
          </div>
          <div>SSO coming soon...</div>
        </div>
      </div>
    </div>
  );
};
