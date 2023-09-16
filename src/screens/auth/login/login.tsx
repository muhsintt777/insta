import { InputField } from "components/input-field/input-field";
import styles from "./loginStyle.module.scss";
import { TitleHead } from "./title-head";
import { ChangeEvent, useState } from "react";

interface emailInpType {
  value: string;
  isValid: boolean;
}
export const Login = () => {
  const [emailInp, setEmailInp] = useState<emailInpType>({
    value: "",
    isValid: false,
  });

  function handleEmailInpChange(e: ChangeEvent<HTMLInputElement>) {
    setEmailInp({ value: e.target.value, isValid: true });
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
          </div>
          <div>sso</div>
        </div>
      </div>
    </div>
  );
};
