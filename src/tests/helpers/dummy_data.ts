import ServiceQueries from '../../services/products_orders_service';
import { ProductStore } from '../../models/product';

const serviceQueries = new ServiceQueries();
const productStore = new ProductStore();

export const createDummyProductOrders = async () => {
  await serviceQueries.create(1, 1, 1);
  await serviceQueries.create(1, 2, 3);
  await serviceQueries.create(1, 3, 3);
  await serviceQueries.create(1, 3, 4);
  await serviceQueries.create(1, 3, 2);
  await serviceQueries.create(1, 3, 5);
  await serviceQueries.create(1, 4, 1);
  await serviceQueries.create(1, 4, 2);
  await serviceQueries.create(1, 4, 3);
  await serviceQueries.create(1, 4, 4);
  await serviceQueries.create(2, 4, 5);
  await serviceQueries.create(1, 5, 1);
  await serviceQueries.create(1, 5, 1);
  await serviceQueries.create(1, 5, 1);
  await serviceQueries.create(1, 6, 1);
  await serviceQueries.create(1, 7, 1);
  await serviceQueries.create(1, 7, 2);
  await serviceQueries.create(1, 7, 3);
  await serviceQueries.create(1, 7, 4);
  await serviceQueries.create(4, 7, 4);
  await serviceQueries.create(3, 7, 5);
};

export const createDummyProductData = async () => {
  await productStore.create({
    name: 'bookData1',
    price: 12,
    category: 'Mystery'
  });
  await productStore.create({
    name: 'bookData2',
    price: 15,
    category: 'Love'
  });
  await productStore.create({
    name: 'bookData3',
    price: 11,
    category: 'Adventure'
  });
  await productStore.create({
    name: 'bookData4',
    price: 24,
    category: 'Action'
  });
};
