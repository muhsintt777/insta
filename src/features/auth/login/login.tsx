import styles from './loginStyle.module.scss';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REGEX } from 'configs/constants';
import { useAppDispatch } from 'hooks/redux-hooks';
import { PrimaryButton } from 'components/primary-button/primary-button';
import { FormField } from 'components/input-field/form-field';
import { trimAllWhitespace } from 'utils/common';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { userService } from 'features/user/user-service';
import { updateUser } from 'features/user/user-slice';
import { authService } from '../auth-service';
import { AuthHeader } from '../components/auth-header';

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
  const dispath = useAppDispatch();

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
      await authService.login({
        email: trimmedEmail,
        password: trimmedPassword,
      });
      const userDetails = await userService.fetchCurrentUser();
      dispath(updateUser(userDetails));
      navigate('/', { replace: true });
    } catch (err) {
      handleErrorWithToast(err);
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
