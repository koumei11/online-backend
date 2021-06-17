// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';
import { hashPassword, checkHashedPassword } from '../utils/password_hashing';

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password_digest: string;
  email: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users info ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get user info ${err}`);
    }
  }

  async create(u: User): Promise<number> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, password_digest, email) values ($1, $2, $3, $4) RETURNING *';

      const hash = hashPassword(u.password_digest);
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        hash,
        u.email
      ]);
      conn.release();
      return result.rowCount;
    } catch (err) {
      throw new Error(`Cannot create your account ${err}`);
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = 'SELECT * FROM users WHERE email = ($1)';
    const result = await conn.query(sql, [email]);

    if (result.rows.length) {
      const user = result.rows[0];
      if (checkHashedPassword(password, user.password_digest)) {
        return user;
      }
    }
    return null;
  }
}
