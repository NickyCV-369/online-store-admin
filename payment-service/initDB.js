import pool from './src/models/db.js';

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      order_id VARCHAR(50) NOT NULL,
      amount NUMERIC NOT NULL,
      status VARCHAR(50) NOT NULL,
      payment_intent_id VARCHAR(100),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
};

export default initDB;
