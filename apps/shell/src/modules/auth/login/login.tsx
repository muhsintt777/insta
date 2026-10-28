import styles from './loginStyle.module.scss';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REGEX } from '@insta/shared/constants';
import { PrimaryButton } from '@insta/shared/components/buttons/primary-button';
import { FormField } from '@insta/shared/components/input-field/form-field';
import { trimAllWhitespace } from '@insta/shared/lib/string-utils';
import { handleErrorWithToast, useToast } from '@insta/shared/feedback/toast';
import type { LoginParams } from '../auth-service';
import { AuthHeader } from '../components/auth-header';

interface LoginPageProps {
  onSignIn: (credentials: LoginParams) => Promise<void>;
}

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

export const LoginPage = ({ onSignIn }: LoginPageProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [showLoader, setShowLoader] = useState(false);
  const [emailInp, setEmailInp] = useState<EmailInpType>({
    value: '',
    isValid: false,
    error: null,
  });
  const [passwordInp, setPasswordInp] = useState<PasswordInpType>({
    value: '',
    isValid: false,
    error: null,
  });

  function handleEmailInpChange(e: string) {
    const value = e;
    const trimmedValue = trimAllWhitespace(value);
    const isValid = REGEX.email.test(trimmedValue);
    const error = !isValid && trimmedValue ? 'Please enter valid email' : null;

    setEmailInp({ value, isValid, error });
  }

  function handlePasswordInpChange(e: string) {
    const value = e;
    const trimmedValue = trimAllWhitespace(value);
    const isValid = REGEX.password.test(trimmedValue);
    const error =
      !isValid && trimmedValue ? 'Please enter valid password' : null;

    setPasswordInp({ value, isValid, error });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!emailInp.isValid || !passwordInp.isValid) return;

    try {
      setShowLoader(true);
      const trimmedEmail = trimAllWhitespace(emailInp.value);
      const trimmedPassword = trimAllWhitespace(passwordInp.value);
      await onSignIn({
        email: trimmedEmail,
        password: trimmedPassword,
      });
      navigate('/', { replace: true });
    } catch (err) {
      handleErrorWithToast(err, showToast);
    } finally {
      setShowLoader(false);
    }
  }

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
                error={emailInp.error}
                controls={{
                  onchange: handleEmailInpChange,
                  value: emailInp.value,
                  type: 'TEXT',
                }}
              />
              <FormField
                error={passwordInp.error}
                label="PASSWORD"
                name="password"
                placeholder="Password@123"
                controls={{
                  onchange: handlePasswordInpChange,
                  value: passwordInp.value,
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
              Don't have an account?{' '}
              <Link to={'/auth/signup'}>Create account</Link>
            </p>
          </div>
          <div>SSO coming soon...</div>
        </div>
      </div>
    </div>
  );
};
