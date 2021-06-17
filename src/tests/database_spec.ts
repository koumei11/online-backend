import { UserStore } from '../models/user';
import { ProductStore } from '../models/product';
import { OrderStore } from '../models/order';

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

describe('User Model Test', () => {
  it('Add a user1 to a database', async () => {
    const result = await userStore.create({
      firstname: 'Mike',
      lastname: 'Ben',
      password_digest: 'password123',
      email: 'aaaaa@gmail.com'
    });

    expect(result).toEqual(1);
  });

  it('Add a user2 to a database', async () => {
    const result = await userStore.create({
      firstname: 'Eric',
      lastname: 'John',
      password_digest: 'password456',
      email: 'bbbbb@gmail.com'
    });

    expect(result).toEqual(1);
  });

  it('Add a user3 to a database', async () => {
    const result = await userStore.create({
      firstname: 'Atu',
      lastname: 'Mary',
      password_digest: 'password789',
      email: 'ccccc@gmail.com'
    });

    expect(result).toEqual(1);
  });

  it('Get all users in a database', async () => {
    const result = await userStore.index();
    expect(result.length).toEqual(4);
  });

  it('Get an user from a database', async () => {
    const result = await userStore.show(2);
    expect(result.id).toEqual(2);
  });

  it('Authenticate an user', async () => {
    const result = await userStore.authenticate(
      'ccccc@gmail.com',
      'password789'
    );
    if (result) {
      expect(result.id).toEqual(4);
    } else {
      throw new Error('User Not Authenticated.');
    }
  });
});

describe('Product Model Test', () => {
  it('Add a product1 to a database', async () => {
    const result = await productStore.create({
      name: 'book1',
      price: 20,
      category: 'Mystery'
    });

    expect(result).toEqual({
      id: 2,
      name: 'book1',
      price: 20,
      category: 'Mystery'
    });
  });

  it('Add a product2 to a database', async () => {
    const result = await productStore.create({
      name: 'book2',
      price: 15,
      category: 'Adventure'
    });

    expect(result).toEqual({
      id: 3,
      name: 'book2',
      price: 15,
      category: 'Adventure'
    });
  });

  it('Add a product3 to a database', async () => {
    const result = await productStore.create({
      name: 'book3',
      price: 32,
      category: 'Love'
    });

    expect(result).toEqual({
      id: 4,
      name: 'book3',
      price: 32,
      category: 'Love'
    });
  });

  it('Get all products from a database', async () => {
    const results = await productStore.index();
    expect(results).toEqual([
      {
        id: 1,
        name: 'Harry Potter',
        price: 23,
        category: 'Fantasy'
      },
      {
        id: 2,
        name: 'book1',
        price: 20,
        category: 'Mystery'
      },
      {
        id: 3,
        name: 'book2',
        price: 15,
        category: 'Adventure'
      },
      {
        id: 4,
        name: 'book3',
        price: 32,
        category: 'Love'
      }
    ]);
  });

  it('Get a product from a database', async () => {
    const result = await productStore.show(2);
    expect(result).toEqual({
      id: 2,
      name: 'book1',
      price: 20,
      category: 'Mystery'
    });
  });
});

describe('Order Model Test', () => {
  it('Add an order1 to a database', async () => {
    const result = await orderStore.create({
      user_id: 1,
      status: 0
    });
    expect(result).toEqual({
      id: 2,
      user_id: 1,
      status: 0
    });
  });

  it('Add an order2 to a database', async () => {
    const result = await orderStore.create({
      user_id: 2,
      status: 0
    });
    expect(result).toEqual({
      id: 3,
      user_id: 2,
      status: 0
    });
  });

  it('Add an order3 to a database', async () => {
    const result = await orderStore.create({
      user_id: 2,
      status: 1
    });
    expect(result).toEqual({
      id: 4,
      user_id: 2,
      status: 1
    });
  });

  it('Add an order4 to a database', async () => {
    const result = await orderStore.create({
      user_id: 2,
      status: 0
    });
    expect(result).toEqual({
      id: 5,
      user_id: 2,
      status: 0
    });
  });

  it('Get all orders from a database', async () => {
    const results = await orderStore.index();
    expect(results).toEqual([
      {
        id: 1,
        user_id: 1,
        status: 0
      },
      {
        id: 2,
        user_id: 1,
        status: 0
      },
      {
        id: 3,
        user_id: 2,
        status: 0
      },
      {
        id: 4,
        user_id: 2,
        status: 1
      },
      {
        id: 5,
        user_id: 2,
        status: 0
      }
    ]);
  });

  it('Get an order from a database', async () => {
    const result = await orderStore.show(3);
    expect(result).toEqual({
      id: 3,
      user_id: 2,
      status: 0
    });
  });

  it('Get progressing orders by user from a database', async () => {
    const result = await orderStore.showProgressingOrderByUser(2);
    expect(result).toEqual([
      {
        id: 3,
        user_id: 2,
        status: 0
      },
      {
        id: 5,
        user_id: 2,
        status: 0
      }
    ]);
  });

  it('Get completed orders by user from a database', async () => {
    const result = await orderStore.showCompletedOrderByUser(2);
    expect(result).toEqual([
      {
        id: 4,
        user_id: 2,
        status: 1
      }
    ]);
  });
});
