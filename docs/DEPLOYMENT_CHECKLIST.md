# 🚀 Quick Deployment Checklist

Follow these steps to deploy your RGUKT Alumni Portal to the cloud.

---

## ☁️ Option 1: Vercel + Render (Easiest & Free) ⭐ RECOMMENDED

### 📦 Part A: Deploy Database (Render) - 5 minutes

1. **Go to** → https://render.com
2. **Sign up** with GitHub
3. **Click** "New +" → "PostgreSQL"
4. **Fill in:**
   - Name: `rgukt-alumni-db`
   - Database: `rgukt_alumni_portal`
   - User: `rgukt_user`
   - Choose: Free tier
5. **Click** "Create Database"
6. **Copy** the credentials (save them somewhere safe):
   - Internal Database URL
   - External Database URL
   - Host, Port, Database, User, Password

7. **Initialize database:**
   - Click on your database → "Shell" tab
   - Upload `database-schema-production.sql`
   - Or connect manually and paste the schema

### 🖥️ Part B: Deploy Backend (Render) - 5 minutes

1. **In Render**, click "New +" → "Web Service"
2. **Connect** your GitHub repository
3. **Fill in:**
   - Name: `rgukt-alumni-backend`
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node server.cjs`
   - Plan: Free

4. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   DATABASE_URL → <paste Internal Database URL from Part A>
   DB_HOST → <paste from Part A>
   DB_PORT → 5432
   DB_NAME → rgukt_alumni_portal
   DB_USER → rgukt_user
   DB_PASSWORD → <paste from Part A>
   JWT_SECRET → <generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
   NODE_ENV → production
   PORT → 3001
   ```

5. **Click** "Create Web Service"
6. **Wait** 5-10 minutes for deployment
7. **Copy** your backend URL: `https://rgukt-alumni-backend.onrender.com`

### 🎨 Part C: Deploy Frontend (Vercel) - 3 minutes

1. **Go to** → https://vercel.com
2. **Sign up** with GitHub
3. **Click** "New Project"
4. **Import** your GitHub repository
5. **Configure:**
   - Framework: Vite
   - Root Directory: (leave empty)
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. **Add Environment Variable:**
   ```
   VITE_API_URL → https://rgukt-alumni-backend.onrender.com/api
   ```

7. **Click** "Deploy"
8. **Wait** 2-5 minutes
9. **Copy** your frontend URL: `https://rgukt-alumni-portal.vercel.app`

### 🔗 Part D: Connect Frontend & Backend - 2 minutes

1. **Go back** to Render backend dashboard
2. **Add Environment Variable:**
   ```
   FRONTEND_URL → https://rgukt-alumni-portal.vercel.app
   ```
3. **Click** "Manual Deploy" to redeploy

### ✅ Part E: Initialize Database - 3 minutes

Run from your local machine:

```bash
# Install dependencies
npm install

# Set production database URL
DATABASE_URL="<your render database URL>" node setup-production-db.cjs
```

### 🎉 Part F: Test Your Deployment

1. **Open** → https://rgukt-alumni-portal.vercel.app
2. **Login** with:
   - Email: `admin@rgukt.ac.in`
   - Password: `admin123`
3. **Try** creating a new user

---

## ☁️ Option 2: Railway (All-in-One) - 10 minutes

### 1. Deploy Everything

1. **Go to** → https://railway.app
2. **Sign up** with GitHub
3. **Click** "New Project" → "Deploy from GitHub repo"
4. **Select** your repository
5. **Add** "Database" → "PostgreSQL"

### 2. Configure Backend

1. **Click** on your service
2. **Variables** tab:
   ```
   DATABASE_URL → ${{Postgres.DATABASE_URL}}
   JWT_SECRET → <generate random>
   NODE_ENV → production
   PORT → 3001
   ```
3. **Settings** tab:
   - Start Command: `node server.cjs`

### 3. Configure Frontend

1. **Add** new service (same repo)
2. **Variables**:
   ```
   VITE_API_URL → <your backend URL>/api
   ```
3. **Settings**:
   - Build Command: `npm run build`
   - Start Command: `npm run preview`

### 4. Initialize Database

Use Railway's database URL with setup script

### 5. Test

Open your Railway frontend URL and login!

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All code is committed to Git
- [ ] `.env` is in `.gitignore` (don't commit secrets!)
- [ ] GitHub repository is created
- [ ] Code is pushed to GitHub
- [ ] You have a strong JWT secret ready
- [ ] Database schema file is ready

---

## 🔐 Generate JWT Secret

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`

---

## 🐛 Common Issues

### "Cannot connect to database"
- ✅ Check DATABASE_URL is correct
- ✅ Verify database is running
- ✅ Check if SSL is required (add `?sslmode=require` to URL)

### "CORS error"
- ✅ Check FRONTEND_URL is set in backend
- ✅ Verify CORS configuration
- ✅ Redeploy backend after changes

### "Build failed"
- ✅ Check all dependencies are in package.json
- ✅ Verify Node version (should be >= 18)
- ✅ Check build logs for errors

---

## 🎯 Quick Commands

### Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Test Production Locally
```bash
# Set production env
NODE_ENV=production npm start
```

### Initialize Production Database
```bash
DATABASE_URL="your-prod-url" node setup-production-db.cjs
```

### Test Production API
```bash
curl https://your-backend-url.com/api/health
```

---

## 📚 Need More Help?

- **Detailed Guide**: See `DEPLOYMENT_GUIDE.md`
- **Setup Issues**: See `SETUP_GUIDE.md`
- **Quick Start**: See `QUICK_START.md`
- **Testing**: Run `node test-system.cjs`

---

## ✅ Success Checklist

After deployment, verify:

- [ ] Database is accessible
- [ ] Backend health endpoint works
- [ ] Frontend loads without errors
- [ ] Login works
- [ ] Registration works
- [ ] HTTPS is enabled
- [ ] CORS is configured
- [ ] Environment variables are set

---

## 🎉 You're Done!

Your RGUKT Alumni Portal is now live!

**Next Steps:**
1. Change admin password
2. Add custom domain (optional)
3. Set up monitoring
4. Configure backups
5. Share with users!

---

**Time Estimate:**
- Option 1 (Vercel + Render): ~20 minutes
- Option 2 (Railway): ~15 minutes

**Cost:**
- Both options have free tiers!
- Paid plans start from $5-10/month

Good luck! 🚀
