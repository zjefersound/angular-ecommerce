import { CartItem } from './cart-item';
import { Product } from './product';

describe('CartItem', () => {
  const product = new Product();
  it('should create an instance', () => {
    expect(new CartItem(product)).toBeTruthy();
  });
});
