# Fix Login Error on Render

## 🔍 Troubleshooting Steps

### Step 1: Verify Backend is Running

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Check `smartparks-backend` service**:
   - Is it **"Live"** (green)?
   - If it's sleeping, click **"Manual Deploy"** to wake it up
3. **Copy the backend URL** (e.g., `https://smartparks-backend-xxxx.onrender.com`)

### Step 2: Test Backend Health Endpoint

Open in browser or use curl:
```
https://YOUR-BACKEND-URL.onrender.com/api/health
```

Should return: `{"status":"OK","message":"Backend is running"}`

### Step 3: Check Browser Console

1. **Open your frontend URL** in browser
2. **Press F12** → **Console tab**
3. **Look for**: `API URL: ...` (should show the backend URL)
4. **Try to login** and check for errors:
   - CORS errors?
   - Network errors?
   - 404 errors?

### Step 4: Verify Backend URL

The frontend should automatically construct the backend URL from the frontend URL. But if it doesn't match, you need to:

1. **Get your actual backend URL** from Render dashboard
2. **Update** `smartparks/src/environments/environment-prod.ts`:
   ```typescript
   apiUrl: 'https://YOUR-ACTUAL-BACKEND-URL.onrender.com/api'
   ```
3. **Commit and push** (Render will auto-redeploy)

### Step 5: Check CORS Configuration

The backend CORS should allow your frontend domain. If you see CORS errors:

1. **Check backend logs** in Render dashboard
2. **Verify** frontend URL is in allowed origins
3. **Backend CORS** is configured to allow `*.onrender.com` domains

## 🎯 Quick Fix

**Tell me your backend URL** and I'll update the environment file for you!

Or update it manually:
1. Get backend URL from Render
2. Update `smartparks/src/environments/environment-prod.ts`
3. Set: `apiUrl: 'https://YOUR-BACKEND-URL.onrender.com/api'`
4. Commit and push

---

**Common Issues:**
- Backend is sleeping (free tier) → Wake it up
- Wrong backend URL → Update environment file
- CORS error → Backend CORS needs frontend URL
- Backend not deployed → Deploy backend first


