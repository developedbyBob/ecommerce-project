const paypal = require('@paypal/checkout-server-sdk');
const express = require('express');
const router = express.Router();
const paypalClient = require('../config/paypal'); 

// @route   POST api/payments/create
// @desc    Create PayPal payment
// @access  Public
router.post('/create', async (req, res) => {
  const { cartItems } = req.body;

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: total.toFixed(2),
        breakdown: {
          item_total: {
            currency_code: 'USD',
            value: total.toFixed(2)
          }
        }
      },
      items: cartItems.map(item => ({
        name: item.name,
        unit_amount: {
          currency_code: 'USD',
          value: item.price.toFixed(2)
        },
        quantity: item.quantity
      }))
    }]
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/payments/capture
// @desc    Capture PayPal payment
// @access  Public
router.post('/capture/:orderID', async (req, res) => {
  const { orderID } = req.params;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);
    res.json(capture.result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
