import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../redux/slices/cartSlice';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Your Cart</h1>
      <div className="cart-list">
        {cartItems.map(item => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.price}</p>
            <p>Quantity: 1</p>
            <button onClick={() => dispatch(removeItem(item._id))}>Remove</button>
          </div>
        ))}
      </div>
      <button>Checkout</button>
    </div>
  );
};

export default CartPage;
