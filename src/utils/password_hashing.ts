import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD;

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password + pepper, parseInt(saltRounds));
};

export const checkHashedPassword = (
  password: string,
  hashPassword: string
): boolean => {
  return bcrypt.compareSync(password + pepper, hashPassword);
};
