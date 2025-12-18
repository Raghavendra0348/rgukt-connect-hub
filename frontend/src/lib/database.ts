import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'rgukt_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'rgukt_alumni_portal',
  password: process.env.DB_PASSWORD || 'rgukt_password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Test connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('PostgreSQL connection error:', err);
  process.exit(-1);
});

export default pool;
