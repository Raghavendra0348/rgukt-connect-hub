#!/usr/bin/env node

/**
 * Complete System Test Script
 * Tests database, backend API, and all major functionality
 */

const http = require('http');
const https = require('https');

const API_BASE = 'http://localhost:3001/api';
let testsPassed = 0;
let testsFailed = 0;

// Helper function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, body: jsonBody, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, body, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test functions
async function testDatabaseConnection() {
  console.log('\n🔍 Testing Database Connection...');
  const { Pool } = require('pg');
  const pool = new Pool({
    user: 'rgukt_user',
    host: 'localhost',
    database: 'rgukt_alumni_portal',
    password: 'rgukt_password',
    port: 5432,
  });

  try {
    const result = await pool.query('SELECT COUNT(*) FROM users');
    console.log(`✅ Database connected! Users count: ${result.rows[0].count}`);
    testsPassed++;
    await pool.end();
    return true;
  } catch (error) {
    console.log(`❌ Database connection failed: ${error.message}`);
    testsFailed++;
    return false;
  }
}

async function testServerHealth() {
  console.log('\n🔍 Testing Server Health...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/health',
      method: 'GET',
    });

    if (response.status === 200) {
      console.log('✅ Server is healthy');
      testsPassed++;
      return true;
    } else {
      console.log(`❌ Server health check failed with status ${response.status}`);
      testsFailed++;
      return false;
    }
  } catch (error) {
    console.log(`❌ Server health check failed: ${error.message}`);
    testsFailed++;
    return false;
  }
}

async function testLogin(email, password, expectedRole) {
  console.log(`\n🔍 Testing Login: ${email}...`);
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, { email, password });

    if (response.status === 200 && response.body.token) {
      console.log(`✅ Login successful for ${email}`);
      console.log(`   Role: ${response.body.user.role}`);
      console.log(`   Token: ${response.body.token.substring(0, 20)}...`);
      testsPassed++;
      return response.body.token;
    } else {
      console.log(`❌ Login failed for ${email}: ${JSON.stringify(response.body)}`);
      testsFailed++;
      return null;
    }
  } catch (error) {
    console.log(`❌ Login failed for ${email}: ${error.message}`);
    testsFailed++;
    return null;
  }
}

async function testRegistration() {
  console.log('\n🔍 Testing User Registration...');
  const newUser = {
    email: `test.user.${Date.now()}@example.com`,
    password: 'test123456',
    fullName: 'Test User',
    role: 'alumni'
  };

  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, newUser);

    if (response.status === 201 && response.body.token) {
      console.log(`✅ Registration successful for ${newUser.email}`);
      console.log(`   User ID: ${response.body.user.id}`);
      console.log(`   Token received`);
      testsPassed++;
      return { success: true, user: response.body.user, token: response.body.token };
    } else {
      console.log(`❌ Registration failed: ${JSON.stringify(response.body)}`);
      testsFailed++;
      return { success: false };
    }
  } catch (error) {
    console.log(`❌ Registration failed: ${error.message}`);
    testsFailed++;
    return { success: false };
  }
}

async function testAuthenticatedRequest(token) {
  console.log('\n🔍 Testing Authenticated Request...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/auth/me',
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.status === 200 && response.body.user) {
      console.log(`✅ Authenticated request successful`);
      console.log(`   User: ${response.body.user.email}`);
      testsPassed++;
      return true;
    } else {
      console.log(`❌ Authenticated request failed: ${JSON.stringify(response.body)}`);
      testsFailed++;
      return false;
    }
  } catch (error) {
    console.log(`❌ Authenticated request failed: ${error.message}`);
    testsFailed++;
    return false;
  }
}

async function testDuplicateEmailValidation() {
  console.log('\n🔍 Testing Duplicate Email Validation...');
  const duplicateUser = {
    email: 'admin@rgukt.ac.in', // This already exists
    password: 'test123456',
    fullName: 'Duplicate User',
    role: 'alumni'
  };

  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, duplicateUser);

    if (response.status === 400 && response.body.error.includes('already exists')) {
      console.log(`✅ Duplicate email validation working correctly`);
      testsPassed++;
      return true;
    } else {
      console.log(`❌ Duplicate email validation failed: ${JSON.stringify(response.body)}`);
      testsFailed++;
      return false;
    }
  } catch (error) {
    console.log(`❌ Duplicate email validation test failed: ${error.message}`);
    testsFailed++;
    return false;
  }
}

async function testInvalidLoginCredentials() {
  console.log('\n🔍 Testing Invalid Login Credentials...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, { email: 'admin@rgukt.ac.in', password: 'wrongpassword' });

    if (response.status === 401) {
      console.log(`✅ Invalid credentials correctly rejected`);
      testsPassed++;
      return true;
    } else {
      console.log(`❌ Invalid credentials test failed: ${JSON.stringify(response.body)}`);
      testsFailed++;
      return false;
    }
  } catch (error) {
    console.log(`❌ Invalid credentials test failed: ${error.message}`);
    testsFailed++;
    return false;
  }
}

// Main test runner
async function runAllTests() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🧪 RGUKT Alumni Portal - Complete System Test');
  console.log('═══════════════════════════════════════════════════════');

  // Test 1: Database Connection
  await testDatabaseConnection();

  // Test 2: Server Health
  const serverHealthy = await testServerHealth();
  if (!serverHealthy) {
    console.log('\n❌ Server is not running. Please start it with: npm run server');
    console.log('   Then run this test again.');
    process.exit(1);
  }

  // Test 3: Login Tests
  const adminToken = await testLogin('admin@rgukt.ac.in', 'admin123', 'admin');
  await testLogin('john.doe@example.com', 'user123', 'alumni');
  await testLogin('student1@rgukt.ac.in', 'user123', 'student');

  // Test 4: Registration
  const registrationResult = await testRegistration();

  // Test 5: Authenticated Request
  if (adminToken) {
    await testAuthenticatedRequest(adminToken);
  }

  // Test 6: Edge Cases
  await testDuplicateEmailValidation();
  await testInvalidLoginCredentials();

  // Summary
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('📊 TEST SUMMARY');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`✅ Tests Passed: ${testsPassed}`);
  console.log(`❌ Tests Failed: ${testsFailed}`);
  console.log(`📈 Success Rate: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%`);
  console.log('═══════════════════════════════════════════════════════\n');

  if (testsFailed === 0) {
    console.log('🎉 ALL TESTS PASSED! System is working correctly.\n');
    console.log('Next steps:');
    console.log('  1. Start the frontend: npm run client');
    console.log('  2. Open browser: http://localhost:5173');
    console.log('  3. Try logging in with any of the test credentials\n');
  } else {
    console.log('⚠️  Some tests failed. Please check the errors above.\n');
    process.exit(1);
  }
}

// Run the tests
runAllTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
