import styles from './signup-page.module.scss';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from 'components/input-field/form-field';
import { signupFormSchema, SignupFormSchema } from './signup-schema';
import { AuthHeader } from '../components/auth-header';

export const SignupPage = () => {
  const {
    // handleSubmit,
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

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <AuthHeader title="SIGNUP" />
      </div>
      <div className={styles.main}>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <FormField
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
      </div>
    </div>
  );
};
