const express = require('express');
const router = express.Router();
const paypal = require('@paypal/checkout-server-sdk');
const client = require('../config/paypal');

// @route   POST api/payments
// @desc    Create a payment
// @access  Public
router.post('/create-payment', async (req, res) => {
  const { items, totalAmount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: totalAmount,
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   POST api/payments/capture
// @desc    Capture a payment
// @access  Public
router.post('/capture-payment', async (req, res) => {
  const { orderId } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.json(capture.result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
