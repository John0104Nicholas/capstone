const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Validate essential environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Error: Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.error(`- ${envVar}`));
  console.error('Please set these environment variables before starting the server.');
  process.exit(1);
}

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());
app.disable('x-powered-by');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Compression middleware
app.use(compression());

// CORS middleware
app.use(cors({
  origin: ['https://client.dreamcraftevents.in', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Debug route to check environment variables (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.get('/debug/env', (req, res) => {
    res.json({
      nodeEnv: process.env.NODE_ENV,
      mongoUriExists: !!process.env.MONGO_URI,
      port: process.env.PORT,
      frontendUrl: process.env.FRONTEND_URL,
      backendUrl: 'https://guvi-capstone-taskmanager.onrender.com'
    });
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    api: 'https://guvi-capstone-taskmanager.onrender.com'
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  });
});

// MongoDB connection with retry logic and detailed error reporting
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined');
    }

    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Error Details:');
    console.error('- Error Name:', err.name);
    console.error('- Error Message:', err.message);
    if (err.reason) console.error('- Reason:', err.reason);
    console.error('- Stack:', err.stack);
    
    // Log environment info for debugging
    console.log('Environment Information:');
    console.log('- NODE_ENV:', process.env.NODE_ENV);
    console.log('- MONGO_URI exists:', !!process.env.MONGO_URI);
    
    // Retry connection after 5 seconds
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Initialize database connection
connectDB();

// Port configuration
const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log('Environment Configuration:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- MongoDB URI exists:', !!process.env.MONGO_URI);
  console.log('- Frontend URL:', process.env.FRONTEND_URL);
  console.log('- Backend URL: https://guvi-capstone-taskmanager.onrender.com');
}); 