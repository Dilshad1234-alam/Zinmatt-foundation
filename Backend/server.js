import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import publicRoutes from './routes/publicRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Connect to MongoDB
connectDB();

// 1. Security & Logging Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows cross-origin preview images from Unsplash
    crossOriginEmbedderPolicy: false,
  })
);

app.use(morgan('dev'));

// 2. CORS configuration (permits credentials from client)
const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Dev-friendly fallback
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// 3. Body & Cookie Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// 4. API Endpoints
app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  return res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Root Welcome
app.get('/', (req, res) => {
  return res.send(
    '<div style="font-family:sans-serif;padding:40px;text-align:center;"><h2>ZINMATT Foundation Backend API</h2><p>Server is running on port ' +
      PORT +
      '</p></div>'
  );
});

// 5. 404 Route Handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// 6. Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Server Error]', err);
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start listening
const server = app.listen(PORT, () => {
  console.log(`[Server] ZINMATT Foundation Backend running on http://localhost:${PORT}`);
  console.log(`[Server] Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[Server] Allowed Client Origin: ${CLIENT_URL}`);
});

export default app;
