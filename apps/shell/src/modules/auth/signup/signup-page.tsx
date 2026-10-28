import styles from './signup-page.module.scss';
import { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { APP_ROUTES } from '@insta/shared/routes';
import { FormField } from '@insta/shared/components/input-field/form-field';
import { PrimaryButton } from '@insta/shared/components/buttons/primary-button';
import { handleErrorWithToast } from '@insta/shared/feedback/toast';
import { useToast } from '@insta/shared/feedback/toast';
import { signupFormSchema, SignupFormSchema } from './signup-schema';
import { AuthService } from '../auth-service';
import type { LoginParams } from '../auth-service';
import { AuthHeader } from '../components/auth-header';
import { FileInput } from '@insta/shared/components/input-field/file-input';

interface SignupPageProps {
  onSignIn: (credentials: LoginParams) => Promise<void>;
}

export const SignupPage = ({ onSignIn }: SignupPageProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showFormSubmitLoader, setShowFormSubmitLoader] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      profileImage: null,
    },
  });

  const onSubmit = useCallback(
    async (data: SignupFormSchema) => {
      try {
        setShowFormSubmitLoader(true);
        await AuthService.createUser({
          fullName: data.fullName,
          username: data.username,
          email: data.email,
          password: data.password,
          profileImage: data.profileImage || undefined,
        });
        await onSignIn({
          email: data.email,
          password: data.password,
        });
        showToast('success', 'Account created successfully');
        navigate(APP_ROUTES.HOME);
      } catch (error) {
        handleErrorWithToast(error, showToast);
      } finally {
        setShowFormSubmitLoader(false);
      }
    },
    [showToast, navigate, onSignIn],
  );

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <AuthHeader title="SIGNUP" />
      </div>
      <div className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="profileImage"
            control={control}
            render={({ field }) => (
              <FileInput
                error={errors.profileImage?.message || null}
                label="Profile Image"
                name="profileImage"
                sizeLabelInMb={2}
                onChange={field.onChange}
                value={field.value}
                customStyles={{ marginBottom: '16px' }}
              />
            )}
          />
          <div className={styles.rowFields}>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <FormField
                  customStyles={{ width: '300px' }}
                  name="fullName"
                  label="Full name"
                  error={errors.fullName?.message || null}
                  placeholder="John Doe"
                  controls={{
                    type: 'TEXT',
                    onchange: field.onChange,
                    value: field.value,
                  }}
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <FormField
                  customStyles={{ width: '300px' }}
                  name="username"
                  label="Username"
                  error={errors.username?.message || null}
                  placeholder="john_doe_123"
                  controls={{
                    type: 'TEXT',
                    onchange: field.onChange,
                    value: field.value,
                  }}
                />
              )}
            />
          </div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormField
                customStyles={{ width: '616px' }}
                name="email"
                label="Email"
                error={errors.email?.message || null}
                placeholder="johndoe@gmail.com"
                controls={{
                  type: 'TEXT',
                  onchange: field.onChange,
                  value: field.value,
                }}
              />
            )}
          />

          <div className={styles.rowFields}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormField
                  customStyles={{ width: '300px' }}
                  name={field.name}
                  label="Password"
                  error={errors.password?.message || null}
                  placeholder="********"
                  controls={{
                    type: 'PASSWORD',
                    onchange: field.onChange,
                    value: field.value,
                  }}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <FormField
                  customStyles={{ width: '300px' }}
                  name={field.name}
                  label="Confirm Password"
                  error={errors.confirmPassword?.message || null}
                  placeholder="********"
                  controls={{
                    type: 'PASSWORD',
                    onchange: field.onChange,
                    value: field.value,
                  }}
                />
              )}
            />
          </div>
          <PrimaryButton
            type="submit"
            text="CREATE ACCOUNT"
            showLoader={showFormSubmitLoader}
          />
          <p className={styles.loginLink}>
            Already have an account? <Link to={APP_ROUTES.LOGIN}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
