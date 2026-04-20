import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'payment-service' });
});

// Mock Payment Route
app.post('/process', (req, res) => {
  const { amount, currency = 'USD', source } = req.body;
  
  if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
  }

  // Simulate payment processing delay & random success/failure
  setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% success rate mock
      if (isSuccess) {
          res.status(200).json({
              success: true,
              transactionId: `tx_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
              amount,
              currency,
              message: 'Payment processed successfully'
          });
      } else {
          res.status(402).json({
              success: false,
              message: 'Payment failed due to insufficient funds or network error'
          });
      }
  }, 1000); // 1 second delay
});

app.listen(PORT, () => {
  console.log(`Payment service is running on port ${PORT}`);
});
