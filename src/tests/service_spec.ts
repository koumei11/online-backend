import ServiceQueries from '../services/products_orders_service';
import {
  createDummyProductData,
  createDummyProductOrders
} from './helpers/dummy_data';

const serviceQueries = new ServiceQueries();

describe('Service Test', () => {
  it('Add product and order to a database', async () => {
    const result = await serviceQueries.create(1, 2, 1);
    expect(result).toEqual(1);
  });

  it('Get five most popular products', async () => {
    await createDummyProductData();
    await createDummyProductOrders();
    const result = await serviceQueries.showMostFivePopularProducts();
    expect(result).toEqual([
      { id: 7, name: 'bookData3', price: 11, category: 'Adventure' },
      { id: 4, name: 'book3', price: 32, category: 'Love' },
      { id: 3, name: 'book2', price: 15, category: 'Adventure' },
      { id: 2, name: 'book1', price: 20, category: 'Mystery' },
      { id: 5, name: 'bookData1', price: 12, category: 'Mystery' }
    ]);
  });

  it('Get products by category', async () => {
    const result = await serviceQueries.showProductsByCategory('Mystery');
    expect(result).toEqual([
      { id: 2, name: 'book1', price: 20, category: 'Mystery' },
      { id: 5, name: 'bookData1', price: 12, category: 'Mystery' }
    ]);
  });

  it('Get product quantity in the order', async () => {
    const result = await serviceQueries.showProductQuantity(5);
    expect(result).toEqual([
      { product_id: 3, quantity: 1 },
      { product_id: 4, quantity: 2 },
      { product_id: 7, quantity: 3 }
    ]);
  });

  it('Get product ids in the order', async () => {
    const result = await serviceQueries.showProductIds(5);
    expect(result).toEqual([3, 4, 7]);
  });
});
