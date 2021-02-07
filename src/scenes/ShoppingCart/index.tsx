import { FC } from 'react';
import useShoppingCart from '../../logic/application/ShoppingCart/useShoppingCart';

const ShoppingCart: FC = () => {
  const shoppingCart = useShoppingCart();
  return (
    <main className="shopping-cart">
      <section className="products">
        <h1 className="main">Shopping cart</h1>
        <ul className="products-list tableHead">
          <li className="products-list-title row">
            <div className="col-product">Product details</div>
            <div className="col-quantity">Quantity</div>
            <div className="col-price">Price</div>
            <div className="col-total">Total</div>
          </li>
        </ul>
        <ul className="products-list">
          {shoppingCart.items.map((item) => (
            <li key={item.product.code} className="product row">
              <div className="col-product">
                <figure className="product-image">
                  <img
                    src={`/img/${item.product.code.toLowerCase()}.png`}
                    alt={item.product.code}
                  />
                  <div className="product-description">
                    <h1>{item.product.name}</h1>
                    <p className="product-code">
                      Product code
                      {' '}
                      {item.product.code}
                    </p>
                  </div>
                </figure>
              </div>
              <div className="col-quantity">
                <button
                  onClick={() => shoppingCart.reject(item.product.code)}
                  className="count"
                >
                  -
                </button>
                <input
                  type="text"
                  className="product-quantity"
                  value={item.quantity}
                  readOnly
                />
                <button
                  onClick={() => shoppingCart.scan(item.product.code)}
                  className="count"
                >
                  +
                </button>
              </div>
              <div className="col-price">
                <span className="product-price">{item.product.price}</span>
                <span className="product-currency currency">€</span>
              </div>
              <div className="col-total">
                <span className="product-price">{item.total}</span>
                <span className="product-currency currency">€</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <aside className="summary">
        <h1 className="main">Order Summary</h1>
        <ul className="summary-items wrapper border">
          <li>
            <span className="summary-items-number">
              {shoppingCart.summary.quantity}
              {' '}
              Items
            </span>
            <span className="summary-items-price">
              {shoppingCart.summary.total}
              {' '}
              <span className="currency">€</span>
            </span>
          </li>
        </ul>
        <div className="summary-discounts wrapper-half border">
          <h2>Discounts</h2>
          <ul>
            {shoppingCart.appliedDiscounts.map((discount) => (
              <li key={discount.name}>
                <span>
                  x
                  {discount.quantity}
                  {' '}
                  {discount.name}
                </span>
                <span>
                  -
                  {discount.total}
                  €
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="summary-total wrapper">
          <ul>
            <li>
              <span className="summary-total-cost">Total cost</span>
              <span className="summary-total-price">
                {shoppingCart.total}
                €
              </span>
            </li>
          </ul>
          <button type="submit">Checkout</button>
        </div>
      </aside>
    </main>
  );
};

export default ShoppingCart;
