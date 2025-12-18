#!/bin/bash

# RGUKT Alumni Portal - Project Launcher
# This script starts both backend and frontend

clear
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║        🎓 RGUKT Alumni Portal - Starting Project 🚀          ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

PROJECT_DIR="/home/a-raghavendra/Desktop/Alumini Portal/rgukt-connect-hub"
cd "$PROJECT_DIR"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Step 1: Check PostgreSQL
echo -e "${BLUE}[1/4]${NC} Checking PostgreSQL..."
if pgrep -x "postgres" > /dev/null; then
    echo -e "${GREEN}✅ PostgreSQL is running${NC}"
else
    echo -e "${YELLOW}⚠️  Starting PostgreSQL...${NC}"
    sudo systemctl start postgresql
fi
echo ""

# Step 2: Setup Database
echo -e "${BLUE}[2/4]${NC} Verifying database setup..."
USER_COUNT=$(sudo -u postgres psql -d rgukt_alumni_portal -t -c "SELECT COUNT(*) FROM users;" 2>/dev/null | xargs)
if [ "$USER_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ Database ready with $USER_COUNT users${NC}"
else
    echo -e "${YELLOW}⚠️  Setting up database...${NC}"
    node setup-production-db.cjs
fi
echo ""

# Step 3: Start Backend
echo -e "${BLUE}[3/4]${NC} Starting Backend Server..."
pkill -f "node.*server-fixed" 2>/dev/null
node server-fixed.cjs > server.log 2>&1 &
SERVER_PID=$!
echo $SERVER_PID > server.pid
sleep 3

# Test backend
HEALTH=$(curl -s http://localhost:3001/api/health 2>/dev/null | grep -o '"status":"OK"')
if [ -n "$HEALTH" ]; then
    echo -e "${GREEN}✅ Backend running on http://localhost:3001${NC}"
    echo -e "   PID: $SERVER_PID"
else
    echo -e "${RED}❌ Backend failed to start${NC}"
    tail -10 server.log
    exit 1
fi
echo ""

# Step 4: Start Frontend
echo -e "${BLUE}[4/4]${NC} Starting Frontend..."
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > frontend.pid
sleep 5

echo -e "${GREEN}✅ Frontend starting (PID: $FRONTEND_PID)${NC}"
echo ""

# Final Status
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║                    🎉 PROJECT IS RUNNING! 🎉                  ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}📊 System Status:${NC}"
echo "   ✅ PostgreSQL: Running"
echo "   ✅ Database: $USER_COUNT users"
echo "   ✅ Backend API: http://localhost:3001"
echo "   ✅ Frontend: http://localhost:5173 (or http://localhost:8081)"
echo ""
echo -e "${BLUE}🔑 Login Credentials:${NC}"
echo "   Admin:   admin@rgukt.ac.in / admin123"
echo "   Alumni:  john.doe@example.com / user123"
echo "   Student: student1@rgukt.ac.in / user123"
echo ""
echo -e "${BLUE}📝 Logs:${NC}"
echo "   Backend:  tail -f server.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo -e "${BLUE}🛑 Stop Services:${NC}"
echo "   kill \$(cat server.pid) \$(cat frontend.pid)"
echo ""
echo -e "${GREEN}🌐 Open your browser to:${NC}"
echo -e "   ${YELLOW}http://localhost:5173${NC}"
echo ""
echo "Press Ctrl+C to view logs or close this terminal"
echo ""

# Keep script running and show logs
tail -f server.log frontend.log 2>/dev/null
