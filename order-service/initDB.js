import pool from './src/models/db.js';

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_id VARCHAR(50) NOT NULL,
        total NUMERIC(10, 2) NOT NULL,
        payment_method VARCHAR(20) DEFAULT 'cod',
        shipping_address TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id VARCHAR(50) NOT NULL,
        name VARCHAR(255),
        price NUMERIC(10, 2) NOT NULL,
        quantity INTEGER NOT NULL
      );
    `);

    console.log("✅ PostgreSQL: Bảng 'orders' và 'order_items' đã sẵn sàng.");
  } catch (err) {
    console.error("❌ Lỗi khởi tạo bảng orders/order_items:", err.message);
    process.exit(1);
  }
};

export default initDB;
