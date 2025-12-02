const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5680;
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-change-in-production';

// Middleware
const allowedOrigins = [
  'http://localhost:4200',
  process.env.FRONTEND_URL,
  'https://smartparks-frontend.onrender.com',
  'https://smartparks-frontend.render.com'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());

// Mock data
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'Admin123', // Password must match pattern: 8+ chars, 1 uppercase, 1 lowercase, 1 number
    employee: {
      id: 1,
      name: 'Admin User',
      email: 'admin@smartparks.com',
      roles: ['admin', 'user'],
      authorities: [
        { name: 'ADMIN', authority: 'ADMIN' },
        { name: 'USER', authority: 'USER' }
      ],
      branches: [
        { id: 1, name: 'Main Branch', code: 'BR001' },
        { id: 2, name: 'North Branch', code: 'BR002' }
      ]
    }
  },
  {
    id: 2,
    username: 'user',
    password: 'User1234',
    employee: {
      id: 2,
      name: 'Regular User',
      email: 'user@smartparks.com',
      roles: ['user'],
      authorities: [
        { name: 'USER', authority: 'USER' }
      ],
      branches: [
        { id: 1, name: 'Main Branch', code: 'BR001' }
      ]
    }
  }
];

// Middleware to check X-TenantID header
const checkTenant = (req, res, next) => {
  const tenantId = req.headers['x-tenantid'];
  console.log(`Request from tenant: ${tenantId}`);
  next();
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Login endpoint
app.post('/api/login', checkTenant, (req, res) => {
  const { username, password } = req.body;
  
  console.log(`Login attempt: ${username}`);
  
  const user = mockUsers.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { 
      userId: user.id, 
      username: user.username,
      roles: user.employee.roles 
    },
    SECRET_KEY,
    { expiresIn: '24h' }
  );

  res.json({
    token: token,
    employee: user.employee
  });
});

// Logout endpoint
app.get('/api/logout', checkTenant, verifyToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Password reset
app.post('/api/admin/user/password/reset', checkTenant, verifyToken, (req, res) => {
  res.json({ message: 'Password reset email sent' });
});

// Roles
app.get('/api/roles/all', checkTenant, verifyToken, (req, res) => {
  res.json([
    { id: 1, name: 'admin', authority: 'ADMIN', description: 'Administrator - Full system access' },
    { id: 2, name: 'user', authority: 'USER', description: 'Regular User - Dashboard and Reports access' },
    { id: 3, name: 'manager', authority: 'MANAGER', description: 'Manager - Branch management access' },
    { id: 4, name: 'operator', authority: 'OPERATOR', description: 'Operator - Gate operations access' }
  ]);
});

// Organizations
app.get('/api/organization', checkTenant, verifyToken, (req, res) => {
  res.json({
    id: 1,
    name: 'Ajman Municipality',
    code: 'AJM001',
    email: 'info@ajman.ae',
    website: 'https://www.ajman.ae',
    businessType: 'Government',
    dateOfIncorporation: '1968-01-01',
    headQuarters: {
      building: 'Municipality Building',
      street: 'Sheikh Rashid Bin Humaid Street',
      area: 'Al Nuaimiya',
      city: 'Ajman',
      zip: 'PO Box 1',
      country: 'United Arab Emirates',
      location: {
        x: '55.4285',
        y: '25.4052'
      }
    },
    active: true
  });
});

app.post('/api/organization', checkTenant, verifyToken, (req, res) => {
  res.json({ id: 3, ...req.body, message: 'Organization created' });
});

app.put('/api/organization', checkTenant, verifyToken, (req, res) => {
  res.json({ ...req.body, message: 'Organization updated' });
});

// Branches
app.get('/api/branch/all', checkTenant, verifyToken, (req, res) => {
  res.json({
    content: [
      { 
        id: 1, 
        name: 'Ajman City Center Branch', 
        code: 'BR001', 
        organizationId: 1, 
        address: 'Ajman City Center, Sheikh Khalifa Bin Zayed Street, Ajman',
        city: 'Ajman',
        country: 'United Arab Emirates',
        phone: '+971 6 705 0000',
        email: 'citycenter@ajman.ae',
        active: true
      },
      { 
        id: 2, 
        name: 'Al Nuaimiya Branch', 
        code: 'BR002', 
        organizationId: 1, 
        address: 'Al Nuaimiya Area, Ajman',
        city: 'Ajman',
        country: 'United Arab Emirates',
        phone: '+971 6 705 0001',
        email: 'nuaimiya@ajman.ae',
        active: true
      },
      { 
        id: 3, 
        name: 'Al Rashidiya Branch', 
        code: 'BR003', 
        organizationId: 1, 
        address: 'Al Rashidiya Area, Ajman',
        city: 'Ajman',
        country: 'United Arab Emirates',
        phone: '+971 6 705 0002',
        email: 'rashidiya@ajman.ae',
        active: true
      },
      { 
        id: 4, 
        name: 'Al Jerf Branch', 
        code: 'BR004', 
        organizationId: 1, 
        address: 'Al Jerf Industrial Area, Ajman',
        city: 'Ajman',
        country: 'United Arab Emirates',
        phone: '+971 6 705 0003',
        email: 'jerf@ajman.ae',
        active: true
      }
    ]
  });
});

app.post('/api/branch', checkTenant, verifyToken, (req, res) => {
  res.json({ id: 3, ...req.body, message: 'Branch created' });
});

app.put('/api/branch', checkTenant, verifyToken, (req, res) => {
  res.json({ ...req.body, message: 'Branch updated' });
});

// Employees/Users
app.get('/api/employees', checkTenant, verifyToken, (req, res) => {
  res.json([
    { 
      id: 1, 
      name: 'Ahmed Al Mansoori', 
      email: 'ahmed.almansoori@ajman.ae', 
      phone: '+971 50 123 4567',
      role: 'admin',
      username: 'admin',
      branchId: 1,
      branchName: 'Ajman City Center Branch',
      status: 'active',
      authorities: [{ name: 'ADMIN', authority: 'ADMIN' }]
    },
    { 
      id: 2, 
      name: 'Fatima Al Zaabi', 
      email: 'fatima.alzaabi@ajman.ae', 
      phone: '+971 50 234 5678',
      role: 'manager',
      username: 'fatima.manager',
      branchId: 1,
      branchName: 'Ajman City Center Branch',
      status: 'active',
      authorities: [{ name: 'MANAGER', authority: 'MANAGER' }]
    },
    { 
      id: 3, 
      name: 'Mohammed Al Suwaidi', 
      email: 'mohammed.alsuwaidi@ajman.ae', 
      phone: '+971 50 345 6789',
      role: 'operator',
      username: 'mohammed.operator',
      branchId: 1,
      branchName: 'Ajman City Center Branch',
      status: 'active',
      authorities: [{ name: 'OPERATOR', authority: 'OPERATOR' }]
    },
    { 
      id: 4, 
      name: 'Sara Al Hameli', 
      email: 'sara.alhameli@ajman.ae', 
      phone: '+971 50 456 7890',
      role: 'user',
      username: 'sara.user',
      branchId: 2,
      branchName: 'Al Nuaimiya Branch',
      status: 'active',
      authorities: [{ name: 'USER', authority: 'USER' }]
    },
    { 
      id: 5, 
      name: 'Khalid Al Dhaheri', 
      email: 'khalid.aldhaheri@ajman.ae', 
      phone: '+971 50 567 8901',
      role: 'operator',
      username: 'khalid.operator',
      branchId: 2,
      branchName: 'Al Nuaimiya Branch',
      status: 'active',
      authorities: [{ name: 'OPERATOR', authority: 'OPERATOR' }]
    },
    { 
      id: 6, 
      name: 'Layla Al Nuaimi', 
      email: 'layla.alnuaimi@ajman.ae', 
      phone: '+971 50 678 9012',
      role: 'manager',
      username: 'layla.manager',
      branchId: 3,
      branchName: 'Al Rashidiya Branch',
      status: 'active',
      authorities: [{ name: 'MANAGER', authority: 'MANAGER' }]
    }
  ]);
});

app.post('/api/employees', checkTenant, verifyToken, (req, res) => {
  res.json({ id: 3, ...req.body, message: 'Employee created' });
});

app.put('/api/employees', checkTenant, verifyToken, (req, res) => {
  res.json({ ...req.body, message: 'Employee updated' });
});

// Gates Configuration
app.get('/api/gatesConfig/branch=:branchId', checkTenant, verifyToken, (req, res) => {
  const branchId = parseInt(req.params.branchId);
  const gates = {
    1: [ // Ajman City Center Branch
      { id: 1, branchId: 1, name: 'Main Entry Gate', gateNumber: 'G001', status: 'active', gateType: 'Entry', location: 'North Side' },
      { id: 2, branchId: 1, name: 'Main Exit Gate', gateNumber: 'G002', status: 'active', gateType: 'Exit', location: 'North Side' },
      { id: 3, branchId: 1, name: 'Secondary Entry Gate', gateNumber: 'G003', status: 'active', gateType: 'Entry', location: 'South Side' },
      { id: 4, branchId: 1, name: 'Emergency Gate', gateNumber: 'G004', status: 'inactive', gateType: 'Emergency', location: 'East Side' }
    ],
    2: [ // Al Nuaimiya Branch
      { id: 5, branchId: 2, name: 'Entry Gate', gateNumber: 'G005', status: 'active', gateType: 'Entry', location: 'Main Entrance' },
      { id: 6, branchId: 2, name: 'Exit Gate', gateNumber: 'G006', status: 'active', gateType: 'Exit', location: 'Main Entrance' }
    ],
    3: [ // Al Rashidiya Branch
      { id: 7, branchId: 3, name: 'Main Gate Entry', gateNumber: 'G007', status: 'active', gateType: 'Entry', location: 'Front Gate' },
      { id: 8, branchId: 3, name: 'Main Gate Exit', gateNumber: 'G008', status: 'active', gateType: 'Exit', location: 'Front Gate' },
      { id: 9, branchId: 3, name: 'Service Gate', gateNumber: 'G009', status: 'active', gateType: 'Service', location: 'Back Gate' }
    ],
    4: [ // Al Jerf Branch
      { id: 10, branchId: 4, name: 'Industrial Entry', gateNumber: 'G010', status: 'active', gateType: 'Entry', location: 'Main Gate' },
      { id: 11, branchId: 4, name: 'Industrial Exit', gateNumber: 'G011', status: 'active', gateType: 'Exit', location: 'Main Gate' }
    ]
  };
  
  res.json(gates[branchId] || [
    { id: 1, branchId: branchId, name: 'Gate 1', gateNumber: 'G001', status: 'active', gateType: 'Entry', location: 'Main' },
    { id: 2, branchId: branchId, name: 'Gate 2', gateNumber: 'G002', status: 'active', gateType: 'Exit', location: 'Main' }
  ]);
});

app.post('/api/gatesConfig', checkTenant, verifyToken, (req, res) => {
  res.json({ id: 3, ...req.body, message: 'Gate created' });
});

app.put('/api/gatesConfig', checkTenant, verifyToken, (req, res) => {
  res.json({ ...req.body, message: 'Gate updated' });
});

// Vehicle Exclusion List
app.get('/api/vehiclesExclList', checkTenant, verifyToken, (req, res) => {
  res.json([
    { 
      id: 1, 
      vehicleNumber: 'A1234BC', 
      vehicleType: 'Car',
      reason: 'Blacklisted - Security violation',
      addedDate: '2024-01-15',
      addedBy: 'Ahmed Al Mansoori',
      status: 'active'
    },
    { 
      id: 2, 
      vehicleNumber: 'B5678DE', 
      vehicleType: 'SUV',
      reason: 'Suspicious activity reported',
      addedDate: '2024-02-20',
      addedBy: 'Fatima Al Zaabi',
      status: 'active'
    },
    { 
      id: 3, 
      vehicleNumber: 'C9012FG', 
      vehicleType: 'Truck',
      reason: 'Unauthorized access attempt',
      addedDate: '2024-03-10',
      addedBy: 'Mohammed Al Suwaidi',
      status: 'active'
    },
    { 
      id: 4, 
      vehicleNumber: 'D3456HI', 
      vehicleType: 'Car',
      reason: 'Expired registration',
      addedDate: '2024-01-05',
      addedBy: 'Ahmed Al Mansoori',
      status: 'active'
    },
    { 
      id: 5, 
      vehicleNumber: 'E7890JK', 
      vehicleType: 'Van',
      reason: 'Multiple violations',
      addedDate: '2024-02-28',
      addedBy: 'Layla Al Nuaimi',
      status: 'active'
    },
    { 
      id: 6, 
      vehicleNumber: 'F1357LM', 
      vehicleType: 'Motorcycle',
      reason: 'Stolen vehicle report',
      addedDate: '2024-03-15',
      addedBy: 'Khalid Al Dhaheri',
      status: 'active'
    }
  ]);
});

app.post('/api/vehiclesExclList', checkTenant, verifyToken, (req, res) => {
  res.json({ id: 3, ...req.body, message: 'Vehicle added to exclusion list' });
});

app.put('/api/vehiclesExclList', checkTenant, verifyToken, (req, res) => {
  res.json({ ...req.body, message: 'Vehicle exclusion updated' });
});

// Dashboard - Uses PUT method as per frontend
app.put('/api/dashboard', checkTenant, verifyToken, (req, res) => {
  // Generate hourly report data (24 hours)
  const hourlyReport = [];
  for (let i = 0; i < 24; i++) {
    const hour = String(i).padStart(2, '0') + ':00';
    hourlyReport.push({ [hour]: Math.floor(Math.random() * 50) + 10 });
  }

  // Dashboard data matching frontend expectations
  res.json({
    entered: 1250,        // Total vehicles entered
    accepted: 1180,         // Accepted entries
    rejected: 70,          // Rejected entries
    entered12: 420,        // Morning session (0-12)
    entered16: 510,        // Afternoon session (12-16)
    entered24: 320,        // Evening session (16-24)
    hrrpt: hourlyReport    // Hourly report data
  });
});

// Reports - Uses PUT method as per frontend
app.put('/api/reports/:type', checkTenant, verifyToken, (req, res) => {
  const { type } = req.params;
  const { start, end, branchSet } = req.body;

  // Validate request
  if (!start || !end || !branchSet || branchSet.length === 0) {
    return res.status(412).json({ error: 'PRECONDITION_FAILED', message: 'Please select all the fields to retrieve reports.' });
  }

  if (type === 'activity') {
    // Generate demo activity report data
    const activities = [];
    const vehicleTypes = ['Car', 'SUV', 'Truck', 'Motorcycle', 'Van'];
    const categories = ['Entry', 'Exit', 'Rejected'];
    const statuses = ['Accepted', 'Rejected', 'Pending'];
    const reasons = ['Valid', 'Invalid QR', 'Blacklisted', 'Expired', 'No Match'];

    // Generate data for the last 7 days
    const startDate = new Date(start);
    const endDate = new Date(end);
    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    for (let i = 0; i < Math.min(100, daysDiff * 15); i++) {
      const eventDate = new Date(startDate);
      eventDate.setDate(startDate.getDate() + Math.floor(i / 15));
      eventDate.setHours(Math.floor(Math.random() * 24));
      eventDate.setMinutes(Math.floor(Math.random() * 60));

      const entryTime = new Date(eventDate);
      const exitTime = new Date(eventDate);
      exitTime.setHours(exitTime.getHours() + Math.floor(Math.random() * 4) + 1);

      activities.push({
        id: i + 1,
        branch: {
          id: branchSet[Math.floor(Math.random() * branchSet.length)],
          name: `Branch ${branchSet[Math.floor(Math.random() * branchSet.length)]}`
        },
        eventDate: eventDate.toISOString(),
        category: categories[Math.floor(Math.random() * categories.length)],
        plateNumber: `A${Math.floor(Math.random() * 9000) + 1000}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        vehicleType: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
        entryTime: entryTime.toISOString(),
        exitTime: exitTime.toISOString(),
        plateCheckDt: new Date(eventDate.getTime() + 1000).toISOString(),
        qrcheckDt: new Date(eventDate.getTime() + 2000).toISOString(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        reason: reasons[Math.floor(Math.random() * reasons.length)]
      });
    }

    // Sort by event date
    activities.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

    res.json(activities);
  } else {
    res.json([]);
  }
});

// Countries
app.get('/api/countries', checkTenant, verifyToken, (req, res) => {
  res.json([
    { id: 1, name: 'United Arab Emirates', code: 'AE' },
    { id: 2, name: 'Saudi Arabia', code: 'SA' },
    { id: 3, name: 'India', code: 'IN' }
  ]);
});

// Start server
app.listen(PORT, () => {
  const host = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
  console.log(`\n🚀 SmartParks Backend Server running on ${host}`);
  console.log(`📡 API Base URL: ${host}/api`);
  console.log(`\n📝 Test Credentials:`);
  console.log(`   Username: admin / Password: Admin123`);
  console.log(`   Username: user / Password: User1234`);
  console.log(`\n✅ Server is ready to accept requests!\n`);
});

