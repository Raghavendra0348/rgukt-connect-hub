# 🚀 Deploy to GitHub & Cloud - Quick Guide

## 🎯 Goal
Deploy your RGUKT Alumni Portal (Frontend + Backend + Database) to the cloud using GitHub.

---

## ⚡ Super Quick (For the Impatient)

```bash
# 1. Run automated setup
./deploy-to-github.sh

# 2. Go to https://render.com and https://vercel.com
#    Follow the prompts in DEPLOYMENT_CHECKLIST.md

# 3. Done! Your app is live! 🎉
```

---

## 📋 Step-by-Step (20 minutes)

### Step 1: Push to GitHub (5 min)

**Option A - Automated:**
```bash
./deploy-to-github.sh
```

**Option B - Manual:**
```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: RGUKT Alumni Portal"

# Create repo on GitHub: https://github.com/new
# Name it: rgukt-alumni-portal

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/rgukt-alumni-portal.git
git push -u origin main
```

### Step 2: Deploy Database (5 min)

1. Go to https://render.com → Sign up with GitHub
2. Click "New +" → "PostgreSQL"
3. Name: `rgukt-alumni-db`, Choose: Free
4. Copy the credentials shown

### Step 3: Deploy Backend (5 min)

1. In Render, click "New +" → "Web Service"
2. Connect your GitHub repo: `rgukt-alumni-portal`
3. Settings:
   - Build: `npm install`
   - Start: `node server.cjs`
4. Add environment variables (use values from Step 2):
   - `DATABASE_URL`: (from Render PostgreSQL)
   - `JWT_SECRET`: (generate with command below)
   - `NODE_ENV`: `production`

Generate JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. Deploy! Copy your backend URL.

### Step 4: Deploy Frontend (3 min)

1. Go to https://vercel.com → Sign up with GitHub
2. Click "New Project" → Import your repo
3. Framework: Vite
4. Add environment variable:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com/api`
5. Deploy! Copy your frontend URL.

### Step 5: Connect Them (2 min)

1. Go back to Render backend
2. Add environment variable:
   - `FRONTEND_URL`: `https://your-frontend-url.vercel.app`
3. Redeploy

### Step 6: Initialize Database (3 min)

```bash
# Run from your computer
DATABASE_URL="postgresql://user:pass@host/db" node setup-production-db.cjs
```

### Step 7: Test! (1 min)

Visit your frontend URL and login:
- Email: `admin@rgukt.ac.in`
- Password: `admin123`

---

## 📚 Detailed Documentation

- **Quick Checklist**: `DEPLOYMENT_CHECKLIST.md`
- **Complete Guide**: `DEPLOYMENT_GUIDE.md`
- **Troubleshooting**: `SETUP_GUIDE.md`

---

## 🎯 Platform Comparison

| Platform | What | Cost | Time | Difficulty |
|----------|------|------|------|------------|
| **Vercel** | Frontend | Free | 3 min | ⭐ Easy |
| **Render** | Backend + DB | Free | 10 min | ⭐ Easy |
| **Railway** | All-in-One | Free/$5 | 15 min | ⭐⭐ Medium |
| **AWS** | Everything | $10+ | 1 hour | ⭐⭐⭐⭐ Hard |

**Recommendation**: Vercel + Render (easiest & free!)

---

## ✅ Pre-Deployment Checklist

- [ ] Code is working locally (`npm run dev`)
- [ ] Tests are passing (`node test-system.cjs`)
- [ ] `.env` is in `.gitignore`
- [ ] GitHub repository created
- [ ] Strong JWT secret generated
- [ ] Read `DEPLOYMENT_CHECKLIST.md`

---

## 🔐 Security Before Deploy

1. **Generate JWT Secret**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Never commit `.env` files**:
   ```bash
   # Verify it's ignored
   cat .gitignore | grep .env
   ```

3. **Use HTTPS only** (automatic on Vercel/Render)

4. **Change admin password** after first login

---

## 🐛 Common Issues

### "Cannot push to GitHub"
```bash
# Make sure you created the repo on GitHub first
# Then:
git remote -v  # Check remote is correct
git push -u origin main
```

### "Build failed on Render/Vercel"
- Check Node version (should be >= 18)
- Verify `package.json` has all dependencies
- Check build logs for specific errors

### "CORS error"
- Make sure `FRONTEND_URL` is set in backend
- Verify `VITE_API_URL` is set in frontend
- Redeploy backend after adding `FRONTEND_URL`

### "Database connection failed"
- Check `DATABASE_URL` is correct
- Try adding `?sslmode=require` to URL
- Verify database is running on Render

---

## 🎉 After Deployment

1. **Change admin password** immediately
2. **Test all features**: Login, Registration, etc.
3. **Set up custom domain** (optional)
4. **Enable backups** (Render does this automatically)
5. **Share with users!**

---

## 🆘 Need Help?

1. **Quick issues**: Check `DEPLOYMENT_CHECKLIST.md`
2. **Detailed help**: Read `DEPLOYMENT_GUIDE.md`
3. **Local setup**: See `SETUP_GUIDE.md`
4. **Test locally**: Run `node test-system.cjs`

---

## 🌟 Success!

Your app is now:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Running on free tier
- ✅ Secured with HTTPS
- ✅ Ready for users

**Share your deployed app:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-api.onrender.com`

---

**Time to deploy**: 15-20 minutes  
**Cost**: FREE (with free tiers)  
**Difficulty**: ⭐ Easy

Good luck! 🚀
