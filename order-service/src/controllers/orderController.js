import db from '../models/db.js';
import axios from 'axios';

const PAYMENT_SERVICE_URL = 'http://payment-service:3004/api/payments';

export const getOrders = async (req, res) => {
  const { status } = req.query;

  try {
    let result;

    if (status) {
      result = await db.query(
        'SELECT * FROM orders WHERE status = $1 ORDER BY created_at DESC',
        [status]
      );
    } else {
      result = await db.query(
        'SELECT * FROM orders ORDER BY created_at DESC'
      );
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi lấy danh sách đơn hàng" });
  }
};

export const getOrderDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const orderRes = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
    if (orderRes.rowCount === 0) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    const itemsRes = await db.query('SELECT * FROM order_items WHERE order_id = $1', [id]);

    let payment = null;
    try {
      const paymentRes = await axios.get(`${PAYMENT_SERVICE_URL}/order/${id}`);
      payment = paymentRes.data;
    } catch (e) {
      console.warn("Không lấy được thông tin thanh toán từ Payment Service");
    }

    res.json({
      ...orderRes.rows[0],
      items: itemsRes.rows,
      payment
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi lấy chi tiết đơn hàng" });
  }
};

export const addOrder = async (req, res) => {
  const { customer_id, payment_method, shipping_address, items } = req.body;

  if (!customer_id || !shipping_address || !items || !items.length) {
    console.warn("[Validation] Thiếu dữ liệu đầu vào");
    return res.status(400).json({ error: "Dữ liệu không hợp lệ" });
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const orderRes = await client.query(
      `INSERT INTO orders (customer_id, total, payment_method, shipping_address) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [customer_id, total, payment_method || 'cod', shipping_address]
    );
    const order = orderRes.rows[0];
    const orderId = order.id;

    for (let item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, name, price, quantity)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.product_id, item.name, item.price, item.quantity]
      );
    }

    if (payment_method !== 'cod') {
      try {
        const paymentRes = await axios.post(`${PAYMENT_SERVICE_URL}`, {
          orderId,
          amount: total,
          method: payment_method,
        });

      } catch (e) {
        console.warn("[Payment] Gọi Payment Service thất bại:", e.response?.data || e.message);
        throw new Error("Tạo đơn hàng thất bại do lỗi thanh toán");
      }
    } else {
      console.log("[Payment] Đơn hàng thanh toán COD, bỏ qua bước thanh toán");
    }

    await Promise.all(items.map(item =>
      axios.patch(`http://product-service:3001/api/products/${item.product_id}/stock`, {
        quantity: -item.quantity
      })
    ));

    await client.query('COMMIT');

    res.status(201).json({ message: "Tạo đơn hàng thành công", order });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("[Error] Lỗi khi tạo đơn hàng:", err.message);
    res.status(400).json({ error: "Lỗi khi tạo đơn hàng", detail: err.message });
  } finally {
    client.release();  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await db.query(
      `UPDATE orders SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
      [status, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Lỗi cập nhật trạng thái đơn hàng" });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM orders WHERE id=$1', [id]);
    res.json({ message: "Đã xóa đơn hàng" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Lỗi xóa đơn hàng" });
  }
};

export const getSummary = async (req, res) => {
  try {
    const totalOrders = await db.query('SELECT COUNT(*) FROM orders');
    const totalRevenue = await db.query('SELECT COALESCE(SUM(total),0) FROM orders');

    res.json({
      totalOrders: parseInt(totalOrders.rows[0].count),
      totalRevenue: parseFloat(totalRevenue.rows[0].coalesce)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi lấy tổng quan" });
  }
};

export const getDailySummary = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        to_char(created_at, 'YYYY-MM-DD') AS date,
        SUM(total) AS total
      FROM orders
      GROUP BY date
      ORDER BY date
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi lấy thống kê theo ngày" });
  }
};
