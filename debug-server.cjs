console.log('Starting server...');

const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3001;

console.log('Creating database pool...');
const pool = new Pool({
  user: 'rgukt_user',
  host: 'localhost',
  database: 'rgukt_alumni_portal',
  password: 'rgukt_password',
  port: 5432,
});

console.log('Setting up middleware...');
app.use(express.json());

app.get('/api/health', (req, res) => {
  console.log('Health check requested!');
  res.json({ status: 'OK', message: 'Server is working!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

// Test database connection
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Database connected successfully!');
  }
});
