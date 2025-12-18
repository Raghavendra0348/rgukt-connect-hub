import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './database.js';

export interface User {
  id: string;
  email: string;
  full_name: string;
  status: string;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserWithRole extends User {
  role: string;
}

class AuthService {
  private jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
  private jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email },
      this.jwtSecret,
      { expiresIn: this.jwtExpiresIn as string }
    );
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async createUser(email: string, password: string, fullName: string): Promise<User> {
    const hashedPassword = await this.hashPassword(password);

    const query = `
      INSERT INTO users (email, password_hash, full_name, status, email_verified)
      VALUES ($1, $2, $3, 'active', true)
      RETURNING id, email, full_name, status, email_verified, created_at, updated_at
    `;

    const result = await pool.query(query, [email, hashedPassword, fullName]);
    return result.rows[0];
  }

  async loginUser(email: string, password: string): Promise<{ user: UserWithRole; token: string } | null> {
    // Get user with password hash
    const userQuery = `
      SELECT u.*, ur.role 
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      WHERE u.email = $1 AND u.status = 'active'
    `;

    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return null;
    }

    const userWithHash = userResult.rows[0];

    // Verify password
    const isPasswordValid = await this.comparePassword(password, userWithHash.password_hash);

    if (!isPasswordValid) {
      return null;
    }

    // Remove password hash from user object
    const { password_hash, ...user } = userWithHash;

    // Generate token
    const token = this.generateToken(user.id, user.email);

    return { user, token };
  }

  async getUserById(id: string): Promise<UserWithRole | null> {
    const query = `
      SELECT u.id, u.email, u.full_name, u.status, u.email_verified, u.created_at, u.updated_at, ur.role
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      WHERE u.id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async assignRole(userId: string, role: 'admin' | 'alumni' | 'student'): Promise<void> {
    const query = `
      INSERT INTO user_roles (user_id, role)
      VALUES ($1, $2)
      ON CONFLICT (user_id, role) DO NOTHING
    `;

    await pool.query(query, [userId, role]);
  }

  async getUserRole(userId: string): Promise<string | null> {
    const query = 'SELECT role FROM user_roles WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0]?.role || null;
  }
}

export default new AuthService();
