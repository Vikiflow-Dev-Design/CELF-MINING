const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const config = require('./config/config');
const database = require('./config/database');
const routes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration for multiple frontends
const allowedOrigins = [
  'http://localhost:3000',    // Website frontend
  'http://localhost:8081',    // Mobile app (Expo web)
  'http://localhost:19006',   // Alternative Expo web port
  'http://127.0.0.1:8081',    // Alternative localhost format
  'http://127.0.0.1:19006',   // Alternative localhost format
  process.env.FRONTEND_URL,   // Custom frontend URL from env
  process.env.MOBILE_URL      // Custom mobile URL from env
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiting - More lenient for development
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000, // limit each IP to 1000 requests per minute (very generous for development)
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbHealth = await database.healthCheck();

    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbHealth,
      version: '1.0.0'
    });
  } catch (error) {
    res.status(503).json({
      status: 'Service Unavailable',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// API routes
app.use('/api', routes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = config.port || 5000;

// Initialize database and start server
const startServer = async () => {
  try {
    // Try to connect to MongoDB
    const connection = await database.connect();

    if (connection) {
      console.log('✅ MongoDB connection successful');
      // Setup event handlers for graceful shutdown
      database.setupEventHandlers();
    } else {
      console.warn('⚠️  Starting server without MongoDB connection');
      console.warn('⚠️  Some features may not work until database is connected');
    }

    // Start server regardless of database connection status
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${config.nodeEnv}`);
      console.log(`🗄️  Database: ${connection ? 'MongoDB (Connected)' : 'MongoDB (Disconnected)'}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/health`);

      if (!connection) {
        console.log(`⚠️  To fix database connection:`);
        console.log(`   1. Check MongoDB Atlas IP whitelist`);
        console.log(`   2. Verify MONGODB_URI in .env file`);
        console.log(`   3. Check network connectivity`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;
