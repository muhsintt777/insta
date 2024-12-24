import styles from './signup-page.module.scss';
import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from 'components/input-field/form-field';
import { PrimaryButton } from 'components/primary-button/primary-button';
import { signupFormSchema, SignupFormSchema } from './signup-schema';
import { AuthHeader } from '../components/auth-header';

export const SignupPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      profileImage: null,
    },
  });

  const onSubmit = useCallback((data: SignupFormSchema) => {
    console.log(data);
  }, []);

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
              name="userName"
              control={control}
              render={({ field }) => (
                <FormField
                  containerStyle={{ width: '300px' }}
                  name="userName"
                  label="Username"
                  error={errors.userName?.message || null}
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
          <PrimaryButton type="submit" text="CREATE ACCOUNT" />
        </form>
      </div>
    </div>
  );
};
