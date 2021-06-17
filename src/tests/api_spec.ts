import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
let token: string;

describe('User Endpoints Test', () => {
  it('Check /users endpoint (POST)', async () => {
    const response = await request
                            .post('/users')
                            .send({
                              fistname: 'John',
                              lastname: 'Mike',
                              password: 'pass123',
                              email: 'test@gmail.com'
                            });
    token = response.body;
    expect(response.status).toBe(200);
  });

  it('Check /users endpoint (GET)', async () => {
    const response = await request
                            .get('/users')
                            .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
  });

  it('Check /users/:id endpoint', async () => {
    const response = await request
                            .get('/users/1')
                            .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
  });

  it('Check /users/authenticate endpoint', async () => {
    const response = await request
                            .post('/users/authenticate')
                            .send({
                              password: 'pass123',
                              email: 'test@gmail.com'
                            });
    expect(response.status).toBe(200);
  });
});

describe('Product Endpoints Test', () => {
  it('Check /products endpoint (POST)', async () => {
    const response = await request
                            .post('/products')
                            .send({
                              name: 'Harry Potter',
                              price: 23,
                              category: 'Fantasy'
                            })
                            .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
  });

  it('Check /products endpoint (GET)', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('Check /products/:id endpoint', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });
});

describe('Order Endpoints Test', () => {
  it('Check /orders endpoint (POST)', async () => {
    const response = await request
                            .post('/orders')
                            .send({
                              user_id: 1,
                              status: 0
                            })
                            .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
  });

  it('Check /orders endpoint (GET)', async () => {
    const response = await request
                            .get('/orders')
                            .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
  });

  it('Check /orders/:id endpoint', async () => {
    const response = await request
                            .get('/orders/1')
                            .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
  });

  it('Check /orders/:user_id/0 endpoint', async () => {
    const response = await request
                            .get('/orders/1/0')
                            .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
  });

  it('Check /orders/:user_id/1 endpoint', async () => {
    const response = await request
                            .get('/orders/1/1')
                            .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
  });
});

describe('Service Endpoints Test', () => {
  it('Check /products/most-popular endpoint', async () => {
    const response = await request.get('/products/most-popular');
    expect(response.status).toBe(200);
  });

  it('Check /products/:category endpoint', async () => {
    const response = await request.get('/products/Action');
    expect(response.status).toBe(200);
  });

  it('Check /order-complete endpoint', async () => {
    const response = await request
                            .post('/order-complete')
                            .send({
                              quantity: 2,
                              product_id: 2,
                              order_id: 1
                            })
                            .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
  });

  it('Check /each-products/:order_id endpoint', async () => {
    const response = await request
                            .get('/each-products/2')
                            .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
  });

  it('Check /order-products/:order_id endpoint', async () => {
    const response = await request
                            .get('/order-products/2')
                            .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
  });
});
