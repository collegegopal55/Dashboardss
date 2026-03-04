
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const fs = require('fs');
// const path = require("path"); // Move this to the top with other imports
// require("dotenv").config();

// const app = express();


// // Create logs stream
// const logStream = fs.createWriteStream(path.join(__dirname, 'logs.txt'), { flags: 'a' });

// // Redirect console.log
// console.log = function(...args) {
//   const message = args.join(' ');
//   const timestamp = new Date().toLocaleTimeString();
//   logStream.write(`[${timestamp}] ${message}\n`);
//   process.stdout.write(`[${timestamp}] ${message}\n`);
// };

// // Redirect console.error
// console.error = function(...args) {
//   const message = args.join(' ');
//   const timestamp = new Date().toLocaleTimeString();
//   logStream.write(`❌ [${timestamp}] ${message}\n`);
//   process.stderr.write(`❌ [${timestamp}] ${message}\n`);
// };


// // Middleware
// app.use(cors({
//   origin: "https://dashboardss-e7ez.onrender.com",
//   credentials: true
// }));

// app.use(express.json());

// // MongoDB Connect
// mongoose.connect(process.env.MONGODB_URI)
// .then(() => console.log("✅ MongoDB Connected"))
// .catch((err) => console.log("❌ MongoDB Error:", err.message));

// // Serve static files from uploads directory - MOVED HERE (before routes)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// const uploadsDir = path.join(__dirname, 'uploads/avatars');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
//   console.log('✅ Created uploads directory:', uploadsDir);
// }

// // Routes
// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);

// // Test Route
// app.get("/api/test", (req, res) => {
//   res.json({ message: "API working" });
// });

// // Health Check
// app.get("/api/health", (req, res) => {
//   res.json({
//     success: true,
//     database: mongoose.connection.readyState === 1 ? "connected" : "not connected"
//   });
// });

// // Frontend Serve
// app.use(express.static(path.join(__dirname, "../frontend/dist")));

// // Catch-all route for frontend
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
// });

// // Server Start
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const fs = require('fs');
// const path = require("path");
// require("dotenv").config();

// const app = express();

// // Create logs directory if not exists
// const logsDir = path.join(__dirname, 'logs');
// if (!fs.existsSync(logsDir)) {
//   fs.mkdirSync(logsDir, { recursive: true });
// }

// // Create log streams
// const logStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
// const errorStream = fs.createWriteStream(path.join(logsDir, 'error.log'), { flags: 'a' });

// // Enhanced console logging with timestamps
// const originalLog = console.log;
// const originalError = console.error;

// console.log = function(...args) {
//   const timestamp = new Date().toISOString();
//   const message = args.map(arg => 
//     typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
//   ).join(' ');
  
//   logStream.write(`[${timestamp}] ${message}\n`);
//   originalLog(`[${timestamp}] ${message}`);
// };

// console.error = function(...args) {
//   const timestamp = new Date().toISOString();
//   const message = args.map(arg => 
//     typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
//   ).join(' ');
  
//   errorStream.write(`❌ [${timestamp}] ${message}\n`);
//   originalError(`❌ [${timestamp}] ${message}`);
// };

// // CORS Configuration
// const allowedOrigins = [
//   'https://dashboardss-e7ez.onrender.com',
//   'http://localhost:5173',
//   'http://localhost:3000'
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true
// }));

// // Body parsing middleware with increased limits
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Request logging middleware
// app.use((req, res, next) => {
//   console.log(`📥 ${req.method} ${req.url} - ${req.ip}`);
//   next();
// });

// // MongoDB Connection with retry logic
// const connectDB = async (retries = 5) => {
//   for (let i = 0; i < retries; i++) {
//     try {
//       await mongoose.connect(process.env.MONGODB_URI);
//       console.log("✅ MongoDB Connected Successfully");
//       return true;
//     } catch (err) {
//       console.error(`❌ MongoDB Connection Attempt ${i + 1} failed:`, err.message);
//       if (i === retries - 1) {
//         console.error("❌ All MongoDB connection attempts failed");
//         return false;
//       }
//       await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retry
//     }
//   }
// };

// // Connect to MongoDB
// connectDB();

// // MongoDB connection event handlers
// mongoose.connection.on('error', (err) => {
//   console.error('❌ MongoDB connection error:', err);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('⚠️ MongoDB disconnected');
// });

// mongoose.connection.on('reconnected', () => {
//   console.log('✅ MongoDB reconnected');
// });

// // Create uploads directory if not exists
// const uploadsDir = path.join(__dirname, 'uploads');
// const avatarsDir = path.join(uploadsDir, 'avatars');

// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
//   console.log('✅ Created uploads directory:', uploadsDir);
// }

// if (!fs.existsSync(avatarsDir)) {
//   fs.mkdirSync(avatarsDir, { recursive: true });
//   console.log('✅ Created avatars directory:', avatarsDir);
// }

// // Serve static files from uploads directory
// app.use('/uploads', express.static(uploadsDir));

// // ============ HEALTH CHECK ENDPOINTS (MOST IMPORTANT) ============
// app.get("/health", (req, res) => {
//   res.status(200).json({
//     status: "OK",
//     message: "Server is running",
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//     database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
//     memory: process.memoryUsage(),
//     cpu: process.cpuUsage()
//   });
// });

// app.get("/healthz", (req, res) => {
//   res.status(200).send("OK");
// });

// app.get("/api/health", (req, res) => {
//   res.json({
//     success: true,
//     timestamp: new Date().toISOString(),
//     database: mongoose.connection.readyState === 1 ? "connected" : "not connected",
//     environment: process.env.NODE_ENV || 'development'
//   });
// });
// // =================================================================

// // Routes
// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);

// // Test Route
// app.get("/api/test", (req, res) => {
//   res.json({ 
//     message: "API working",
//     timestamp: new Date().toISOString()
//   });
// });

// // Debug route to check uploads
// app.get("/api/debug/uploads", (req, res) => {
//   try {
//     const files = fs.readdirSync(avatarsDir);
//     res.json({
//       success: true,
//       uploadsDir: uploadsDir,
//       avatarsDir: avatarsDir,
//       files: files,
//       count: files.length
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// // ============ FRONTEND SERVING ============
// const frontendPath = path.join(__dirname, "../frontend/dist");
// console.log("📁 Frontend path:", frontendPath);

// // Check if frontend build exists
// if (fs.existsSync(frontendPath)) {
//   console.log("✅ Frontend build found at:", frontendPath);
//   app.use(express.static(frontendPath));
  
//   // Catch-all route for frontend
//   app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"), (err) => {
//       if (err) {
//         console.error("❌ Error sending index.html:", err);
//         res.status(500).send("Error loading application");
//       }
//     });
//   });
// } else {
//   console.warn("⚠️ Frontend build not found at:", frontendPath);
//   // Fallback route
//   app.get("*", (req, res) => {
//     res.status(404).json({
//       error: "Frontend build not found",
//       path: frontendPath
//     });
//   });
// }
// // ===========================================

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.method} ${req.url} not found`
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error("❌ Server error:", err);
  
//   // Handle multer errors
//   if (err.code === 'LIMIT_FILE_SIZE') {
//     return res.status(400).json({
//       success: false,
//       message: 'File too large. Max size is 5MB'
//     });
//   }
  
//   if (err.message === 'Only image files are allowed') {
//     return res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }

//   res.status(500).json({
//     success: false,
//     message: "Internal server error",
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// // Server Start
// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`🔗 Health check: http://localhost:${PORT}/health`);
//   console.log(`📁 Uploads directory: ${uploadsDir}`);
// });

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('👋 SIGTERM received, shutting down gracefully');
//   server.close(() => {
//     console.log('💤 Server closed');
//     mongoose.connection.close(false, () => {
//       console.log('💤 MongoDB connection closed');
//       process.exit(0);
//     });
//   });
// });

// module.exports = app;



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require('fs');
const path = require("path");
require("dotenv").config();

const app = express();

// Create logs directory if not exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create log streams
const logStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
const errorStream = fs.createWriteStream(path.join(logsDir, 'error.log'), { flags: 'a' });

// Enhanced console logging with timestamps
const originalLog = console.log;
const originalError = console.error;

console.log = function(...args) {
  const timestamp = new Date().toISOString();
  const message = args.map(arg => 
    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
  ).join(' ');
  
  logStream.write(`[${timestamp}] ${message}\n`);
  originalLog(`[${timestamp}] ${message}`);
};

console.error = function(...args) {
  const timestamp = new Date().toISOString();
  const message = args.map(arg => 
    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
  ).join(' ');
  
  errorStream.write(`❌ [${timestamp}] ${message}\n`);
  originalError(`❌ [${timestamp}] ${message}`);
};

// Check Cloudinary configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn("⚠️ Cloudinary credentials not found. Avatar upload will not work properly.");
} else {
  console.log("✅ Cloudinary configured successfully");
}

// CORS Configuration
const allowedOrigins = [
  'https://dashboardss-e7ez.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Body parsing middleware with increased limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url} - ${req.ip}`);
  next();
});

// MongoDB Connection with retry logic
const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("✅ MongoDB Connected Successfully");
      return true;
    } catch (err) {
      console.error(`❌ MongoDB Connection Attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) {
        console.error("❌ All MongoDB connection attempts failed");
        return false;
      }
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retry
    }
  }
};

// Connect to MongoDB
connectDB();

// MongoDB connection event handlers
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

// Create uploads directory for non-avatar files (if needed for other purposes)
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory:', uploadsDir);
}

// Serve static files from uploads directory (if needed for other files)
app.use('/uploads', express.static(uploadsDir));

// ============ HEALTH CHECK ENDPOINTS (MOST IMPORTANT) ============
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? "configured" : "not configured",
    memory: process.memoryUsage(),
    cpu: process.cpuUsage()
  });
});

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "not connected",
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? "configured" : "not configured",
    environment: process.env.NODE_ENV || 'development'
  });
});
// =================================================================

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "API working",
    timestamp: new Date().toISOString()
  });
});

// Debug route to check Cloudinary configuration
app.get("/api/debug/cloudinary", (req, res) => {
  try {
    res.json({
      success: true,
      cloudinary: {
        configured: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET),
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ? "✓" : "✗",
        apiKey: process.env.CLOUDINARY_API_KEY ? "✓" : "✗",
        apiSecret: process.env.CLOUDINARY_API_SECRET ? "✓" : "✗"
      },
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============ FRONTEND SERVING ============
const frontendPath = path.join(__dirname, "../frontend/dist");
console.log("📁 Frontend path:", frontendPath);

// Check if frontend build exists
if (fs.existsSync(frontendPath)) {
  console.log("✅ Frontend build found at:", frontendPath);
  app.use(express.static(frontendPath));
  
  // Catch-all route for frontend
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"), (err) => {
      if (err) {
        console.error("❌ Error sending index.html:", err);
        res.status(500).send("Error loading application");
      }
    });
  });
} else {
  console.warn("⚠️ Frontend build not found at:", frontendPath);
  // Fallback route
  app.get("*", (req, res) => {
    res.status(404).json({
      error: "Frontend build not found",
      path: frontendPath
    });
  });
}
// ===========================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  
  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File too large. Max size is 5MB'
    });
  }
  
  if (err.message === 'Only image files are allowed') {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Handle Cloudinary errors
  if (err.name === 'CloudinaryError') {
    return res.status(400).json({
      success: false,
      message: 'Error uploading to Cloudinary. Please try again.'
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Server Start
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`☁️ Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not configured'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('💤 Server closed');
    mongoose.connection.close(false, () => {
      console.log('💤 MongoDB connection closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('💤 Server closed');
    mongoose.connection.close(false, () => {
      console.log('💤 MongoDB connection closed');
      process.exit(0);
    });
  });
});

module.exports = app;
