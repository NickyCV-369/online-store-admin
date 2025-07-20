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

## 🚀 Cách chạy dự án bằng Docker

### ⚙️ Yêu cầu
- Docker & Docker Compose
- Git

### 🧩 Bước 1: Clone mã nguồn
```bash
git clone https://github.com/NickyCV-369/online-store-admin.git
cd online-store-admin
```
### Bước 2: Chạy ứng dụng
docker compose up -d --build

Truy cập:
React giao diện chính: http://localhost

## ✅ Test tính năng

- Truy cập `http://localhost` để xem giao diện admin.
- Sử dụng Postman:
  - GET `http://localhost/api/products`
  - POST `http://localhost/api/orders`
  - GET `http://localhost/api/customers`
  - POST `http://localhost/api/payments`

## 🐞 Các lỗi đã gặp và cách khắc phục

|             Lỗi        |                  Cách khắc phục                 |
|------------------------|-------------------------------------------------|
| Port 80 already in use | Đóng process đang chiếm hoặc đổi port Nginx     |
| Lỗi kết nối DB         | Kiểm tra biến môi trường và mạng docker-compose |
| Lỗi `value too long`   | Tăng giới hạn độ dài cột trong DB               |

## 🔗 Link GitHub / mã nguồn

- GitHub: https://github.com/NickyCV-369/online-store-admin