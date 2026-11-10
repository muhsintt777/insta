export const REGEX = {
  email: /^[\w.-]+[+\w.-]*@[\w.-]+\.\w+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
  name: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
};

export const COMMON_ERROR_MESSAGE =
  'Something went wrong, Please try again later.';
