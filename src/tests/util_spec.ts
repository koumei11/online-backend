import { hashPassword, checkHashedPassword } from '../utils/password_hashing';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;

describe('Hash Function Test', () => {
  it('Check if a password is correctly hashed', () => {
    const password = 'password123';
    const result = hashPassword(password);

    expect(bcrypt.compareSync(password + pepper, result)).toBeTruthy();
  });

  it('Check if two passwords are the same', () => {
    const password = 'password123';
    const result = hashPassword(password);

    expect(checkHashedPassword(password, result)).toBeTruthy();
  });
});
