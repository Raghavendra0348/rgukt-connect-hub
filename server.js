const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'rgukt_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'rgukt_alumni_portal',
  password: process.env.DB_PASSWORD || 'rgukt_password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Auth utilities
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const generateToken = (userId, email) => {
  const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ userId, email }, jwtSecret, { expiresIn: jwtExpiresIn });
};

const verifyToken = (token) => {
  const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
  return jwt.verify(token, jwtSecret);
};

// Auth middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = verifyToken(token);
    
    // Get user from database
    const userQuery = `
      SELECT u.id, u.email, u.full_name, u.status, u.email_verified, u.created_at, u.updated_at, ur.role
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      WHERE u.id = $1
    `;
    
    const result = await pool.query(userQuery, [decoded.userId]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = result.rows[0];
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;
    
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Email, password, and full name are required' });
    }
    
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const userQuery = `
      INSERT INTO users (email, password_hash, full_name, status, email_verified)
      VALUES ($1, $2, $3, 'active', true)
      RETURNING id, email, full_name, status, email_verified, created_at, updated_at
    `;
    
    const userResult = await pool.query(userQuery, [email, hashedPassword, fullName]);
    const user = userResult.rows[0];
    
    // Assign role if provided
    if (role && ['admin', 'alumni', 'student'].includes(role)) {
      const roleQuery = `
        INSERT INTO user_roles (user_id, role)
        VALUES ($1, $2)
        ON CONFLICT (user_id, role) DO NOTHING
      `;
      await pool.query(roleQuery, [user.id, role]);
    }
    
    const token = generateToken(user.id, user.email);
    
    // Get user with role
    const userWithRoleQuery = `
      SELECT u.id, u.email, u.full_name, u.status, u.email_verified, u.created_at, u.updated_at, ur.role
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      WHERE u.id = $1
    `;
    const userWithRoleResult = await pool.query(userWithRoleQuery, [user.id]);
    
    res.status(201).json({ user: userWithRoleResult.rows[0], token });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Get user with password hash and role
    const userQuery = `
      SELECT u.*, ur.role 
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      WHERE u.email = $1 AND u.status = 'active'
    `;
    
    const userResult = await pool.query(userQuery, [email]);
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const userWithHash = userResult.rows[0];
    
    // Verify password
    const isPasswordValid = await comparePassword(password, userWithHash.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Remove password hash from response
    const { password_hash, ...user } = userWithHash;
    
    const token = generateToken(user.id, user.email);
    
    res.json({ user, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// User role routes
app.get('/api/user-roles/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Users can only access their own role, admins can access any
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const roleQuery = 'SELECT role FROM user_roles WHERE user_id = $1';
    const result = await pool.query(roleQuery, [userId]);
    const role = result.rows[0]?.role || null;
    
    res.json({ role });
  } catch (error) {
    console.error('Get user role error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at: http://localhost:${PORT}/api`);
  console.log(`🔗 Frontend should connect to: http://localhost:${PORT}/api`);
});
