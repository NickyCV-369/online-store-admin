# Online Store Microservices Application

## 📌 Tổng quan dự án

Ứng dụng website bán hàng trực tuyến mô hình microservice. Bao gồm:
- Quản lý sản phẩm
- Quản lý đơn hàng
- Quản lý khách hàng
- Thanh toán đơn hàng
- Báo cáo doanh thu

## 🧱 Kiến trúc microservice

| Service            | Cổng | DB        | Tech Stack         |
|--------------------|------|-----------|--------------------|
| frontend           | 3000 | ✖         | ReactJS, Tailwind  |
| product-service    | 3001 | MongoDB   | Node.js, Express   |
| order-service      | 3002 | PostgreSQL| Node.js, Express   |
| customer-service   | 3003 | MongoDB   | Node.js, Express   |
| payment-service    | 3004 | PostgreSQL| Node.js, Express, Stripe API |
| nginx              | 80   | ✖         | Reverse Proxy      |

## ✅ Test tính năng

- Truy cập `http://localhost` để xem giao diện người dùng.
- Sử dụng Postman:
  - GET `http://localhost/api/products`
  - POST `http://localhost/api/orders`
  - GET `http://localhost/api/customers`
  - POST `http://localhost/api/payments`

## 🐞 Các lỗi đã gặp và cách khắc phục

| Lỗi | Cách khắc phục |
|-----|----------------|
| Port 80 already in use | Đóng process đang chiếm hoặc đổi port Nginx |
| Secrets bị push lên GitHub | Dùng `.env.example` và thêm `.env` vào `.gitignore` |
| Lỗi kết nối DB | Kiểm tra biến môi trường và mạng docker-compose |
| Lỗi `value too long for type character varying` | Tăng giới hạn độ dài cột trong DB |

## 🔐 .env & bảo mật

```env
# .env.example
STRIPE_SECRET_KEY=your_stripe_test_key_here
MONGO_URI=mongodb://mongo:27017/productsdb
POSTGRES_URI=postgres://postgres:password@postgres:5432/dbname
```

## ▶️ Video demo

Video bao gồm:
- Click trực tiếp trên giao diện React
- Gọi API qua Postman
- Giải thích `order-service` (hoặc service bất kỳ)
- Triển khai VPS, show logs, `docker ps`...

## 🔗 Link GitHub / mã nguồn

- GitHub: https://github.com/your-username/online-store
- hoặc file ZIP đính kèm trong phần nộp bài.