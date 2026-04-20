import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'api-gateway' });
});

// Services Map
const services = {
  users: process.env.USER_SERVICE_URL || 'http://localhost:3001',
  products: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002',
  orders: process.env.ORDER_SERVICE_URL || 'http://localhost:3003',
  payments: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004',
};

// Route definitions
app.use('/api/users', createProxyMiddleware({ target: services.users, changeOrigin: true, pathRewrite: { '^/api/users': '' } }));
app.use('/api/products', createProxyMiddleware({ target: services.products, changeOrigin: true, pathRewrite: { '^/api/products': '' } }));
app.use('/api/orders', createProxyMiddleware({ target: services.orders, changeOrigin: true, pathRewrite: { '^/api/orders': '' } }));
app.use('/api/payments', createProxyMiddleware({ target: services.payments, changeOrigin: true, pathRewrite: { '^/api/payments': '' } }));

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
