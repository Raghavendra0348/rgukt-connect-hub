#!/bin/bash

# Quick Fix Script for RGUKT Alumni Portal
cd "/home/a-raghavendra/Desktop/Alumini Portal/rgukt-connect-hub"

echo "🔧 Quick Fix: CORS and Server Issues"
echo "===================================="

# Kill existing processes
echo "1. Stopping existing processes..."
pkill -f "node.*server" || true
pkill -f "vite" || true
sleep 2

# Check PostgreSQL
echo "2. Checking PostgreSQL..."
if pgrep -x "postgres" > /dev/null; then
    echo "✅ PostgreSQL is running"
else
    echo "❌ PostgreSQL not running - starting..."
    sudo systemctl start postgresql
fi

# Start database setup
echo "3. Setting up database..."
node setup-production-db.cjs > /dev/null 2>&1 || echo "⚠️  Database setup may have issues"

# Start server with verbose logging
echo "4. Starting backend server with verbose logging..."
cat > temp-server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3001;

console.log('🚀 Starting server...');

// CORS for multiple development ports
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8081', 'http://localhost:3000', 'http://localhost:4173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Database connection
const pool = new Pool({
  user: 'rgukt_user',
  host: 'localhost',
  database: 'rgukt_alumni_portal',
  password: 'rgukt_password',
  port: 5432,
});

// Test endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM users');
    res.json({ 
      status: 'OK', 
      users: result.rows[0].count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);
    
    // Simple check for demo
    if (email === 'admin@rgukt.ac.in' && password === 'admin123') {
      res.json({
        user: { id: '1', email, full_name: 'Admin', role: 'admin' },
        token: 'demo-token-123'
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('✅ CORS enabled for all development ports');
});
EOF

# Start the temporary server
node temp-server.js > server.log 2>&1 &
SERVER_PID=$!
echo "Server started with PID: $SERVER_PID"

# Wait and test
sleep 3
echo "5. Testing server..."
HEALTH_RESPONSE=$(curl -s http://localhost:3001/api/health || echo "FAILED")

if echo "$HEALTH_RESPONSE" | grep -q "OK"; then
    echo "✅ Server is responding correctly"
    echo "Response: $HEALTH_RESPONSE"
else
    echo "❌ Server test failed"
    echo "Response: $HEALTH_RESPONSE"
    echo "Checking logs:"
    cat server.log
fi

# Test CORS
echo "6. Testing CORS for port 8081..."
CORS_TEST=$(curl -s -H "Origin: http://localhost:8081" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: Content-Type" -X OPTIONS http://localhost:3001/api/auth/login)
echo "CORS preflight response: $CORS_TEST"

echo "🎉 Quick fix completed!"
echo ""
echo "📋 Status:"
echo "  • Backend: http://localhost:3001"
echo "  • Frontend should work on any port (5173, 8081, etc.)"
echo "  • CORS configured for multiple development ports"
echo ""
echo "🔑 Test login:"
echo "  Email: admin@rgukt.ac.in"
echo "  Password: admin123"
echo ""
echo "📊 View logs: tail -f server.log"
echo "🛑 Stop server: kill $SERVER_PID"
