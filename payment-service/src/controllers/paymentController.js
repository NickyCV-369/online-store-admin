import 'dotenv/config';
import Stripe from 'stripe';
import pool from '../models/db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req, res) => {

  const { orderId, amount } = req.body;

  try {
    const vndAmount = amount; 
    const exchangeRate = 26000;
    const usdAmount = vndAmount / exchangeRate;

    const stripeAmount = Math.round(usdAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: stripeAmount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    const result = await pool.query(
      `INSERT INTO payments (order_id, amount, status, payment_intent_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [orderId, amount, paymentIntent.status, paymentIntent.id]
    );

    res.status(201).json({
      success: true,
      paymentIntentClientSecret: paymentIntent.client_secret,
      payment: result.rows[0]
    });
  } catch (err) {
    console.error('Lỗi trong quá trình tạo thanh toán:', err);
    res.status(500).json({ success: false, message: 'Payment failed' });
  }
};
