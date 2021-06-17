import express, { Request, Response } from 'express';
import ServiceQueries from '../services/products_orders_service';
import verifyAuthToken from './auth/authentication';

const queries = new ServiceQueries();

const showFive = async (_req: Request, res: Response) => {
  try {
    const products = await queries.showMostFivePopularProducts();
    res.json(products);
  } catch (err) {
    res.send(err);
  }
};

const showByCategory = async (req: Request, res: Response) => {
  const category = req.params.category;
  try {
    const products = await queries.showProductsByCategory(category);
    res.json(products);
  } catch (err) {
    res.send(err);
  }
};

const create = async (req: Request, res: Response) => {
  const quantity = req.body.quantity;
  const productId = req.body.product_id;
  const orderId = req.body.order_id;
  try {
    const count = await queries.create(quantity, productId, orderId);
    res.send(`Create ${count} record`);
  } catch (err) {
    res.send(err);
  }
};

const showQuantity = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.order_id);
  try {
    const productsData = await queries.showProductQuantity(orderId);
    res.send(productsData);
  } catch (err) {
    res.send(err);
  }
};

const showIds = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.order_id);
  try {
    const productsIds = await queries.showProductIds(orderId);
    res.send(productsIds);
  } catch (err) {
    res.send(err);
  }
};

const serviceRoutes = (app: express.Application) => {
  app.get('/products/most-popular', showFive);
  app.get('/products/:category', showByCategory);
  app.post('/order-complete', verifyAuthToken, create);
  app.get('/each-products/:order_id', verifyAuthToken, showQuantity);
  app.get('/order-products/:order_id', verifyAuthToken, showIds);
};

export default serviceRoutes;
