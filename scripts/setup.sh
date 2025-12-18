#!/bin/bash

# RGUKT Connect Hub Setup Script
echo "🎓 Setting up RGUKT R.K. Valley Alumni Management Portal..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your Supabase credentials:"
    echo "   - VITE_SUPABASE_URL"
    echo "   - VITE_SUPABASE_PUBLISHABLE_KEY"
else
    echo "✅ Environment file already exists"
fi

echo ""
echo "🚀 Setup complete! Next steps:"
echo ""
echo "1. Configure your .env file with Supabase credentials"
echo "2. Run the database migrations in your Supabase project"
echo "3. Start the development server with: npm run dev"
echo ""
echo "📚 Check README.md for detailed instructions"
echo ""
echo "Happy coding! 🎉"
