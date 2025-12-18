#!/bin/bash

# RGUKT Alumni Portal - Complete System Fix and Setup Script
# This script fixes all issues and sets up the entire system

set -e  # Exit on any error

PROJECT_DIR="/home/a-raghavendra/Desktop/Alumini Portal/rgukt-connect-hub"
cd "$PROJECT_DIR"

echo "🚀 RGUKT Alumni Portal - Complete System Setup & Fix"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Install dependencies
print_status "Installing Node.js dependencies..."
npm install
print_success "Dependencies installed"

# Step 2: Check and start PostgreSQL
print_status "Checking PostgreSQL service..."
if ! sudo systemctl is-active --quiet postgresql; then
    print_warning "PostgreSQL not running, starting it..."
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    print_success "PostgreSQL started"
else
    print_success "PostgreSQL is already running"
fi

# Step 3: Create PostgreSQL user and database
print_status "Setting up PostgreSQL user and database..."

# Create user if doesn't exist
sudo -u postgres psql -tc "SELECT 1 FROM pg_user WHERE usename = 'rgukt_user'" | grep -q 1 || \
sudo -u postgres psql -c "CREATE USER rgukt_user WITH PASSWORD 'rgukt_password';"

# Create database if doesn't exist
sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = 'rgukt_alumni_portal'" | grep -q 1 || \
sudo -u postgres psql -c "CREATE DATABASE rgukt_alumni_portal OWNER rgukt_user;"

# Grant permissions
sudo -u postgres psql -c "ALTER USER rgukt_user CREATEDB;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE rgukt_alumni_portal TO rgukt_user;"

print_success "Database and user configured"

# Step 4: Setup database schema
print_status "Setting up database schema and sample data..."
node setup-production-db.cjs
print_success "Database schema and sample data created"

# Step 5: Test database connection
print_status "Testing database connection..."
PGPASSWORD=rgukt_password psql -U rgukt_user -d rgukt_alumni_portal -c "SELECT COUNT(*) as user_count FROM users;" || {
    print_error "Database connection test failed"
    exit 1
}
print_success "Database connection test passed"

# Step 6: Kill any existing server processes
print_status "Stopping any existing server processes..."
pkill -f "node.*server" || true
sleep 2
print_success "Existing processes stopped"

# Step 7: Start backend server
print_status "Starting backend server..."
node server.cjs > server.log 2>&1 &
SERVER_PID=$!
echo $SERVER_PID > server.pid
sleep 3

# Test server
if curl -s http://localhost:3001/api/health > /dev/null; then
    print_success "Backend server started successfully on port 3001"
else
    print_error "Backend server failed to start"
    exit 1
fi

# Step 8: Run system tests
print_status "Running system tests..."
node test-system.cjs
print_success "All system tests passed"

# Step 9: Display final status
echo ""
echo "=============================================="
echo -e "${GREEN}🎉 SYSTEM SETUP COMPLETED SUCCESSFULLY! 🎉${NC}"
echo "=============================================="
echo ""
echo "📊 System Status:"
echo "  ✅ PostgreSQL: Running"
echo "  ✅ Database: rgukt_alumni_portal (4 users created)"
echo "  ✅ Backend API: Running on http://localhost:3001"
echo "  ✅ All Tests: Passing"
echo ""
echo "🔑 Login Credentials:"
echo "  Admin: admin@rgukt.ac.in / admin123"
echo "  Alumni: john.doe@example.com / user123"
echo "  Student: student1@rgukt.ac.in / user123"
echo ""
echo "🚀 Next Steps:"
echo "  1. Start frontend: npm run dev"
echo "  2. Open browser: http://localhost:5173"
echo "  3. Login with any credentials above"
echo ""
echo "📝 Logs:"
echo "  Server log: server.log"
echo "  Server PID: server.pid"
echo ""
echo "🛠️  Troubleshooting:"
echo "  • Server status: curl http://localhost:3001/api/health"
echo "  • View logs: tail -f server.log"
echo "  • Stop server: kill \$(cat server.pid)"
echo ""
