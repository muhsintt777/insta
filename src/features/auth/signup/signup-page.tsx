import styles from './signup-page.module.scss';
import { AuthHeader } from '../components/auth-header';
import { FormField } from 'components/input-field/form-field';
import { useState } from 'react';

export const SignupPage = () => {
  const [fullName, setFullName] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <AuthHeader title="SIGNUP" />
      </div>
      <div className={styles.main}>
        <FormField
          name="fullName"
          label="Full name"
          error={null}
          placeholder="John Doe"
          controls={{ type: 'TEXT', onchange: setFullName, value: fullName }}
        />
      </div>
    </div>
  );
};
