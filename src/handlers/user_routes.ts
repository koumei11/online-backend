import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from './auth/authentication';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.send(err);
  }
};

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const user = await store.show(id);
    res.json(user);
  } catch (err) {
    res.send(err);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password_digest: req.body.password,
    email: req.body.email
  };
  try {
    await store.create(user);
    const token = jwt.sign({ u: user }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.send(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await store.authenticate(email, password);
    const token = jwt.sign({ u: user }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.post('/users/authenticate', authenticate);
};

export default userRoutes;
