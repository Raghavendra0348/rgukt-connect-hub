#!/bin/bash

# ==============================================
# RGUKT Alumni Portal - GitHub Deployment Setup
# ==============================================

echo "🚀 RGUKT Alumni Portal - GitHub Deployment Setup"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check if git is installed
echo "📋 Step 1: Checking prerequisites..."
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed. Please install Git first.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Git is installed${NC}"

# Step 2: Check if we're in a git repository
if [ -d .git ]; then
    echo -e "${YELLOW}⚠️  Git repository already exists${NC}"
    read -p "Do you want to continue? (y/n): " continue_setup
    if [ "$continue_setup" != "y" ]; then
        echo "Setup cancelled."
        exit 0
    fi
else
    echo "Initializing Git repository..."
    git init
    echo -e "${GREEN}✅ Git repository initialized${NC}"
fi

# Step 3: Get GitHub username and repository name
echo ""
echo "📝 Step 2: Repository Information"
echo "=================================="
read -p "Enter your GitHub username: " github_username
read -p "Enter repository name (default: rgukt-alumni-portal): " repo_name
repo_name=${repo_name:-rgukt-alumni-portal}

# Step 4: Configure git user if not already configured
if [ -z "$(git config user.name)" ]; then
    read -p "Enter your Git name: " git_name
    git config user.name "$git_name"
fi

if [ -z "$(git config user.email)" ]; then
    read -p "Enter your Git email: " git_email
    git config user.email "$git_email"
fi

# Step 5: Generate JWT secret
echo ""
echo "🔐 Step 3: Generating JWT Secret"
echo "================================="
jwt_secret=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" 2>/dev/null)
if [ -z "$jwt_secret" ]; then
    jwt_secret="CHANGE_THIS_TO_A_STRONG_RANDOM_SECRET_MIN_32_CHARS"
fi
echo "Your JWT Secret: $jwt_secret"
echo -e "${YELLOW}⚠️  Save this secret! You'll need it for deployment.${NC}"

# Step 6: Create production env template
echo ""
echo "📄 Step 4: Creating environment template"
echo "========================================="
if [ ! -f .env.production.example ]; then
    cat > .env.production.example << EOF
# Production Environment Variables
DATABASE_URL=postgresql://user:password@host:5432/rgukt_alumni_portal
JWT_SECRET=$jwt_secret
NODE_ENV=production
PORT=3001
VITE_API_URL=https://your-backend-url.com/api
FRONTEND_URL=https://your-frontend-url.com
EOF
    echo -e "${GREEN}✅ Created .env.production.example${NC}"
fi

# Step 7: Check .gitignore
echo ""
echo "🔍 Step 5: Verifying .gitignore"
echo "================================"
if [ ! -f .gitignore ]; then
    echo ".env" > .gitignore
    echo ".env.local" >> .gitignore
    echo ".env.production" >> .gitignore
    echo "node_modules/" >> .gitignore
    echo "dist/" >> .gitignore
    echo "*.log" >> .gitignore
fi
echo -e "${GREEN}✅ .gitignore verified${NC}"

# Step 8: Add files to git
echo ""
echo "📦 Step 6: Adding files to Git"
echo "==============================="
git add .
echo -e "${GREEN}✅ Files added${NC}"

# Step 9: Create initial commit
echo ""
echo "💾 Step 7: Creating initial commit"
echo "==================================="
if git diff --cached --quiet; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
else
    git commit -m "Initial commit: RGUKT Alumni Portal - Complete Setup

- Full-stack application with React + Express + PostgreSQL
- JWT authentication with bcrypt password hashing
- Complete database schema with all tables and relationships
- Production-ready with security features
- Comprehensive documentation and setup guides"
    echo -e "${GREEN}✅ Initial commit created${NC}"
fi

# Step 10: Set up remote
echo ""
echo "🔗 Step 8: Setting up GitHub remote"
echo "===================================="
remote_url="https://github.com/$github_username/$repo_name.git"
echo "Remote URL: $remote_url"

if git remote | grep -q "origin"; then
    echo -e "${YELLOW}⚠️  Remote 'origin' already exists${NC}"
    current_remote=$(git remote get-url origin)
    echo "Current remote: $current_remote"
    read -p "Do you want to update it to $remote_url? (y/n): " update_remote
    if [ "$update_remote" = "y" ]; then
        git remote set-url origin "$remote_url"
        echo -e "${GREEN}✅ Remote updated${NC}"
    fi
else
    git remote add origin "$remote_url"
    echo -e "${GREEN}✅ Remote added${NC}"
fi

# Step 11: Rename branch to main
echo ""
echo "🌿 Step 9: Setting up main branch"
echo "=================================="
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    git branch -M main
    echo -e "${GREEN}✅ Branch renamed to 'main'${NC}"
else
    echo -e "${GREEN}✅ Already on 'main' branch${NC}"
fi

# Step 12: Display instructions
echo ""
echo "═══════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Create a GitHub repository:"
echo "   • Go to https://github.com/new"
echo "   • Repository name: $repo_name"
echo "   • Keep it Private (recommended)"
echo "   • DON'T initialize with README"
echo "   • Click 'Create repository'"
echo ""
echo "2. Push your code to GitHub:"
echo -e "   ${YELLOW}git push -u origin main${NC}"
echo ""
echo "3. Deploy your application:"
echo "   • Read DEPLOYMENT_GUIDE.md for detailed instructions"
echo "   • Recommended: Vercel (Frontend) + Render (Backend + DB)"
echo ""
echo "4. Set environment variables on your hosting platform:"
echo "   • Use .env.production.example as a template"
echo "   • Your JWT Secret: $jwt_secret"
echo ""
echo "═══════════════════════════════════════════════════════"
echo ""
echo "📚 Documentation:"
echo "   • Quick Start: QUICK_START.md"
echo "   • Setup Guide: SETUP_GUIDE.md"
echo "   • Deployment: DEPLOYMENT_GUIDE.md"
echo "   • Summary: COMPLETION_SUMMARY.md"
echo ""
echo "═══════════════════════════════════════════════════════"
echo ""

# Ask if user wants to push now
read -p "Do you want to push to GitHub now? (y/n): " push_now
if [ "$push_now" = "y" ]; then
    echo ""
    echo "Pushing to GitHub..."
    if git push -u origin main; then
        echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
        echo ""
        echo "🎉 Your code is now on GitHub!"
        echo "View it at: https://github.com/$github_username/$repo_name"
    else
        echo -e "${RED}❌ Push failed. Make sure you've created the repository on GitHub first.${NC}"
        echo "   Visit: https://github.com/new"
    fi
else
    echo ""
    echo "To push later, run:"
    echo -e "   ${YELLOW}git push -u origin main${NC}"
fi

echo ""
echo "🎉 Setup complete! Good luck with your deployment!"
