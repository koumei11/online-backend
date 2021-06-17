import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
  }
};

export default verifyAuthToken;
