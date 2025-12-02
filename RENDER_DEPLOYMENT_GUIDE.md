# Render Deployment Guide for SmartParks

This guide will help you deploy both the frontend and backend of SmartParks application to Render.

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com) (free tier available)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Node.js**: Ensure your local environment has Node.js installed

---

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Render deployment"
   ```

2. Create a GitHub repository and push:
   ```bash
   git remote add origin https://github.com/yourusername/smartparks.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy Backend Service

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure Backend Service**:
   - **Name**: `smartparks-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend-mock && npm install`
   - **Start Command**: `cd backend-mock && npm start`
   - **Plan**: Free (or choose paid for better performance)

5. **Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render automatically sets this, but good to have)
   - `SECRET_KEY` = (Generate a secure random string for JWT)

6. **Click "Create Web Service"**
7. **Wait for deployment** (takes 2-5 minutes)
8. **Copy the service URL** (e.g., `https://smartparks-backend.onrender.com`)

### Step 3: Deploy Frontend Service

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → **"Web Service"**
3. **Select the same GitHub repository**
4. **Configure Frontend Service**:
   - **Name**: `smartparks-frontend`
   - **Environment**: `Node`
   - **Root Directory**: `smartparks` (important!)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Plan**: Free (or choose paid)

5. **Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render sets this automatically)
   - `API_URL` = `https://smartparks-backend.onrender.com` (your backend URL from Step 2)

6. **Click "Create Web Service"**
7. **Wait for deployment**

### Step 4: Update Frontend API URL

After both services are deployed:

1. **Get your backend URL** from Render dashboard (e.g., `https://smartparks-backend.onrender.com`)
2. **Update `smartparks/src/environments/environment-prod.ts`**:
   ```typescript
   apiUrl: 'https://smartparks-backend.onrender.com/api'
   ```
3. **Commit and push**:
   ```bash
   git add smartparks/src/environments/environment-prod.ts
   git commit -m "Update API URL for production"
   git push
   ```
4. **Render will automatically redeploy** the frontend

---

## 🔧 Alternative: Using render.yaml (Recommended)

If you prefer configuration as code:

1. **The `render.yaml` file is already created** in the root directory
2. **In Render Dashboard**: Click "New +" → **"Blueprint"**
3. **Connect your GitHub repository**
4. **Render will automatically detect `render.yaml`** and create both services
5. **Review and apply** the configuration

---

## ⚙️ Configuration Details

### Backend Configuration

- **Port**: Render automatically sets `PORT` environment variable
- **CORS**: Configured to allow requests from Render frontend URLs
- **Health Check**: `/api/health` endpoint for monitoring

### Frontend Configuration

- **Static Files**: Served from `dist/smart-parks` folder
- **Routing**: All routes serve `index.html` for Angular routing
- **API URL**: Automatically detects Render environment

---

## 🔍 Troubleshooting

### Backend Issues

1. **Service not starting**:
   - Check build logs in Render dashboard
   - Verify `package.json` has correct start script
   - Ensure `server.js` uses `process.env.PORT`

2. **CORS errors**:
   - Update `allowedOrigins` in `backend-mock/server.js`
   - Add your frontend URL to the CORS whitelist

3. **Health check failing**:
   - Verify `/api/health` endpoint exists
   - Check service logs for errors

### Frontend Issues

1. **Build failing**:
   - Check Node.js version (Render uses Node 18+)
   - Verify all dependencies in `package.json`
   - Check build logs for specific errors

2. **API connection errors**:
   - Verify backend URL in `environment-prod.ts`
   - Check backend service is running
   - Verify CORS configuration

3. **404 errors on routes**:
   - Ensure `server.js` serves `index.html` for all routes
   - Check Angular routing configuration

---

## 📝 Environment Variables Reference

### Backend (`smartparks-backend`)
- `NODE_ENV` = `production`
- `PORT` = `10000` (auto-set by Render)
- `SECRET_KEY` = Your JWT secret key

### Frontend (`smartparks-frontend`)
- `NODE_ENV` = `production`
- `PORT` = `10000` (auto-set by Render)
- `API_URL` = Your backend service URL

---

## 🎯 Post-Deployment Checklist

- [ ] Backend service is running and accessible
- [ ] Frontend service is running and accessible
- [ ] Frontend can connect to backend API
- [ ] Login functionality works
- [ ] All routes are accessible
- [ ] Demo data is visible
- [ ] CORS is properly configured

---

## 🔄 Updating Your Application

1. **Make changes** to your code
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. **Render automatically redeploys** both services
4. **Monitor deployment** in Render dashboard

---

## 💰 Free Tier Limitations

- **Services sleep after 15 minutes** of inactivity
- **First request after sleep** takes 30-60 seconds to wake up
- **512 MB RAM** limit
- **100 GB bandwidth** per month

**Tip**: For production, consider upgrading to paid plans for:
- Always-on services (no sleep)
- More resources
- Better performance

---

## 🔐 Security Notes

1. **Change SECRET_KEY**: Generate a strong random string for production
2. **Update CORS**: Only allow your frontend domain
3. **Environment Variables**: Never commit secrets to git
4. **HTTPS**: Render provides SSL certificates automatically

---

## 📞 Support

- **Render Documentation**: https://render.com/docs
- **Render Community**: https://community.render.com
- **Check Service Logs**: Available in Render dashboard

---

## ✅ Quick Deploy Commands

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for Render deployment"
git push origin main

# 2. Go to Render dashboard and create services
# 3. Update API URL after backend is deployed
# 4. Redeploy frontend
```

---

**Your application will be live at**: `https://smartparks-frontend.onrender.com`

**Backend API will be at**: `https://smartparks-backend.onrender.com`

Good luck with your deployment! 🚀

