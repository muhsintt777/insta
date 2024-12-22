import styles from './signup-page.module.scss';
import { AuthHeader } from '../components/auth-header';
import { InputField } from 'components/input-field/input-field';

export const SignupPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <AuthHeader title="SIGNUP" />
      </div>
      <div className={styles.main}>
        <InputField
          error={''}
          label="label"
          name="labell"
          onChange={() => {}}
          placeholder="sfsefs"
          type="text"
          value={'sss'}
        />
      </div>
    </div>
  );
};
