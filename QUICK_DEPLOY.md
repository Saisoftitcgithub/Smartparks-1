# Quick Render Deployment Checklist

## ✅ Pre-Deployment Checklist

- [x] `render.yaml` created
- [x] `smartparks/server.js` created for frontend serving
- [x] Backend configured to use `process.env.PORT`
- [x] CORS updated for Render domains
- [x] Environment files updated
- [x] `package.json` updated with Express dependency

## 🚀 Quick Deploy Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Configure for Render deployment"
git push origin main
```

### 2. Deploy Backend (5 minutes)
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Settings:
   - **Name**: `smartparks-backend`
   - **Root Directory**: `backend-mock`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `SECRET_KEY` = (generate random string)
6. Deploy!

### 3. Deploy Frontend (5 minutes)
1. Click "New +" → "Web Service"
2. Connect same GitHub repo
3. Settings:
   - **Name**: `smartparks-frontend`
   - **Root Directory**: `smartparks`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
4. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `API_URL` = `https://smartparks-backend.onrender.com`
5. Deploy!

### 4. Update API URL
After backend deploys, update `smartparks/src/environments/environment-prod.ts`:
```typescript
apiUrl: 'https://YOUR-BACKEND-URL.onrender.com/api'
```

Then push again - frontend will auto-redeploy.

## 📝 Important Notes

- **Free tier services sleep** after 15 min inactivity
- **First request** after sleep takes 30-60 seconds
- **Backend URL format**: `https://smartparks-backend.onrender.com`
- **Frontend URL format**: `https://smartparks-frontend.onrender.com`

## 🔗 Your URLs

After deployment:
- **Frontend**: `https://smartparks-frontend.onrender.com`
- **Backend API**: `https://smartparks-backend.onrender.com/api`

## 🎯 Test After Deployment

1. Visit frontend URL
2. Login with: `admin` / `Admin123`
3. Check all features work
4. Verify API calls work (check browser console)

---

**Need help?** Check `RENDER_DEPLOYMENT_GUIDE.md` for detailed instructions.

