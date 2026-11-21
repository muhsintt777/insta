import { zodResolver } from '@hookform/resolvers/zod';
import { MFE_EVENT_NAMES } from '@insta/contracts';
import { PrimaryButton } from '@insta/ui/buttons';
import { FileInput, FormField } from '@insta/ui/input-fields';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthService } from '../auth-service';
import { AuthHeader } from '../components/auth-header';
import { getErrorMessage } from '../error-message';
import { EventBus } from '../event-bus';
import { signupFormSchema, type SignupFormSchema } from './signup-schema';
import styles from './signup-page.module.scss';

export const SignupPage = () => {
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

  const onSubmit = useCallback(async (data: SignupFormSchema) => {
    try {
      setShowFormSubmitLoader(true);
      const credentials = {
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password,
        profileImage: data.profileImage || undefined,
      };
      await AuthService.createUser(credentials);
      await AuthService.login(credentials);
      EventBus.emit(MFE_EVENT_NAMES.auth.sessionEstablished, undefined);
      EventBus.emit(MFE_EVENT_NAMES.toast.success, {
        message: 'Account created successfully',
      });
    } catch (error) {
      EventBus.emit(MFE_EVENT_NAMES.toast.error, {
        message: getErrorMessage(error),
      });
    } finally {
      setShowFormSubmitLoader(false);
    }
  }, []);

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
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
