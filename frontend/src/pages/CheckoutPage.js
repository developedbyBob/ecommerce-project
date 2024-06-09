import React from 'react';
import { useSelector } from 'react-redux';
import PaypalButton from '../components/PaypalButton';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h1>Checkout</h1>
      <div className="cart-summary">
        {cartItems.map(item => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.price}</p>
            <p>Quantity: 1</p>
          </div>
        ))}
        <h2>Total: ${totalAmount}</h2>
      </div>
      <PaypalButton totalAmount={totalAmount.toFixed(2)} />
    </div>
  );
};

export default CheckoutPage;
