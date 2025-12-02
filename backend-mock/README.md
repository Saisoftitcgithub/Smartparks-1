# SmartParks Mock Backend Server

A simple Express.js mock backend server for testing the SmartParks frontend application.

## Features

- JWT-based authentication
- CORS enabled for `http://localhost:4200`
- Mock data for all API endpoints
- X-TenantID header support

## Setup

### 1. Install Dependencies

```bash
cd backend-mock
npm install
```

### 2. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on **port 5680** (as expected by the frontend).

## Test Credentials

- **Username**: `admin` / **Password**: `Admin123`
- **Username**: `user` / **Password**: `User1234`

## API Endpoints

All endpoints are prefixed with `/api`:

- `POST /api/login` - User login
- `GET /api/logout` - User logout
- `GET /api/dashboard` - Dashboard data
- `GET /api/organization` - Get organizations
- `GET /api/branch/all` - Get all branches
- `GET /api/employees` - Get employees
- And more...

## Security Note

⚠️ **This is a MOCK server for development only!**

- Uses a simple secret key (change in production)
- No real database
- No password hashing
- All data is in-memory

For production, you'll need a proper backend with:
- Database (PostgreSQL, MySQL, MongoDB, etc.)
- Password hashing (bcrypt)
- Proper security measures
- Input validation
- Error handling

## Troubleshooting

### Port Already in Use

If port 5680 is already in use, you can change it in `server.js`:

```javascript
const PORT = 5680; // Change to another port
```

Then update the frontend `environment.ts` to match.

### CORS Issues

If you see CORS errors, make sure the frontend URL in `server.js` matches your Angular dev server URL (default: `http://localhost:4200`).

