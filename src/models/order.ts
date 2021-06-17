// @ts-ignore
import Client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get an order ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) values ($1, $2) RETURNING *';

      const result = await conn.query(sql, [o.user_id, o.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create an order ${err}`);
    }
  }

  async showProgressingOrderByUser(userId: number): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = 0';

      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get an user's order ${err}`);
    }
  }

  async showCompletedOrderByUser(userId: number): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = 1';

      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get an user's order ${err}`);
    }
  }
}
