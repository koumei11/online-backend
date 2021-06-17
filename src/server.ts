import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/user_routes';
import productRoutes from './handlers/product_routes';
import orderRoutes from './handlers/order_routes';
import serviceRoutes from './handlers/service_routes';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
});

serviceRoutes(app);
userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
