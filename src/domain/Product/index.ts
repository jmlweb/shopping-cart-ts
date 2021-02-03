import Quantity from '../Quantity';

interface Props {
  code: string,
  name: string,
  price: number
}

class Product {
  code: string;

  name: string;

  price: Quantity;

  static of(props: Props): Product {
    return new Product(props);
  }

  constructor({ code, name, price }: Props) {
    this.code = code;
    this.name = name;
    this.price = Quantity.of(price);
  }
}

export default Product;
