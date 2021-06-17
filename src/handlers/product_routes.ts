import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from './auth/authentication';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.send(err);
  }
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const product = await store.show(id);
    res.json(product);
  } catch (err) {
    res.send(err);
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };
  try {
    const count = await store.create(product);
    res.json(`Create ${count} record`);
  } catch (err) {
    res.send(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
};

export default productRoutes;
