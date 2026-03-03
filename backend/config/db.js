
const mongoose = require('mongoose');

let isConnected = false;
let connectionRetries = 0;
const MAX_RETRIES = 5;

const connectDB = async () => {
  // If already connected, return
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('📊 Using existing database connection');
    return;
  }

  try {
    console.log('🔄 Connecting to MongoDB...');
    
    // Updated connection options - removed keepalive
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
     
     
    });

    isConnected = conn.connections[0].readyState === 1;
    connectionRetries = 0; // Reset retry count on successful connection
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`📊 Connection State: ${conn.connection.readyState} (1 = connected)`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected. Attempting to reconnect...');
      isConnected = false;
      
      // Attempt to reconnect
      setTimeout(async () => {
        try {
          await reconnect();
        } catch (reconnectError) {
          console.error('❌ Reconnection failed:', reconnectError.message);
        }
      }, 5000);
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected successfully');
      isConnected = true;
      connectionRetries = 0;
    });

    mongoose.connection.on('timeout', () => {
      console.log('⏰ MongoDB connection timeout');
    });

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    isConnected = false;
    
    // Don't retry for certain errors
    if (error.message.includes('keepalive') || error.message.includes('keepAlive')) {
      console.error('❌ Invalid connection option detected. Please check your mongoose version.');
      console.log('Current mongoose version:', require('mongoose/package.json').version);
      throw error; // Don't retry for configuration errors
    }
    
    // Retry connection for network errors
    if (connectionRetries < MAX_RETRIES) {
      connectionRetries++;
      console.log(`🔄 Retrying connection (${connectionRetries}/${MAX_RETRIES}) in 5 seconds...`);
      setTimeout(connectDB, 5000);
    } else {
      console.error('❌ Max retries reached. Please check if MongoDB is running.');
    }
    
    throw error;
  }
};

// Reconnection function
const reconnect = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.disconnect();
      await connectDB();
    }
  } catch (error) {
    console.error('Reconnection failed:', error);
    throw error;
  }
};

// Function to check connection status
const getConnectionStatus = () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  return {
    isConnected: state === 1,
    readyState: state,
    status: states[state] || 'unknown',
    host: mongoose.connection.host,
    name: mongoose.connection.name
  };
};

// Graceful shutdown
const closeConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

module.exports = { connectDB, getConnectionStatus, closeConnection };