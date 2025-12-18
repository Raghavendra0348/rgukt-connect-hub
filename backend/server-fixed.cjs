const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const PORT = 3001;

console.log('🚀 Starting RGUKT Alumni Portal API Server...');

// CORS configuration for multiple development ports
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',  // Added for current frontend
    'http://localhost:8081', 
    'http://localhost:3000',
    'http://localhost:4173'
  ],
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

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as user_count FROM users');
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: 'connected',
      users: parseInt(result.rows[0].user_count),
      version: '1.0.0'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt:', email);

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
    const isPasswordValid = await bcrypt.compare(password, userWithHash.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Remove password hash from response
    const { password_hash, ...user } = userWithHash;

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      'your-super-secret-jwt-key-change-this-in-production',
      { expiresIn: '7d' }
    );

    console.log('✅ Login successful:', email, 'Role:', user.role);
    res.json({ user, token });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;
    console.log('📝 Registration attempt:', email);
    console.log('📋 Request body:', { email, password: password ? '***' : 'missing', fullName, role });

    if (!email || !password || !fullName) {
      console.log('❌ Missing required fields:', { email: !!email, password: !!password, fullName: !!fullName });
      return res.status(400).json({ error: 'Email, password, and full name are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'your-super-secret-jwt-key-change-this-in-production',
      { expiresIn: '7d' }
    );

    // Get user with role
    const userWithRoleQuery = `
      SELECT u.id, u.email, u.full_name, u.status, u.email_verified, u.created_at, u.updated_at, ur.role
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      WHERE u.id = $1
    `;
    const userWithRoleResult = await pool.query(userWithRoleQuery, [user.id]);

    console.log('✅ Registration successful:', email);
    res.status(201).json({ user: userWithRoleResult.rows[0], token });

  } catch (error) {
    console.error('❌ Registration error:', error);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error detail:', error.detail);
    
    if (error.code === '23505') { // Unique constraint violation
      console.log('❌ Duplicate email detected:', email);
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Get current user endpoint
app.get('/api/auth/me', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, 'your-super-secret-jwt-key-change-this-in-production');

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

    res.json({ user: result.rows[0] });

  } catch (error) {
    console.error('❌ Auth verification error:', error);
    return res.status(403).json({ error: 'Invalid token' });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, 'your-super-secret-jwt-key-change-this-in-production');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// =============================================
// ALUMNI PROFILE ENDPOINTS
// =============================================

// Get alumni profile by user ID
app.get('/api/profiles/alumni/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('📋 Fetching alumni profile for user:', userId);

    const query = `
      SELECT ap.*, u.full_name, u.email
      FROM alumni_profiles ap
      JOIN users u ON ap.user_id = u.id
      WHERE ap.user_id = $1
    `;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      console.log('ℹ️ No alumni profile found for user:', userId);
      return res.status(404).json({ error: 'Profile not found', code: 'PGRST116' });
    }

    console.log('✅ Alumni profile found for user:', userId);
    res.json(result.rows[0]);

  } catch (error) {
    console.error('❌ Error fetching alumni profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create alumni profile
app.post('/api/profiles/alumni', authenticateToken, async (req, res) => {
  try {
    const profileData = req.body;
    console.log('📋 Creating alumni profile:', profileData);

    const {
      user_id,
      batch_year,
      branch,
      graduation_year,
      current_company,
      job_title,
      location,
      phone_number,
      bio,
      linkedin_url,
      is_mentor
    } = profileData;

    if (!user_id || !batch_year || !branch) {
      return res.status(400).json({ error: 'user_id, batch_year, and branch are required' });
    }

    const query = `
      INSERT INTO alumni_profiles (
        user_id, batch_year, branch, graduation_year, current_company, 
        job_title, location, phone_number, bio, linkedin_url, is_mentor
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;

    const result = await pool.query(query, [
      user_id,
      batch_year,
      branch,
      graduation_year || batch_year,
      current_company || null,
      job_title || null,
      location || null,
      phone_number || null,
      bio || null,
      linkedin_url || null,
      is_mentor || false
    ]);

    console.log('✅ Alumni profile created for user:', user_id);
    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error('❌ Error creating alumni profile:', error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Profile already exists for this user' });
    }
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Update alumni profile
app.put('/api/profiles/alumni/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const profileData = req.body;
    console.log('📋 Updating alumni profile for user:', userId);
    console.log('📋 Update data:', profileData);

    // Build dynamic update query
    const allowedFields = [
      'batch_year', 'branch', 'graduation_year', 'current_company', 
      'job_title', 'location', 'phone_number', 'bio', 'linkedin_url', 
      'github_url', 'twitter_url', 'website_url', 'skills', 'is_mentor',
      'city', 'state', 'country', 'industry', 'expertise_areas'
    ];

    const updates = [];
    const values = [];
    let paramCount = 1;

    for (const field of allowedFields) {
      if (profileData[field] !== undefined) {
        updates.push(`${field} = $${paramCount}`);
        values.push(profileData[field]);
        paramCount++;
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Add updated_at
    updates.push(`updated_at = NOW()`);
    values.push(userId);

    const query = `
      UPDATE alumni_profiles
      SET ${updates.join(', ')}
      WHERE user_id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      console.log('ℹ️ No alumni profile found to update for user:', userId);
      return res.status(404).json({ error: 'Profile not found' });
    }

    console.log('✅ Alumni profile updated for user:', userId);
    res.json(result.rows[0]);

  } catch (error) {
    console.error('❌ Error updating alumni profile:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// =============================================
// STUDENT PROFILE ENDPOINTS
// =============================================

// Get student profile by user ID
app.get('/api/profiles/student/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('📋 Fetching student profile for user:', userId);

    const query = `
      SELECT sp.*, u.full_name, u.email
      FROM student_profiles sp
      JOIN users u ON sp.user_id = u.id
      WHERE sp.user_id = $1
    `;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      console.log('ℹ️ No student profile found for user:', userId);
      return res.status(404).json({ error: 'Profile not found', code: 'PGRST116' });
    }

    console.log('✅ Student profile found for user:', userId);
    res.json(result.rows[0]);

  } catch (error) {
    console.error('❌ Error fetching student profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create student profile
app.post('/api/profiles/student', authenticateToken, async (req, res) => {
  try {
    const profileData = req.body;
    console.log('📋 Creating student profile:', profileData);

    const {
      user_id,
      roll_number,
      branch,
      graduation_year,
      phone_number,
      bio,
      current_year,
      batch_year,
      student_id
    } = profileData;

    if (!user_id || !roll_number || !branch) {
      return res.status(400).json({ error: 'user_id, roll_number, and branch are required' });
    }

    const currentYear = current_year || 1;
    const batchYear = batch_year || new Date().getFullYear();
    const gradYear = graduation_year || (batchYear + 4);
    const studId = student_id || roll_number;

    const query = `
      INSERT INTO student_profiles (
        user_id, roll_number, student_id, branch, current_year, batch_year, 
        graduation_year, phone_number, bio
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const result = await pool.query(query, [
      user_id,
      roll_number,
      studId,
      branch,
      currentYear,
      batchYear,
      gradYear,
      phone_number || null,
      bio || null
    ]);

    console.log('✅ Student profile created for user:', user_id);
    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error('❌ Error creating student profile:', error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Profile already exists for this user' });
    }
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Update student profile
app.put('/api/profiles/student/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const profileData = req.body;
    console.log('📋 Updating student profile for user:', userId);
    console.log('📋 Update data:', profileData);

    // Build dynamic update query
    const allowedFields = [
      'roll_number', 'branch', 'graduation_year', 'phone_number', 'bio',
      'current_year', 'semester', 'skills', 'interests', 'career_interests',
      'cgpa', 'linkedin_url', 'github_url', 'portfolio_url', 'achievements',
      'city', 'state', 'address', 'pincode'
    ];

    const updates = [];
    const values = [];
    let paramCount = 1;

    for (const field of allowedFields) {
      if (profileData[field] !== undefined) {
        updates.push(`${field} = $${paramCount}`);
        values.push(profileData[field]);
        paramCount++;
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Add updated_at
    updates.push(`updated_at = NOW()`);
    values.push(userId);

    const query = `
      UPDATE student_profiles
      SET ${updates.join(', ')}
      WHERE user_id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      console.log('ℹ️ No student profile found to update for user:', userId);
      return res.status(404).json({ error: 'Profile not found' });
    }

    console.log('✅ Student profile updated for user:', userId);
    res.json(result.rows[0]);

  } catch (error) {
    console.error('❌ Error updating student profile:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// =============================================
// USER ROLES ENDPOINT
// =============================================

// Get user role by user ID
app.get('/api/user-roles/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('📋 Fetching user role for user:', userId);

    const query = `
      SELECT * FROM user_roles WHERE user_id = $1
    `;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      console.log('ℹ️ No role found for user:', userId);
      return res.status(404).json({ error: 'Role not found' });
    }

    console.log('✅ User role found:', result.rows[0].role);
    res.json(result.rows[0]);

  } catch (error) {
    console.error('❌ Error fetching user role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at: http://localhost:${PORT}/api`);
  console.log(`🌐 CORS enabled for: http://localhost:5173, http://localhost:8081`);
  console.log(`🔑 Ready for authentication requests`);
});
