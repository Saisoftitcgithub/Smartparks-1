# Debug Login Issue

## 🔍 Step-by-Step Debugging

### Step 1: Check Browser Console
1. **Open your frontend URL** in browser
2. **Press F12** → **Console tab**
3. **Look for**: `API URL: ...` - Should show: `https://smartparks-backend.onrender.com/api/`
4. **Clear console** (right-click → Clear console)

### Step 2: Check Network Tab
1. **Press F12** → **Network tab**
2. **Clear network log** (🚫 icon)
3. **Try to login** with:
   - Username: `admin`
   - Password: `Admin123`
4. **Look for the login request**:
   - Find request to `/api/login` or `login`
   - Click on it
   - Check:
     - **Request URL**: Should be `https://smartparks-backend.onrender.com/api/login`
     - **Request Method**: Should be `POST`
     - **Status Code**: What is it? (200, 401, 404, 500, CORS error?)
     - **Request Headers**: Should have `X-TenantID: queberry`
     - **Request Payload**: Should have `{"username":"admin","password":"Admin123"}`
     - **Response**: What does it say?

### Step 3: Check Backend Logs
1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click on `smartparks-backend` service**
3. **Click "Logs" tab**
4. **Look for**:
   - `[CORS] Request from origin: ...`
   - `[LOGIN] Attempt from: ...`
   - `[LOGIN] Username: admin, Password provided: yes`
   - `[LOGIN] Success for user: admin` OR `[LOGIN] Invalid credentials`

### Step 4: Test Backend Directly
**Option A: Using Browser**
1. Open: `https://smartparks-backend.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Backend is running"}`

**Option B: Using curl (PowerShell)**
```powershell
# Test health
curl https://smartparks-backend.onrender.com/api/health

# Test login
curl -X POST https://smartparks-backend.onrender.com/api/login `
  -H "Content-Type: application/json" `
  -H "X-TenantID: queberry" `
  -d '{\"username\":\"admin\",\"password\":\"Admin123\"}'
```

### Step 5: Common Issues & Fixes

#### Issue 1: CORS Error
**Symptom**: Browser console shows "CORS policy" error
**Fix**: Check backend logs - should see `[CORS] Allowing origin: ...`
- If blocked, the frontend URL might not match the allowed origins
- Check Render dashboard for actual frontend URL

#### Issue 2: 404 Not Found
**Symptom**: Network tab shows 404
**Fix**: 
- Check API URL in console: Should be `https://smartparks-backend.onrender.com/api/`
- Verify backend is running (check Render dashboard)

#### Issue 3: 401 Unauthorized
**Symptom**: Network tab shows 401
**Fix**: 
- Check backend logs for `[LOGIN] Invalid credentials`
- Verify username/password: `admin` / `Admin123`
- Check if backend received the request correctly

#### Issue 4: Network Error / Failed to Fetch
**Symptom**: Network tab shows "Failed" or "Network Error"
**Fix**:
- Backend might be sleeping (free tier)
- Wake it up in Render dashboard
- Check if backend URL is correct

#### Issue 5: Wrong API URL
**Symptom**: Console shows wrong API URL
**Fix**:
- Clear browser cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check if frontend has redeployed (wait 2-3 minutes after push)

## 📋 What to Report

If still not working, please provide:

1. **Browser Console Output**:
   - Screenshot or copy the `API URL: ...` line
   - Any error messages

2. **Network Tab Details**:
   - Request URL
   - Status Code
   - Request Headers
   - Request Payload
   - Response (if any)

3. **Backend Logs**:
   - Copy the last 20-30 lines from Render backend logs
   - Look for `[LOGIN]` and `[CORS]` entries

4. **Frontend URL**: Your actual Render frontend URL

5. **Backend URL**: Your actual Render backend URL

---

## ✅ Quick Test

After backend redeploys, test this in browser console (F12 → Console):

```javascript
fetch('https://smartparks-backend.onrender.com/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-TenantID': 'queberry'
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'Admin123'
  })
})
.then(r => r.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

This will tell us if the backend is working correctly!


