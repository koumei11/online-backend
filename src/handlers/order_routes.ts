import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import verifyAuthToken from './auth/authentication';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.send(err);
  }
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const order = await store.show(id);
    res.json(order);
  } catch (err) {
    res.send(err);
  }
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: req.body.user_id,
    status: req.body.status
  };
  try {
    const count = await store.create(order);
    res.json(`Create ${count} record`);
  } catch (err) {
    res.send(err);
  }
};

const showProgressingUserOrder = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.user_id);
  try {
    const response = await store.showProgressingOrderByUser(userId);
    res.json(response);
  } catch (err) {
    res.send(err);
  }
};

const showCompletedUserOrder = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.user_id);
  try {
    const response = await store.showCompletedOrderByUser(userId);
    res.json(response);
  } catch (err) {
    res.send(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.get('/orders/:user_id/0', verifyAuthToken, showProgressingUserOrder);
  app.get('/orders/:user_id/1', verifyAuthToken, showCompletedUserOrder);
};

export default orderRoutes;
