// @ts-ignore
import Client from '../database';
import { Product } from '../models/product';

export default class ServiceQueries {
  async showMostFivePopularProducts(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT p.id, name, price, category, COUNT(*) FROM products p INNER JOIN products_orders po ON p.id = po.product_id GROUP BY p.id ORDER BY count DESC LIMIT 5';
      const result = await conn.query(sql);
      result.rows = result.rows.map((product: Product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category
        };
      });
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }

  async showProductsByCategory(category: string): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE category = ($1)';
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }

  async create(
    quantity: number,
    product_id: number,
    order_id: number
  ): Promise<number> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO products_orders (quantity, product_id, order_id) VALUES ($1, $2, $3)';
      const result = await conn.query(sql, [quantity, product_id, order_id]);
      conn.release();
      return result.rowCount;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }

  async showProductQuantity(
    order_id: number
  ): Promise<{ product_id: number; quantity: number }[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT product_id, quantity FROM products_orders WHERE order_id = ($1)';
      const result = await conn.query(sql, [order_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }

  async showProductIds(order_id: number): Promise<number[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT product_id FROM products_orders WHERE order_id = ($1)';
      const result = await conn.query(sql, [order_id]);
      result.rows = result.rows.map(
        (data: { product_id: number }) => data.product_id
      );
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }
}
