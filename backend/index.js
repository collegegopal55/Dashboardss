

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const { connectDB, getConnectionStatus, closeConnection } = require('./config/db');


// // Load environment variables
// dotenv.config();

// // Initialize express
// const app = express();

// // Middleware
// app.use(cors({
//   origin: [ 'http://localhost:5173', 'http://localhost:5174'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Import routes
// const authRoutes = require('./routes/authRoutes');

// // Health check route (doesn't need DB connection)
// app.get('/api/health', (req, res) => {
//   const dbStatus = getConnectionStatus();
//   res.json({ 
//     success: true, 
//     message: 'Server is running',
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV,
//     uptime: process.uptime(),
//     database: dbStatus
//   });
// });

// // Middleware to check database connection for API routes
// app.use('/api', async (req, res, next) => {
//   try {
//     const dbStatus = getConnectionStatus();
    
//     if (!dbStatus.isConnected) {
//       console.log('⚠️ Database not connected. Current status:', dbStatus.status);
      
//       // Don't block health checks
//       if (req.path === '/health') {
//         return next();
//       }
      
//       // Try to reconnect for API routes
//       try {
//         await connectDB();
//         console.log('✅ Reconnected to database');
//       } catch (dbError) {
//         console.error('❌ Failed to reconnect to database:', dbError);
//         return res.status(503).json({
//           success: false,
//           message: 'Database connection unavailable. Please try again in a moment.'
//         });
//       }
//     }
//     next();
//   } catch (error) {
//     console.error('Database middleware error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Routes
// app.use('/api/auth', authRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error stack:', err.stack);
  
//   // Handle specific MongoDB errors
//   if (err.name === 'MongoNotConnectedError' || err.message.includes('Client must be connected')) {
//     return res.status(503).json({
//       success: false,
//       message: 'Database connection lost. Please try again.'
//     });
//   }
  
//   // Mongoose duplicate key error
//   if (err.code === 11000) {
//     return res.status(400).json({ 
//       success: false, 
//       message: 'Duplicate field value entered' 
//     });
//   }
  
//   // Mongoose validation error
//   if (err.name === 'ValidationError') {
//     const messages = Object.values(err.errors).map(val => val.message);
//     return res.status(400).json({ 
//       success: false, 
//       message: messages.join(', ') 
//     });
//   }

//   res.status(err.status || 500).json({ 
//     success: false, 
//     message: err.message || 'Something went wrong!' 
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ 
//     success: false, 
//     message: `Route ${req.originalUrl} not found` 
//   });
// });

// // Monitor connection status periodically
// const monitorConnection = setInterval(() => {
//   const status = getConnectionStatus();
//   if (!status.isConnected) {
//     console.log('⚠️ Database connection monitor: Not connected. Attempting to reconnect...');
//     connectDB().catch(err => {
//       console.error('❌ Monitor reconnection failed:', err.message);
//     });
//   }
// }, 30000); // Check every 30 seconds

// // Start server function
// const startServer = async () => {
//   try {
//     // Connect to database first
//     console.log('🔄 Starting server initialization...');
//     console.log('🔄 Connecting to MongoDB...');
    
//     await connectDB();
    
 
//     const PORT = process.env.PORT || 5000;
//     const server = app.listen(PORT, () => {
//       console.log('\n');
//       console.log('=' .repeat(50));
//       console.log(`✅ Server Status: RUNNING`);
//       console.log(`📌 Port: ${PORT}`);
//       console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
//       console.log(`📊 Database: ${getConnectionStatus().status}`);
//       console.log(`🔑 Health check: http://localhost:${PORT}/api/health`);
//       console.log('=' .repeat(50));
//       console.log('\n');
//     });

//     // Handle server errors
//     server.on('error', (error) => {
//       console.error('❌ Server error:', error);
//     });

//     // Graceful shutdown
//     const gracefulShutdown = async (signal) => {
//       console.log(`\n${signal} received. Closing server and database connection...`);
      
//       // Clear monitoring interval
//       clearInterval(monitorConnection);
      
//       server.close(async () => {
//         try {
//           await closeConnection();
//           console.log('✅ Graceful shutdown completed');
//           process.exit(0);
//         } catch (error) {
//           console.error('❌ Error during shutdown:', error);
//           process.exit(1);
//         }
//       });

//       // Force shutdown after timeout
//       setTimeout(() => {
//         console.error('❌ Force shutdown due to timeout');
//         process.exit(1);
//       }, 10000);
//     };

//     // Handle termination signals
//     process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
//     process.on('SIGINT', () => gracefulShutdown('SIGINT'));

//   } catch (error) {
//     console.error('❌ Failed to start server:', error);
//     console.log('🔄 Retrying in 5 seconds...');
//     setTimeout(startServer, 5000);
//   }
// };

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`❌ Unhandled Rejection at: ${promise}`);
//   console.log(`❌ Reason: ${err.message}`);
//   console.log(err);
//   // Don't exit the process, just log the error
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   console.log(`❌ Uncaught Exception: ${err.message}`);
//   console.log(err);
//   // Don't exit the process, just log the error
// });

// // Start the server
// startServer();




// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const { connectDB, getConnectionStatus, closeConnection } = require('./config/db');

// // Load environment variables
// dotenv.config();

// // Initialize express
// const app = express();

// // Middleware
// app.use(cors({
//   origin: [ 'https://dashboardss-e7ez.onrender.com' ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Import routes
// const authRoutes = require('./routes/authRoutes');

// // Health check route (doesn't need DB connection)
// app.get('/api/health', (req, res) => {
//   const dbStatus = getConnectionStatus();
//   res.json({ 
//     success: true, 
//     message: 'Server is running',
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV,
//     uptime: process.uptime(),
//     database: dbStatus
//   });
// });

// // Middleware to check database connection for API routes
// app.use('/api', async (req, res, next) => {
//   try {
//     const dbStatus = getConnectionStatus();
    
//     if (!dbStatus.isConnected) {
//       console.log('⚠️ Database not connected. Current status:', dbStatus.status);
      
//       // Don't block health checks
//       if (req.path === '/health') {
//         return next();
//       }
      
//       // Try to reconnect for API routes
//       try {
//         await connectDB();
//         console.log('✅ Reconnected to database');
//       } catch (dbError) {
//         console.error('❌ Failed to reconnect to database:', dbError);
//         return res.status(503).json({
//           success: false,
//           message: 'Database connection unavailable. Please try again in a moment.'
//         });
//       }
//     }
//     next();
//   } catch (error) {
//     console.error('Database middleware error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // API Routes
// app.use('/api/auth', authRoutes);

// // Serve static files from the React app build directory
// if (process.env.NODE_ENV === 'production') {
//   // In production, serve the built frontend
//   const buildPath = path.join(__dirname, '../frontend/dist'); // Adjust path as needed
//   app.use(express.static(buildPath));
  
//   // Handle React routing, return all requests to React app
//   app.get(/.*/, (req, res) => {
//     if (!req.path.startsWith('/api')) {
//       res.sendFile(path.join(buildPath, 'index.html'));
//     }
//   });
// } else {
//   // In development, you might want to redirect to the React dev server
//   app.get('/', (req, res) => {
//     res.send(`
//       <html>
//         <head>
//           <title>Pezzi Attendance System</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               height: 100vh;
//               margin: 0;
//               background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//               color: white;
//             }
//             .container {
//               text-align: center;
//               padding: 2rem;
//               background: rgba(255, 255, 255, 0.1);
//               border-radius: 10px;
//               backdrop-filter: blur(10px);
//             }
//             h1 { font-size: 2.5rem; margin-bottom: 1rem; }
//             p { font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9; }
//             .links {
//               display: flex;
//               gap: 1rem;
//               justify-content: center;
//             }
//             a {
//               color: white;
//               text-decoration: none;
//               padding: 0.5rem 1rem;
//               border: 1px solid white;
//               border-radius: 5px;
//               transition: all 0.3s;
//             }
//             a:hover {
//               background: white;
//               color: #764ba2;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <h1>🚀 Pezzi Attendance System API</h1>
//             <p>Backend server is running successfully!</p>
//             <div class="links">
//               <a href="/api/health">Check API Health</a>
//               <a href="https://dashboardss-e7ez.onrender.com">Go to Frontend (Vite Dev Server)</a>
//             </div>
//           </div>
//         </body>
//       </html>
//     `);
//   });
// }

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error stack:', err.stack);
  
//   // Handle specific MongoDB errors
//   if (err.name === 'MongoNotConnectedError' || err.message.includes('Client must be connected')) {
//     return res.status(503).json({
//       success: false,
//       message: 'Database connection lost. Please try again.'
//     });
//   }
  
//   // Mongoose duplicate key error
//   if (err.code === 11000) {
//     return res.status(400).json({ 
//       success: false, 
//       message: 'Duplicate field value entered' 
//     });
//   }
  
//   // Mongoose validation error
//   if (err.name === 'ValidationError') {
//     const messages = Object.values(err.errors).map(val => val.message);
//     return res.status(400).json({ 
//       success: false, 
//       message: messages.join(', ') 
//     });
//   }

//   res.status(err.status || 500).json({ 
//     success: false, 
//     message: err.message || 'Something went wrong!' 
//   });
// });

// // 404 handler for API routes only
// app.use('/api/', (req, res) => {
//   res.status(404).json({ 
//     success: false, 
//     message: `API route ${req.originalUrl} not found` 
//   });
// });

// // Monitor connection status periodically
// const monitorConnection = setInterval(() => {
//   const status = getConnectionStatus();
//   if (!status.isConnected) {
//     console.log('⚠️ Database connection monitor: Not connected. Attempting to reconnect...');
//     connectDB().catch(err => {
//       console.error('❌ Monitor reconnection failed:', err.message);
//     });
//   }
// }, 30000); // Check every 30 seconds

// // Start server function
// const startServer = async () => {
//   try {
//     // Connect to database first
//     console.log('🔄 Starting server initialization...');
//     console.log('🔄 Connecting to MongoDB...');
    
//     await connectDB();
    
//     const PORT = process.env.PORT || 5000;
//     const server = app.listen(PORT, () => {
//       console.log('\n');
//       console.log('=' .repeat(50));
//       console.log(`✅ Server Status: RUNNING`);
//       console.log(`📌 Port: ${PORT}`);
//       console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
//       console.log(`📊 Database: ${getConnectionStatus().status}`);
//       console.log(`🔑 Health check: http://localhost:${PORT}/api/health`);
      
//       if (process.env.NODE_ENV === 'production') {
//         console.log(`🌐 Frontend: Serving from build directory`);
//         console.log(`🌐 Access app at: http://localhost:${PORT}`);
//       } else {
//         console.log(`🌐 Frontend dev server: http://localhost:5173`);
//       }
      
//       console.log('=' .repeat(50));
//       console.log('\n');
//     });

//     // Handle server errors
//     server.on('error', (error) => {
//       console.error('❌ Server error:', error);
//     });

//     // Graceful shutdown
//     const gracefulShutdown = async (signal) => {
//       console.log(`\n${signal} received. Closing server and database connection...`);
      
//       // Clear monitoring interval
//       clearInterval(monitorConnection);
      
//       server.close(async () => {
//         try {
//           await closeConnection();
//           console.log('✅ Graceful shutdown completed');
//           process.exit(0);
//         } catch (error) {
//           console.error('❌ Error during shutdown:', error);
//           process.exit(1);
//         }
//       });

//       // Force shutdown after timeout
//       setTimeout(() => {
//         console.error('❌ Force shutdown due to timeout');
//         process.exit(1);
//       }, 10000);
//     };

//     // Handle termination signals
//     process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
//     process.on('SIGINT', () => gracefulShutdown('SIGINT'));

//   } catch (error) {
//     console.error('❌ Failed to start server:', error);
//     console.log('🔄 Retrying in 5 seconds...');
//     setTimeout(startServer, 5000);
//   }
// };

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`❌ Unhandled Rejection at: ${promise}`);
//   console.log(`❌ Reason: ${err.message}`);
//   console.log(err);
//   // Don't exit the process, just log the error
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   console.log(`❌ Uncaught Exception: ${err.message}`);
//   console.log(err);
//   // Don't exit the process, just log the error
// });

// // Start the server
// startServer();




// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: [ 'https://dashboardss-e7ez.onrender.com' ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../frontend/dist'); // Adjust if needed
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(buildPath, 'index.html'));
    }
  });
} else {
  // Dev landing page
  app.get('/', (req, res) => {
    res.send('<h1>Backend running. Frontend on Vite dev server</h1>');
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
