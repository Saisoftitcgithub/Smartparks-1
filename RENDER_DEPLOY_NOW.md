# 🚀 Deploy to Render - Step by Step Guide

## ✅ Prerequisites

- ✅ Code is pushed to GitHub: https://github.com/Saisoftitcgithub/Smartparks-1
- ✅ Render account (sign up at https://render.com if needed)

## 📋 Deployment Steps

### Step 1: Sign Up / Login to Render

1. Go to: **https://render.com**
2. Click **"Get Started for Free"** or **"Sign In"**
3. **Connect your GitHub account** (authorize Render to access your repos)

### Step 2: Deploy Backend Service

1. **Click**: **"New +"** → **"Web Service"**
2. **Connect Repository**:
   - Select: **Saisoftitcgithub/Smartparks-1**
   - Click **"Connect"**
3. **Configure Backend**:
   - **Name**: `smartparks-backend`
   - **Region**: Choose closest to you (e.g., Singapore, Frankfurt)
   - **Branch**: `main`
   - **Root Directory**: `backend-mock` ⚠️ **Important!**
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free** (or choose paid for better performance)

4. **Environment Variables** (Click "Advanced"):
   - Click **"Add Environment Variable"**
   - Add these:
     - **Key**: `NODE_ENV` → **Value**: `production`
     - **Key**: `SECRET_KEY` → **Value**: (Generate a random string, e.g., `smartparks-secret-key-2024-xyz123`)
     - **Key**: `PORT` → **Value**: `10000` (Render sets this automatically, but good to have)

5. **Click**: **"Create Web Service"**
6. **Wait for deployment** (2-5 minutes)
7. **Copy the service URL** (e.g., `https://smartparks-backend.onrender.com`)

### Step 3: Deploy Frontend Service

1. **Click**: **"New +"** → **"Web Service"** (again)
2. **Select the same repository**: `Saisoftitcgithub/Smartparks-1`
3. **Configure Frontend**:
   - **Name**: `smartparks-frontend`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Root Directory**: `smartparks` ⚠️ **Important!**
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Plan**: **Free**

4. **Environment Variables**:
   - **Key**: `NODE_ENV` → **Value**: `production`
   - **Key**: `PORT` → **Value**: `10000` (auto-set by Render)

5. **Click**: **"Create Web Service"**
6. **Wait for deployment** (5-10 minutes - Angular build takes time)

### Step 4: Update Frontend API URL

After backend is deployed:

1. **Get your backend URL** from Render dashboard (e.g., `https://smartparks-backend.onrender.com`)
2. **Update** `smartparks/src/environments/environment-prod.ts`:
   ```typescript
   apiUrl: 'https://smartparks-backend.onrender.com/api'
   ```
   (Replace with your actual backend URL)

3. **Commit and push**:
   ```bash
   git add smartparks/src/environments/environment-prod.ts
   git commit -m "Update API URL for Render deployment"
   git push origin main
   ```
4. **Render will auto-redeploy** the frontend

## ✅ Alternative: Use Blueprint (Easier!)

If you prefer automatic setup:

1. **Click**: **"New +"** → **"Blueprint"**
2. **Connect Repository**: `Saisoftitcgithub/Smartparks-1`
3. **Render will detect** `render.yaml` automatically
4. **Review** the services it will create
5. **Click**: **"Apply"**
6. **Wait for both services** to deploy

**Note**: You may still need to:
- Set `SECRET_KEY` environment variable for backend
- Update frontend API URL after backend deploys

## 🔍 Verify Deployment

### Backend
- Visit: `https://smartparks-backend.onrender.com/api/health`
- Should return: `{"status":"OK","message":"Backend is running"}`

### Frontend
- Visit: `https://smartparks-frontend.onrender.com`
- Should show the login page
- Try logging in: `admin` / `Admin123`

## 📝 Important Notes

### Free Tier Limitations
- ⚠️ **Services sleep after 15 minutes** of inactivity
- ⚠️ **First request** after sleep takes 30-60 seconds (cold start)
- ⚠️ **512 MB RAM** limit
- ⚠️ **100 GB bandwidth** per month

### For Production
Consider upgrading to **Starter Plan** ($7/month per service) for:
- ✅ Always-on services (no sleep)
- ✅ More resources
- ✅ Better performance

## 🎯 Your Live URLs

After deployment:
- **Frontend**: `https://smartparks-frontend.onrender.com`
- **Backend API**: `https://smartparks-backend.onrender.com/api`

## 🔧 Troubleshooting

### Backend Issues
- **Check logs** in Render dashboard
- **Verify** `Root Directory` is `backend-mock`
- **Check** environment variables are set

### Frontend Issues
- **Check logs** for build errors
- **Verify** `Root Directory` is `smartparks`
- **Check** API URL is correct in `environment-prod.ts`
- **Verify** backend is running and accessible

### CORS Errors
- Backend CORS is configured to allow Render domains
- If you see CORS errors, check backend logs

## 🚀 Quick Deploy Checklist

- [ ] Sign up/Login to Render
- [ ] Connect GitHub account
- [ ] Deploy backend service
- [ ] Copy backend URL
- [ ] Deploy frontend service
- [ ] Update frontend API URL with backend URL
- [ ] Push updated environment file
- [ ] Test both services
- [ ] Verify login works

---

**Ready to deploy?** Start with Step 1! 🎉

