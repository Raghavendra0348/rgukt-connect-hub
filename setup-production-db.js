#!/usr/bin/env node

/**
 * Production Database Setup Script
 * This script sets up the complete database schema with proper password hashing
 */

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Database configuration
const adminPool = new Pool({
  user: process.env.DB_USER || 'rgukt_user',
  host: process.env.DB_HOST || 'localhost',
  database: 'postgres', // Connect to postgres database to create our database
  password: process.env.DB_PASSWORD || 'rgukt_password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

const appPool = new Pool({
  user: process.env.DB_USER || 'rgukt_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'rgukt_alumni_portal',
  password: process.env.DB_PASSWORD || 'rgukt_password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function setupDatabase() {
  console.log('🚀 Starting production database setup...\n');

  try {
    // Step 1: Drop existing database if it exists
    console.log('📦 Dropping existing database if it exists...');
    try {
      await adminPool.query('DROP DATABASE IF EXISTS rgukt_alumni_portal;');
      console.log('✅ Database dropped successfully\n');
    } catch (err) {
      console.log('⚠️  Database does not exist or cannot be dropped\n');
    }

    // Step 2: Create fresh database
    console.log('🔨 Creating fresh database...');
    await adminPool.query('CREATE DATABASE rgukt_alumni_portal;');
    console.log('✅ Database created successfully\n');

    // Step 3: Read and execute schema file
    console.log('📋 Reading database schema...');
    const schemaPath = path.join(__dirname, 'database-schema-production.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('⚙️  Executing schema...');
    await appPool.query(schema);
    console.log('✅ Schema created successfully\n');

    // Step 4: Generate password hashes
    console.log('🔐 Generating password hashes...');
    const adminPassword = await hashPassword('admin123');
    const userPassword = await hashPassword('user123');
    
    console.log('✅ Password hashes generated\n');

    // Step 5: Insert sample users with proper hashed passwords
    console.log('👥 Creating sample users...');
    
    const users = [
      {
        id: '00000000-0000-0000-0000-000000000001',
        email: 'admin@rgukt.ac.in',
        password_hash: adminPassword,
        full_name: 'System Administrator',
        role: 'admin'
      },
      {
        id: '00000000-0000-0000-0000-000000000002',
        email: 'john.doe@example.com',
        password_hash: userPassword,
        full_name: 'John Doe',
        role: 'alumni'
      },
      {
        id: '00000000-0000-0000-0000-000000000003',
        email: 'jane.smith@example.com',
        password_hash: userPassword,
        full_name: 'Jane Smith',
        role: 'alumni'
      },
      {
        id: '00000000-0000-0000-0000-000000000004',
        email: 'student1@rgukt.ac.in',
        password_hash: userPassword,
        full_name: 'Raj Kumar',
        role: 'student'
      }
    ];

    for (const user of users) {
      await appPool.query(
        `INSERT INTO users (id, email, password_hash, full_name, status, email_verified) 
         VALUES ($1, $2, $3, $4, 'active', true)`,
        [user.id, user.email, user.password_hash, user.full_name]
      );

      await appPool.query(
        `INSERT INTO user_roles (user_id, role, is_primary) 
         VALUES ($1, $2, true)`,
        [user.id, user.role]
      );

      console.log(`✅ Created ${user.role}: ${user.email}`);
    }

    console.log('\n✅ Sample users created successfully\n');

    // Step 6: Insert sample profiles
    console.log('📝 Creating sample profiles...');
    
    // Alumni profiles
    await appPool.query(`
      INSERT INTO alumni_profiles (user_id, batch_year, branch, graduation_year, current_company, job_title, location, city, state, country, is_mentor, skills) VALUES
      ('00000000-0000-0000-0000-000000000002', 2020, 'Computer Science & Engineering', 2024, 'Google', 'Software Engineer', 'Bangalore, Karnataka, India', 'Bangalore', 'Karnataka', 'India', true, ARRAY['JavaScript', 'React', 'Node.js', 'Python']),
      ('00000000-0000-0000-0000-000000000003', 2019, 'Electronics & Communication Engineering', 2023, 'Microsoft', 'Product Manager', 'Hyderabad, Telangana, India', 'Hyderabad', 'Telangana', 'India', true, ARRAY['Product Management', 'Agile', 'Data Analysis'])
    `);

    // Student profile
    await appPool.query(`
      INSERT INTO student_profiles (user_id, roll_number, student_id, branch, current_year, batch_year, graduation_year, cgpa, skills) VALUES
      ('00000000-0000-0000-0000-000000000004', 'R200001', 'STU2024001', 'Computer Science & Engineering', 3, 2021, 2025, 8.5, ARRAY['Java', 'Python', 'C++', 'Data Structures'])
    `);

    console.log('✅ Sample profiles created successfully\n');

    // Step 7: Verify setup
    console.log('🔍 Verifying database setup...');
    const userCount = await appPool.query('SELECT COUNT(*) FROM users');
    const rolesCount = await appPool.query('SELECT COUNT(*) FROM user_roles');
    const alumniCount = await appPool.query('SELECT COUNT(*) FROM alumni_profiles');
    const studentCount = await appPool.query('SELECT COUNT(*) FROM student_profiles');

    console.log(`✅ Users created: ${userCount.rows[0].count}`);
    console.log(`✅ Roles assigned: ${rolesCount.rows[0].count}`);
    console.log(`✅ Alumni profiles: ${alumniCount.rows[0].count}`);
    console.log(`✅ Student profiles: ${studentCount.rows[0].count}\n`);

    // Display login credentials
    console.log('═══════════════════════════════════════════════════════');
    console.log('🎉 DATABASE SETUP COMPLETED SUCCESSFULLY! 🎉');
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📝 Sample Login Credentials:\n');
    console.log('1. ADMIN:');
    console.log('   Email: admin@rgukt.ac.in');
    console.log('   Password: admin123\n');
    console.log('2. ALUMNI (John Doe):');
    console.log('   Email: john.doe@example.com');
    console.log('   Password: user123\n');
    console.log('3. ALUMNI (Jane Smith):');
    console.log('   Email: jane.smith@example.com');
    console.log('   Password: user123\n');
    console.log('4. STUDENT (Raj Kumar):');
    console.log('   Email: student1@rgukt.ac.in');
    console.log('   Password: user123\n');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📌 Next Steps:');
    console.log('   1. Start the backend: npm run server');
    console.log('   2. Start the frontend: npm run dev');
    console.log('   3. Test login with any of the above credentials');
    console.log('═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error during database setup:', error);
    process.exit(1);
  } finally {
    await adminPool.end();
    await appPool.end();
  }
}

// Run the setup
setupDatabase();
