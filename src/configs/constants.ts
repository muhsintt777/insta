export const REGEX = {
  email: /^[\w.-]+[+\w.-]*@[\w.-]+\.\w+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
  name: /^[A-Za-z]+$/,
};

export const FILE_SIZE = { postImage: 5 * 1024 * 1024 };
