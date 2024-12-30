import styles from './signup-page.module.scss';
import { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { APP_ROUTES } from 'configs/app-routes';
import { FormField } from 'components/input-field/form-field';
import { PrimaryButton } from 'components/primary-button/primary-button';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { useAppDispatch } from 'hooks/redux-hooks';
import { useToast } from 'features/toast/useToast';
import { userService } from 'features/user/user-service';
import { updateUser } from 'features/user/user-slice';
import { signupFormSchema, SignupFormSchema } from './signup-schema';
import { authService } from '../auth-service';
import { AuthHeader } from '../components/auth-header';

export const SignupPage = () => {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
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
        await authService.createUser(data);
        await authService.login({ email: data.email, password: data.password });
        const user = await userService.fetchCurrentUser();
        dispath(updateUser(user));
        showToast('success', 'Account created successfully');
        navigate(APP_ROUTES.HOME);
      } catch (error) {
        handleErrorWithToast(error);
      } finally {
        setShowFormSubmitLoader(false);
      }
    },
    [showToast, navigate, dispath],
  );

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <AuthHeader title="SIGNUP" />
      </div>
      <div className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.rowFields}>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <FormField
                  containerStyle={{ width: '300px' }}
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
                  containerStyle={{ width: '300px' }}
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
                containerStyle={{ width: '616px' }}
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
                  containerStyle={{ width: '300px' }}
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
                  containerStyle={{ width: '300px' }}
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
