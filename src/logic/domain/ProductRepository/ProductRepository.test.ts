import ProductRepository from '.';
import fakeAdapter, { INITIAL_VALUE } from './fakeAdapter';

describe('ProductRepository', () => {
  const productRepository = new ProductRepository(fakeAdapter);
  test('must be able to list the products', async () => {
    const result = await productRepository.list();
    expect(result.length).toBe(3);
  });
  test('must be able to render the products', async () => {
    const result = await productRepository.render();
    expect(result).toEqual(INITIAL_VALUE);
  });
  test('must be able to get a product given its code', async () => {
    const result = await productRepository.get('MUG');
    expect(result.price.formattedValue).toEqual(7.5);
  });
  test('must throw an error when trying to fetch a non existent product', async () => {
    let hasThrow = false;
    try {
      await productRepository.get('FAKE');
    } catch (e) {
      hasThrow = true;
    }
    expect(hasThrow).toBe(true);
  });
});
