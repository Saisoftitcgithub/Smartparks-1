# Troubleshooting Guide - Login Error

## Current Issue
**Error**: "Please try once again with valid details."

**Root Cause**: The backend API server is not running or not accessible on port 5680.

## Quick Diagnosis

### Check Browser Console
1. Open your browser (Chrome/Edge)
2. Press `F12` to open Developer Tools
3. Go to the **Console** tab
4. Look for error messages - you should see:
   - The API URL being used
   - Network errors (CORS, connection refused, etc.)
   - HTTP status codes

### Check Network Tab
1. In Developer Tools, go to the **Network** tab
2. Try logging in again
3. Look for the login request (usually to `/api/login`)
4. Check the status code:
   - **Status 0 or (failed)**: Backend not running or CORS issue
   - **Status 404**: API endpoint not found
   - **Status 401**: Invalid credentials (backend is running!)
   - **Status 500**: Server error

## Solutions

### Solution 1: Start the Backend API Server

If you have the backend code:

1. **Find your backend project** (usually a separate repository or folder)
2. **Start the backend server** on port 5680
3. **Verify it's running**:
   ```powershell
   Test-NetConnection -ComputerName localhost -Port 5680
   ```
   Should return `True`

### Solution 2: Update API URL

If your backend is running on a different URL, update `smartparks/src/environments/environment.ts`:

#### Option A: Use a hardcoded URL (for development)

Uncomment and modify one of these lines in `environment.ts`:

```typescript
// For local backend on port 5680
apiUrl: 'http://localhost:5680/api/',

// For backend on different port
apiUrl: 'http://localhost:8086/api/',

// For remote backend
apiUrl: 'http://192.168.30.102:8086/api/',
```

#### Option B: Use a different port

Change line 21 in `environment.ts`:

```typescript
// Change from:
environment.apiUrl = window.location.protocol + '//' + window.location.hostname + ':5680/api/';

// To (example for port 8086):
environment.apiUrl = window.location.protocol + '//' + window.location.hostname + ':8086/api/';
```

### Solution 3: Check CORS Configuration

If you see CORS errors in the browser console, the backend needs to allow requests from `http://localhost:4200`.

**Backend CORS configuration should include:**
```javascript
// Example for Express.js
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

## Current API Configuration

Based on `environment.ts`, the app currently tries to connect to:

- **HTTP (localhost)**: `http://localhost:5680/api/`
- **HTTPS**: `https://hostname/api`

## Testing the API Connection

You can test if the backend is accessible:

```powershell
# Test if port 5680 is open
Test-NetConnection -ComputerName localhost -Port 5680

# Try to access the API endpoint directly
curl http://localhost:5680/api/login -Method POST -ContentType "application/json" -Body '{"username":"test","password":"test"}'
```

## Next Steps

1. **Check browser console** for detailed error messages
2. **Verify backend is running** on the expected port
3. **Update API URL** in `environment.ts` if needed
4. **Restart Angular dev server** after changing environment.ts:
   - Stop the server (Ctrl+C)
   - Run `npm start` again

## Improved Error Messages

I've updated the login component to show more specific error messages:

- **"Cannot connect to server"**: Backend not running or wrong URL
- **"Invalid username or password"**: Backend is running, but credentials are wrong
- **"API endpoint not found"**: Backend running but wrong endpoint
- **"Server error"**: Backend error (500)

These messages will help you identify the exact issue.

