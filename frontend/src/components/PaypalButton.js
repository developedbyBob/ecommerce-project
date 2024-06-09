import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PaypalButton = ({ totalAmount }) => {
  const createOrder = async (data, actions) => {
    try {
      const res = await axios.post('http://localhost:5000/api/payments/create-payment', {
        totalAmount
      });

      return res.data.id;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const res = await axios.post('http://localhost:5000/api/payments/capture-payment', {
        orderId: data.orderID
      });

      console.log('Payment successful:', res.data);
      // Atualize o estado do carrinho, mostre uma mensagem de sucesso, etc.
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID" }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
