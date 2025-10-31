# 🚀 RGUKT Alumni Portal - Complete Deployment Guide

This guide covers deploying the complete RGUKT Alumni Portal (Frontend, Backend, and Database) using GitHub and various cloud platforms.

---

## 📋 Table of Contents

1. [Deployment Architecture](#deployment-architecture)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [GitHub Setup](#github-setup)
4. [Deployment Options](#deployment-options)
   - [Option 1: Vercel (Frontend) + Render (Backend + DB)](#option-1-vercel--render-recommended)
   - [Option 2: Railway (All-in-One)](#option-2-railway-all-in-one)
   - [Option 3: AWS (Advanced)](#option-3-aws-advanced)
   - [Option 4: DigitalOcean](#option-4-digitalocean)
5. [Post-Deployment Steps](#post-deployment-steps)
6. [Troubleshooting](#troubleshooting)

---

## 🏗️ Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Repository                     │
│                  (Source Code Control)                   │
└──────────────┬──────────────────────────┬────────────────┘
               │                          │
               ▼                          ▼
    ┌──────────────────┐      ┌──────────────────────┐
    │    FRONTEND      │      │      BACKEND         │
    │   (React/Vite)   │◄────►│   (Express.js)       │
    │                  │      │                      │
    │  Vercel/Netlify  │      │  Render/Railway/AWS  │
    └──────────────────┘      └──────────┬───────────┘
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │     DATABASE         │
                              │    (PostgreSQL)      │
                              │                      │
                              │ Render/Railway/AWS   │
                              └──────────────────────┘
```

---

## ✅ Pre-Deployment Checklist

### 1. Update Environment Variables

Create a `.env.production` file (don't commit this!):

```bash
# PostgreSQL Database (will be provided by hosting service)
DATABASE_URL=postgresql://user:password@host:port/database
DB_HOST=your-db-host.com
DB_PORT=5432
DB_NAME=rgukt_alumni_portal
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration (MUST CHANGE IN PRODUCTION!)
JWT_SECRET=your-super-secure-random-jwt-secret-min-32-chars
JWT_EXPIRES_IN=7d

# Application Configuration
NODE_ENV=production
PORT=3001

# API Configuration (will be your backend URL)
VITE_API_URL=https://your-backend-url.com/api

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-url.com
```

### 2. Update CORS Configuration

Edit `server.cjs`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### 3. Add `.gitignore` entries

Make sure these are in your `.gitignore`:

```
node_modules/
.env
.env.local
.env.production
dist/
build/
*.log
server.pid
.DS_Store
```

### 4. Create Build Scripts

Update `package.json`:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "client": "vite",
    "server": "node server.cjs",
    "build": "vite build",
    "preview": "vite preview",
    "start": "node server.cjs",
    "postinstall": "npm run build"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

---

## 🔧 GitHub Setup

### Step 1: Initialize Git Repository

```bash
cd "/home/a-raghavendra/Desktop/Alumini Portal/rgukt-connect-hub"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - RGUKT Alumni Portal"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com
2. Click "New Repository"
3. Name it: `rgukt-alumni-portal`
4. Keep it **Private** (recommended for initial deployment)
5. Don't initialize with README (we already have one)
6. Click "Create Repository"

### Step 3: Push to GitHub

```bash
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/rgukt-alumni-portal.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Verify Upload

Visit your repository at: `https://github.com/YOUR_USERNAME/rgukt-alumni-portal`

---

## 🌐 Deployment Options

---

## Option 1: Vercel + Render (⭐ Recommended)

**Best for:** Easy setup, free tier available, great for React apps

### A. Deploy Database (Render PostgreSQL)

1. **Go to https://render.com**
2. Sign up/Login with GitHub
3. Click "New +" → "PostgreSQL"
4. Configure:
   - Name: `rgukt-alumni-db`
   - Database: `rgukt_alumni_portal`
   - User: `rgukt_user`
   - Region: Choose closest to you
   - Plan: Free (or paid for production)
5. Click "Create Database"
6. **Copy credentials** (you'll need these):
   - Internal Database URL
   - External Database URL
   - Host, Port, Database, User, Password

7. **Initialize Database:**
   - Go to Shell tab in Render dashboard
   - Run these commands:

   ```bash
   # Download schema (you'll need to upload it first)
   psql $DATABASE_URL -f database-schema-production.sql
   ```

   Or manually connect:
   ```bash
   PGPASSWORD=your_password psql -h your_host -U rgukt_user -d rgukt_alumni_portal
   ```

   Then paste the contents of `database-schema-production.sql`

### B. Deploy Backend (Render Web Service)

1. In Render dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** `rgukt-alumni-backend`
   - **Root Directory:** (leave empty)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.cjs`
   - **Plan:** Free (or paid for production)

4. **Add Environment Variables:**
   ```
   DATABASE_URL=<from Render PostgreSQL Internal URL>
   DB_HOST=<from Render PostgreSQL>
   DB_PORT=5432
   DB_NAME=rgukt_alumni_portal
   DB_USER=rgukt_user
   DB_PASSWORD=<from Render PostgreSQL>
   JWT_SECRET=<generate a strong random secret>
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=<will add after deploying frontend>
   ```

5. Click "Create Web Service"
6. Wait for deployment (5-10 minutes)
7. **Copy your backend URL:** `https://rgukt-alumni-backend.onrender.com`

### C. Deploy Frontend (Vercel)

1. **Go to https://vercel.com**
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository: `rgukt-alumni-portal`
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** (leave empty)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

6. **Add Environment Variables:**
   ```
   VITE_API_URL=https://rgukt-alumni-backend.onrender.com/api
   ```

7. Click "Deploy"
8. Wait for deployment (2-5 minutes)
9. **Copy your frontend URL:** `https://rgukt-alumni-portal.vercel.app`

### D. Update Backend CORS

1. Go back to Render backend
2. Add environment variable:
   ```
   FRONTEND_URL=https://rgukt-alumni-portal.vercel.app
   ```
3. Trigger redeploy

### E. Initialize Database with Sample Data

Run this from your local machine (or use Render Shell):

```bash
# Connect to production database
PGPASSWORD=your_password psql -h your_host -U rgukt_user -d rgukt_alumni_portal

# Or use the DATABASE_URL
psql postgresql://user:pass@host:5432/rgukt_alumni_portal
```

Then run the setup script with production credentials:

```bash
# Update setup script with production DB credentials
DATABASE_URL=postgresql://... node setup-production-db.cjs
```

---

## Option 2: Railway (All-in-One)

**Best for:** Simple all-in-one deployment

### Step 1: Deploy to Railway

1. **Go to https://railway.app**
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository

### Step 2: Add PostgreSQL

1. In your project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create a database
4. Note the `DATABASE_URL` provided

### Step 3: Configure Backend Service

1. Click on your service
2. Go to "Variables" tab
3. Add:
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=your-strong-secret-key
   NODE_ENV=production
   PORT=3001
   ```

4. Go to "Settings" tab
5. Set:
   - **Start Command:** `node server.cjs`
   - **Root Directory:** (leave empty)

### Step 4: Configure Frontend

Railway can deploy both frontend and backend from the same repo:

1. Add a new service for frontend
2. Set build command: `npm run build`
3. Set start command: `npm run preview`
4. Add variable: `VITE_API_URL=<your backend URL>`

### Step 5: Get URLs

- Backend: `https://rgukt-alumni-backend.railway.app`
- Frontend: `https://rgukt-alumni-portal.railway.app`

---

## Option 3: AWS (Advanced)

**Best for:** Full control, scalability, enterprise use

### Architecture:
- **Frontend:** AWS S3 + CloudFront (or Amplify)
- **Backend:** AWS Elastic Beanstalk (or EC2)
- **Database:** AWS RDS PostgreSQL

### Quick Steps:

1. **Database (RDS):**
   - Create RDS PostgreSQL instance
   - Note connection details
   - Configure security groups
   - Initialize with schema

2. **Backend (Elastic Beanstalk):**
   - Create new application
   - Upload code (zip file)
   - Configure environment variables
   - Set up load balancer

3. **Frontend (S3 + CloudFront):**
   - Create S3 bucket
   - Build frontend: `npm run build`
   - Upload `dist/` folder to S3
   - Set up CloudFront distribution
   - Configure custom domain (optional)

### Detailed AWS Guide:
[AWS Deployment Guide](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-nodejs.html)

---

## Option 4: DigitalOcean

**Best for:** VPS control, moderate complexity

### Step 1: Create Droplet

1. Go to https://www.digitalocean.com
2. Create Ubuntu 22.04 Droplet
3. Choose size (minimum 2GB RAM recommended)
4. SSH into droplet

### Step 2: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 3: Setup Database

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE rgukt_alumni_portal;
CREATE USER rgukt_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE rgukt_alumni_portal TO rgukt_user;
\q

# Import schema
sudo -u postgres psql rgukt_alumni_portal < database-schema-production.sql
```

### Step 4: Deploy Application

```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/rgukt-alumni-portal.git
cd rgukt-alumni-portal

# Install dependencies
sudo npm install

# Create .env file
sudo nano .env
# (Add your production environment variables)

# Build frontend
sudo npm run build

# Start backend with PM2
sudo pm2 start server.cjs --name rgukt-backend
sudo pm2 save
sudo pm2 startup
```

### Step 5: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/rgukt-alumni
```

Add:

```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/rgukt-alumni-portal/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/rgukt-alumni /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Setup SSL (Optional but Recommended)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

---

## 📝 Post-Deployment Steps

### 1. Initialize Database with Admin User

Connect to your production database and run:

```sql
-- Insert admin user (password: admin123)
INSERT INTO users (id, email, password_hash, full_name, status, email_verified) 
VALUES (
  gen_random_uuid(), 
  'admin@rgukt.ac.in', 
  '$2b$10$YourHashedPasswordHere',
  'System Administrator', 
  'active', 
  true
);

-- Assign admin role
INSERT INTO user_roles (user_id, role, is_primary) 
SELECT id, 'admin', true FROM users WHERE email = 'admin@rgukt.ac.in';
```

Or run the setup script with production credentials.

### 2. Test Deployment

```bash
# Test backend health
curl https://your-backend-url.com/api/health

# Test login
curl -X POST https://your-backend-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rgukt.ac.in","password":"admin123"}'
```

### 3. Setup Custom Domain (Optional)

#### For Vercel:
1. Go to project settings → Domains
2. Add your custom domain
3. Configure DNS records as shown

#### For Render:
1. Go to service settings → Custom Domain
2. Add your domain
3. Update DNS CNAME record

### 4. Configure Environment Monitoring

**Recommended Tools:**
- **Error Tracking:** Sentry.io
- **Uptime Monitoring:** UptimeRobot
- **Log Management:** Logtail, Papertrail
- **Performance:** New Relic, DataDog

### 5. Setup Automated Backups

#### For Render:
- Enable automatic backups in PostgreSQL dashboard

#### For Railway:
- Backups included automatically

#### For DigitalOcean:
```bash
# Create backup script
sudo nano /usr/local/bin/backup-db.sh
```

Add:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/postgresql"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

sudo -u postgres pg_dump rgukt_alumni_portal > $BACKUP_DIR/backup_$TIMESTAMP.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-db.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-db.sh
```

---

## 🔐 Security Checklist

- [ ] Change `JWT_SECRET` to a strong random value (min 32 characters)
- [ ] Enable HTTPS/SSL on all endpoints
- [ ] Update CORS to only allow your frontend domain
- [ ] Change default admin password immediately
- [ ] Enable database connection encryption
- [ ] Set up firewall rules (only allow necessary ports)
- [ ] Enable rate limiting on API endpoints
- [ ] Set up security headers (already done with Helmet.js)
- [ ] Regular dependency updates (`npm audit fix`)
- [ ] Enable database backups
- [ ] Set up monitoring and alerts
- [ ] Review and rotate credentials regularly

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"

**Solution:**
- Check DATABASE_URL is correct
- Verify database is running
- Check firewall rules allow connections
- Verify SSL mode (may need `?sslmode=require`)

### Issue: "CORS error in browser"

**Solution:**
- Verify FRONTEND_URL in backend environment
- Check CORS configuration in server.cjs
- Ensure credentials: true is set
- Redeploy backend after changes

### Issue: "502 Bad Gateway"

**Solution:**
- Check backend server is running
- Verify PORT environment variable
- Check backend logs for errors
- Restart the service

### Issue: "Build failed"

**Solution:**
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: "Database schema not created"

**Solution:**
- Manually run `database-schema-production.sql`
- Or use the setup script with production DB credentials
- Check database user has CREATE privileges

---

## 📊 Deployment Comparison

| Platform      | Cost    | Ease | Performance | Control | Database | SSL  |
|---------------|---------|------|-------------|---------|----------|------|
| Vercel+Render | Free/$ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Included | Auto |
| Railway       | Free/$$ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Included | Auto |
| AWS           | $$$ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | RDS | Manual |
| DigitalOcean  | $$ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Manual | Manual |

---

## 🎯 Recommended Deployment for Different Scenarios

### For Learning/Testing:
→ **Vercel + Render Free Tier**

### For Small Production:
→ **Railway or Render Paid**

### For Medium/Large Production:
→ **AWS or DigitalOcean**

### For Enterprise:
→ **AWS with full infrastructure**

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## ✅ Deployment Success Checklist

- [ ] GitHub repository created and pushed
- [ ] Database deployed and initialized
- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] SSL/HTTPS enabled
- [ ] Admin user created
- [ ] Login tested and working
- [ ] Registration tested and working
- [ ] Custom domain configured (if applicable)
- [ ] Backups configured
- [ ] Monitoring set up

---

## 🆘 Need Help?

If you encounter issues during deployment:

1. Check the logs in your hosting platform
2. Verify all environment variables are set correctly
3. Test database connectivity
4. Check CORS configuration
5. Review the troubleshooting section above

---

**Status**: Ready for Deployment  
**Last Updated**: November 1, 2025  
**Version**: 1.0.0

🎉 **Your RGUKT Alumni Portal is ready to go live!**
