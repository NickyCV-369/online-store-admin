# 🛒 Online Store - Microservice Project

## 📌 Tổng quan
Ứng dụng bán hàng trực tuyến theo kiến trúc microservice:
- `product-service` (MongoDB) quản lý sản phẩm
- `customer-service` (MongoDB) quản lý khách hàng
- `order-service` (PostgreSQL) quản lý đơn hàng
- `payment-service` (PostgreSQL) quản lý thanh toán
- `frontend` (ReactJS + TailwindCSS) hiển thị UI

## 🚀 Cách chạy
```bash
git clone <repo>
cd online-store
docker-compose up -d
