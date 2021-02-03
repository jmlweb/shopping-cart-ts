import Money from '../Money';

export interface ProductProps {
  code: string,
  name: string,
  price: number
}

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

  render(): ProductProps {
    return {
      code: this.code,
      name: this.name,
      price: this.price.formattedValue,
    };
  }
}

export default Product;
