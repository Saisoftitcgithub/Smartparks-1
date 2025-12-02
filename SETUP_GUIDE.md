# SmartParks Application - Setup & Flow Guide

## 📋 Overview

**SmartParks** is an Angular-based web application for managing parking operations. It provides features for:
- Dashboard analytics
- Reports generation
- Configuration management (Organizations, Branches, Users, Vehicles, Gates)
- User authentication and role-based access control
- Session management with inactivity timeout

## 🛠️ Technology Stack

- **Framework**: Angular 16.1.0
- **UI Libraries**: 
  - PrimeNG 16.0.2
  - Angular Material 16.2.1
  - PrimeFlex 3.3.1
- **Additional Libraries**:
  - Chart.js (for charts/graphs)
  - FullCalendar (for calendar views)
  - RxJS 7.8.0
  - Angular User Idle (for session management)
- **Build Tool**: Angular CLI 16.1.5
- **TypeScript**: 5.1.3
- **Containerization**: Docker (Nginx)

## 📁 Project Structure

```
smartparks/
├── src/
│   ├── app/
│   │   ├── components/          # Feature modules
│   │   │   ├── dashboard/       # Dashboard component
│   │   │   ├── reports/         # Reports module
│   │   │   └── configuration/   # Config modules
│   │   │       ├── organization/
│   │   │       ├── branch/
│   │   │       ├── users/
│   │   │       ├── vehicle/
│   │   │       ├── integration/
│   │   │       └── services/    # Service layer
│   │   ├── core/                # Core functionality
│   │   │   ├── auth/            # Authentication module
│   │   │   │   ├── login/
│   │   │   │   ├── forgot-password/
│   │   │   │   ├── access/
│   │   │   │   └── error/
│   │   │   └── services/         # HTTP services & interceptors
│   │   ├── layout/              # Layout components
│   │   │   ├── app.layout.component.ts
│   │   │   ├── app.menu.component.ts
│   │   │   ├── app.sidebar.component.ts
│   │   │   └── app.topbar.component.ts
│   │   └── shared/              # Shared components
│   ├── assets/                  # Static assets
│   ├── environments/            # Environment configs
│   └── styles.scss              # Global styles
├── angular.json                 # Angular configuration
├── package.json                 # Dependencies
├── Dockerfile                   # Docker configuration
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

1. **Node.js** (v16 or higher recommended)
2. **npm** (comes with Node.js) or **yarn**
3. **Angular CLI** (will be installed as dev dependency)
4. **Git** (for version control)

### Step-by-Step Setup

#### 1. Navigate to Project Directory
```bash
cd D:\Saisoft\Smatparks\smartparks
```

#### 2. Install Dependencies
```bash
npm install
```

This will install all dependencies listed in `package.json`, including:
- Angular framework and core modules
- PrimeNG and Angular Material UI components
- Chart.js, FullCalendar, and other libraries

#### 3. Configure Environment

The application uses environment files to configure API endpoints:

**Development** (`src/environments/environment.ts`):
- API URL is dynamically set based on protocol:
  - HTTPS: `https://hostname/api`
  - HTTP: `http://hostname:5680/api/`

**Production** (`src/environments/environment-prod.ts`):
- Similar dynamic configuration

**Note**: You may need to update the API URL in these files to point to your backend server.

#### 4. Start Development Server

```bash
npm start
# or
ng serve
```

The application will be available at: **http://localhost:4200/**

The app will automatically reload when you make changes to source files.

#### 5. Build for Production

```bash
npm run build
# or
ng build
```

This creates optimized production files in the `dist/smart-parks/` directory.

## 🔄 Application Flow

### 1. **Initial Load & Routing**

```
App Start → AppModule → AppRoutingModule
```

- Root path (`/`) redirects to `/auth`
- `/auth` loads the AuthModule (login page)
- `/app` loads the main application with layout
- Invalid routes redirect to `/auth/error`

### 2. **Authentication Flow**

```
User visits app → Redirected to /auth/login
  ↓
User enters credentials
  ↓
LoginComponent calls AuthService.login()
  ↓
POST request to {apiUrl}/login
  ↓
On success:
  - Token stored in localStorage
  - Employee data stored in localStorage
  - isAuthenticatedFlag = true
  - Navigate to /app/dashboard
  ↓
HTTP Interceptor adds Authorization header to all requests
```

**Key Files:**
- `src/app/core/auth/login/login.component.ts` - Login UI and logic
- `src/app/core/auth/services/auth.service.ts` - Authentication service
- `src/app/core/services/base-http-intercept.interceptor.ts` - Adds auth token to requests

### 3. **Main Application Flow**

After authentication, users access:

```
/app/dashboard    → Dashboard module (default)
/app/reports      → Reports module
/app/config       → Configuration module
  ├── /config/organization
  ├── /config/branch
  ├── /config/users
  ├── /config/vehicle
  └── /config/integration
```

### 4. **HTTP Request Flow**

All HTTP requests go through:
1. **BaseHttpInterceptor** - Adds:
   - `Authorization: Bearer {token}` header
   - `X-TenantID: queberry` header
2. **BaseHttpService** - Handles HTTP operations
3. **API Endpoints** - Defined in `common-routes.ts`

### 5. **Session Management**

- **Idle Timeout**: 3600 seconds (1 hour)
- **Warning Timeout**: 3600 seconds
- **Ping Interval**: 120 seconds
- When user is idle, a modal appears asking to continue or logout
- If no response, user is automatically logged out

**Implementation**: `angular-user-idle` library in `app.component.ts`

## 🔑 Key Features

### 1. **Dashboard**
- Analytics and metrics
- Data visualization (likely using Chart.js)
- Real-time updates

### 2. **Reports**
- Generate various reports
- Export functionality

### 3. **Configuration Module**
- **Organization Management**: Create/update organizations
- **Branch Management**: Manage branches
- **User Management**: Create/update employees
- **Vehicle Management**: Manage vehicle exclusion lists
- **Integration**: Integration settings
- **Gates Configuration**: Configure parking gates

### 4. **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (RoleGuard)
- Session timeout management
- Forgot password functionality

## 🌐 API Integration

The application expects a backend API with the following endpoints:

### Base URL Configuration
- Development: `http://hostname:5680/api/` or `https://hostname/api`
- Production: `https://hostname/api` or `http://hostname:5680/api/`

### Key Endpoints (from `common-routes.ts`):

```
POST   /api/login                    - User login
GET    /api/logout                   - User logout
POST   /api/admin/user/password/reset - Password reset

GET    /api/roles/all                - Fetch all roles
GET    /api/organization             - Fetch organizations
POST   /api/organization             - Create organization
PUT    /api/organization             - Update organization

GET    /api/branch/all               - Fetch all branches
POST   /api/branch                   - Create branch
PUT    /api/branch                   - Update branch

GET    /api/employees                - Fetch users
POST   /api/employees                - Create user
PUT    /api/employees                - Update user

GET    /api/gatesConfig/branch={id}  - Fetch gates
POST   /api/gatesConfig              - Create gate
PUT    /api/gatesConfig              - Update gate

GET    /api/vehiclesExclList         - Fetch vehicle exclusion list
POST   /api/vehiclesExclList         - Create vehicle exclusion
PUT    /api/vehiclesExclList         - Update vehicle exclusion

GET    /api/dashboard                - Dashboard data
GET    /api/reports                  - Reports data
GET    /api/countries                - Fetch countries
```

**Important**: All requests include:
- `Authorization: Bearer {token}` header (if authenticated)
- `X-TenantID: queberry` header

## 🐳 Docker Deployment

The project includes a Dockerfile for containerized deployment:

```dockerfile
FROM nginx:alpine
COPY .\htaccess /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
```

**To build and run with Docker:**

1. Build the Angular app:
```bash
npm run build
```

2. Build Docker image:
```bash
docker build -t smartparks .
```

3. Run container:
```bash
docker run -d -p 80:80 smartparks
```

## 📝 Available Scripts

```bash
npm start          # Start development server (ng serve)
npm run build      # Build for production (with increased memory)
npm run watch      # Build in watch mode
npm test           # Run unit tests
ng generate        # Generate components, services, etc.
```

## ⚙️ Configuration Files

- **angular.json**: Angular project configuration, build settings
- **tsconfig.json**: TypeScript compiler options
- **package.json**: Dependencies and scripts
- **environment.ts**: Development environment variables
- **environment-prod.ts**: Production environment variables

## 🔍 Troubleshooting

### Common Issues:

1. **Port 4200 already in use**:
   ```bash
   ng serve --port 4201
   ```

2. **Memory issues during build**:
   - The build script already includes `--max_old_space_size=16384`
   - If still failing, increase Node.js memory limit

3. **API connection errors**:
   - Check `environment.ts` for correct API URL
   - Ensure backend server is running
   - Check CORS settings on backend

4. **Authentication not working**:
   - Verify token is being stored in localStorage
   - Check browser console for errors
   - Verify API endpoint is correct

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [PrimeNG Documentation](https://primeng.org/)
- [Angular Material Documentation](https://material.angular.io/)

---

## 🎯 Quick Start Summary

1. `cd smartparks`
2. `npm install`
3. Update API URL in `src/environments/environment.ts` if needed
4. `npm start`
5. Open browser to `http://localhost:4200`
6. Login with valid credentials
7. Access dashboard and features

---

**Note**: Make sure your backend API server is running and accessible at the configured URL before testing the application.

