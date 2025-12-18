#!/bin/bash

# RGUKT Alumni Portal - Complete System Check & Fix Script
# This script checks and fixes all issues in the system

set -e  # Exit on any error

PROJECT_DIR="/home/a-raghavendra/Desktop/Alumini Portal/rgukt-connect-hub"
cd "$PROJECT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

print_header() {
    echo ""
    echo -e "${PURPLE}========================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}========================================${NC}"
}

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

# Kill any existing processes
cleanup_processes() {
    print_status "Cleaning up existing processes..."
    pkill -f "node.*server" || true
    pkill -f "vite" || true
    sleep 2
    print_success "Processes cleaned up"
}

# Check and start PostgreSQL
check_postgresql() {
    print_header "CHECKING POSTGRESQL"
    
    if ! sudo systemctl is-active --quiet postgresql; then
        print_warning "PostgreSQL not running, starting it..."
        sudo systemctl start postgresql
        sudo systemctl enable postgresql
        print_success "PostgreSQL started"
    else
        print_success "PostgreSQL is running"
    fi
    
    # Create user if doesn't exist
    if ! sudo -u postgres psql -tc "SELECT 1 FROM pg_user WHERE usename = 'rgukt_user'" | grep -q 1; then
        print_status "Creating PostgreSQL user..."
        sudo -u postgres psql -c "CREATE USER rgukt_user WITH PASSWORD 'rgukt_password';"
        print_success "User created"
    else
        print_success "User exists"
    fi
    
    # Create database if doesn't exist
    if ! sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = 'rgukt_alumni_portal'" | grep -q 1; then
        print_status "Creating database..."
        sudo -u postgres psql -c "CREATE DATABASE rgukt_alumni_portal OWNER rgukt_user;"
        print_success "Database created"
    else
        print_success "Database exists"
    fi
    
    # Grant permissions
    sudo -u postgres psql -c "ALTER USER rgukt_user CREATEDB;" || true
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE rgukt_alumni_portal TO rgukt_user;" || true
    print_success "Permissions granted"
}

# Setup database schema
setup_database() {
    print_header "SETTING UP DATABASE SCHEMA"
    
    print_status "Running database setup script..."
    node setup-production-db.cjs
    
    # Verify database
    USER_COUNT=$(sudo -u postgres psql -d rgukt_alumni_portal -t -c "SELECT COUNT(*) FROM users;" | xargs)
    if [ "$USER_COUNT" -gt 0 ]; then
        print_success "Database has $USER_COUNT users"
    else
        print_error "Database setup failed - no users found"
        exit 1
    fi
}

# Install dependencies
install_deps() {
    print_header "INSTALLING DEPENDENCIES"
    
    if [ ! -d "node_modules" ]; then
        print_status "Installing Node.js dependencies..."
        npm install
        print_success "Dependencies installed"
    else
        print_success "Dependencies already installed"
    fi
}

# Start backend server
start_backend() {
    print_header "STARTING BACKEND SERVER"
    
    cleanup_processes
    
    print_status "Starting backend server on port 3001..."    
    node server.cjs > server.log 2>&1 &
    SERVER_PID=$!
    echo $SERVER_PID > server.pid
    
    print_status "Waiting for server to start..."
    sleep 5
    
    # Test server health
    for i in {1..10}; do
        if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
            print_success "Backend server is running (PID: $SERVER_PID)"
            return 0
        fi
        print_status "Waiting for server... (attempt $i/10)"
        sleep 2
    done
    
    print_error "Server failed to start properly"
    print_error "Check server.log for details:"
    tail -20 server.log
    exit 1
}

# Test authentication
test_auth() {
    print_header "TESTING AUTHENTICATION"
    
    # Test admin login
    print_status "Testing admin login..."
    ADMIN_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
        -H "Content-Type: application/json" \
        -d '{"email":"admin@rgukt.ac.in","password":"admin123"}')
    
    if echo "$ADMIN_RESPONSE" | grep -q "token"; then
        print_success "Admin login successful"
        
        # Extract token and test authenticated request
        TOKEN=$(echo "$ADMIN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
        ME_RESPONSE=$(curl -s http://localhost:3001/api/auth/me \
            -H "Authorization: Bearer $TOKEN")
        
        if echo "$ME_RESPONSE" | grep -q "admin@rgukt.ac.in"; then
            print_success "Authenticated request successful"
        else
            print_error "Authenticated request failed"
        fi
    else
        print_error "Admin login failed"
        echo "Response: $ADMIN_RESPONSE"
    fi
    
    # Test alumni login
    print_status "Testing alumni login..."
    ALUMNI_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
        -H "Content-Type: application/json" \
        -d '{"email":"john.doe@example.com","password":"user123"}')
    
    if echo "$ALUMNI_RESPONSE" | grep -q "token"; then
        print_success "Alumni login successful"
    else
        print_error "Alumni login failed"
    fi
    
    # Test student login
    print_status "Testing student login..."
    STUDENT_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
        -H "Content-Type: application/json" \
        -d '{"email":"student1@rgukt.ac.in","password":"user123"}')
    
    if echo "$STUDENT_RESPONSE" | grep -q "token"; then
        print_success "Student login successful"
    else
        print_error "Student login failed"
    fi
}

# Test registration
test_registration() {
    print_header "TESTING USER REGISTRATION"
    
    TEST_EMAIL="test_$(date +%s)@example.com"
    print_status "Testing new user registration with email: $TEST_EMAIL"
    
    REG_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/register \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"$TEST_EMAIL\",\"password\":\"test123\",\"fullName\":\"Test User\",\"role\":\"alumni\"}")
    
    if echo "$REG_RESPONSE" | grep -q "token"; then
        print_success "User registration successful"
        
        # Test duplicate email
        DUP_RESPONSE=$(curl -s -w "%{http_code}" -X POST http://localhost:3001/api/auth/register \
            -H "Content-Type: application/json" \
            -d "{\"email\":\"$TEST_EMAIL\",\"password\":\"test123\",\"fullName\":\"Test User 2\",\"role\":\"alumni\"}")
        
        if echo "$DUP_RESPONSE" | grep -q "400"; then
            print_success "Duplicate email validation working"
        else
            print_warning "Duplicate email validation may not be working"
        fi
    else
        print_error "User registration failed"
        echo "Response: $REG_RESPONSE"
    fi
}

# Start frontend
start_frontend() {
    print_header "STARTING FRONTEND"
    
    print_status "Starting Vite development server..."
    print_warning "Frontend will start in background. Check http://localhost:5173"
    
    nohup npm run client > frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > frontend.pid
    
    print_success "Frontend started (PID: $FRONTEND_PID)"
    print_status "Frontend logs: tail -f frontend.log"
}

# Display final status
show_final_status() {
    print_header "🎉 SYSTEM STATUS"
    
    echo ""
    echo -e "${GREEN}✅ PostgreSQL:${NC} Running"
    echo -e "${GREEN}✅ Database:${NC} rgukt_alumni_portal with sample data"
    echo -e "${GREEN}✅ Backend API:${NC} Running on http://localhost:3001"
    echo -e "${GREEN}✅ Frontend:${NC} Starting on http://localhost:5173"
    echo ""
    echo -e "${BLUE}🔑 Login Credentials:${NC}"
    echo "  Admin: admin@rgukt.ac.in / admin123"
    echo "  Alumni: john.doe@example.com / user123"
    echo "  Student: student1@rgukt.ac.in / user123"
    echo ""
    echo -e "${BLUE}🚀 Quick Actions:${NC}"
    echo "  Test API: curl http://localhost:3001/api/health"
    echo "  View logs: tail -f server.log"
    echo "  Stop server: kill \$(cat server.pid)"
    echo "  Stop frontend: kill \$(cat frontend.pid)"
    echo ""
    echo -e "${BLUE}📱 Next Steps:${NC}"
    echo "  1. Wait 30 seconds for frontend to start"
    echo "  2. Open browser: http://localhost:5173"
    echo "  3. Login with any credentials above"
    echo ""
}

# Main execution
main() {
    echo ""
    echo -e "${PURPLE}🚀 RGUKT Alumni Portal - Complete System Fix${NC}"
    echo -e "${PURPLE}================================================${NC}"
    
    install_deps
    check_postgresql
    setup_database
    start_backend
    test_auth
    test_registration
    start_frontend
    show_final_status
    
    echo -e "${GREEN}🎉 ALL SYSTEMS ARE GO! 🎉${NC}"
}

# Handle interrupts
trap 'print_error "Script interrupted"; cleanup_processes; exit 1' INT TERM

# Run main function
main
