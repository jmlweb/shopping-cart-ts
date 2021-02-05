import Money from '../Money';

export interface ProductProps {
  code: string,
  name: string,
  price: number
}

/**
 * This could be heavily improved by converting to an Abstract class defining only the needed
 * properties (code and price).
 * That way it would be possible to extend the Product class creating specific types of Products
 * defining their own attributes, but... time is gold :S
 */

class Product {
  code: string;

  name: string;

  price: Money;

  static of(props: ProductProps): Product {
    return new Product(props);
  }

  constructor({ code, name, price }: ProductProps) {
    this.code = code;
    this.name = name;
    this.price = Money.of(price);
  }

  isSameThan(product: Product): boolean {
    return this.code === product.code;
  }

  render(): ProductProps {
    return {
      code: this.code,
      name: this.name,
      price: this.price.formattedValue,
    };
  }
}

export default Product;
