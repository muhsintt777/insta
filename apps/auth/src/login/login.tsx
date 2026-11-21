import { MFE_EVENT_NAMES } from '@insta/contracts';
import { PrimaryButton } from '@insta/ui/buttons';
import { FormField } from '@insta/ui/input-fields';
import { trimAllWhitespace } from '@insta/utils/string-utils';
import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AUTH_REGEX } from '../auth-validation';
import { AuthService } from '../auth-service';
import { AuthHeader } from '../components/auth-header';
import { getErrorMessage } from '../error-message';
import { EventBus } from '../event-bus';
import styles from './loginStyle.module.scss';

interface InputState {
  value: string;
  isValid: boolean;
  error: null | string;
}

export const LoginPage = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [emailInput, setEmailInput] = useState<InputState>({
    value: '',
    isValid: false,
    error: null,
  });
  const [passwordInput, setPasswordInput] = useState<InputState>({
    value: '',
    isValid: false,
    error: null,
  });

  const handleEmailChange = (value: string) => {
    const trimmedValue = trimAllWhitespace(value);
    const isValid = AUTH_REGEX.email.test(trimmedValue);
    setEmailInput({
      value,
      isValid,
      error: !isValid && trimmedValue ? 'Please enter valid email' : null,
    });
  };

  const handlePasswordChange = (value: string) => {
    const trimmedValue = trimAllWhitespace(value);
    const isValid = AUTH_REGEX.password.test(trimmedValue);
    setPasswordInput({
      value,
      isValid,
      error: !isValid && trimmedValue ? 'Please enter valid password' : null,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailInput.isValid || !passwordInput.isValid) return;

    try {
      setShowLoader(true);
      await AuthService.login({
        email: trimAllWhitespace(emailInput.value),
        password: trimAllWhitespace(passwordInput.value),
      });
      EventBus.emit(MFE_EVENT_NAMES.auth.sessionEstablished, undefined);
    } catch (error) {
      EventBus.emit(MFE_EVENT_NAMES.toast.error, {
        message: getErrorMessage(error),
      });
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <AuthHeader title="LOGIN" />
      </div>
      <div className={styles.main}>
        <div className={styles.loginBox}>
          <div>
            <form onSubmit={handleSubmit}>
              <FormField
                label="EMAIL"
                name="email"
                placeholder="john@email.com"
                error={emailInput.error}
                controls={{
                  onchange: handleEmailChange,
                  value: emailInput.value,
                  type: 'TEXT',
                }}
              />
              <FormField
                error={passwordInput.error}
                label="PASSWORD"
                name="password"
                placeholder="Password@123"
                controls={{
                  onchange: handlePasswordChange,
                  value: passwordInput.value,
                  type: 'PASSWORD',
                }}
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
            <p className={styles.createAccount}>
              Don't have an account? <Link to="/signup">Create account</Link>
            </p>
          </div>
          <div>SSO coming soon...</div>
        </div>
      </div>
    </div>
  );
};
