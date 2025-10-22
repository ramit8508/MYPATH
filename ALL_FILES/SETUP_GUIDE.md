# MYPATH - Full Stack Application Setup Guide

This guide explains the complete backend and frontend integration with MongoDB database.

## 📁 Project Structure

```
MYPATH/
├── Backend_School/          # School students backend (Port 5001)
│   ├── models/
│   │   └── SchoolStudent.js # Mongoose model for school students
│   ├── routes/
│   │   └── auth.js          # Registration & login routes
│   ├── index.js             # Express server setup
│   ├── .env                 # Environment variables (MongoDB, JWT secret)
│   ├── .env.example         # Template for environment variables
│   └── package.json         # Dependencies
│
├── Backend_College/         # College students backend (Port 5002)
│   ├── models/
│   │   └── CollegeStudent.js # Mongoose model for college students
│   ├── routes/
│   │   └── auth.js           # Registration & login routes
│   ├── index.js              # Express server setup
│   ├── .env                  # Environment variables (MongoDB, JWT secret)
│   ├── .env.example          # Template for environment variables
│   └── package.json          # Dependencies
│
└── Frontend/                 # React application
    ├── src/
    │   └── Pages/
    │       ├── ContinueAsSchoolStudent/
    │       │   ├── SecondPageSchool.jsx  # School registration (calls API)
    │       │   └── LoginSchool.jsx       # School login (calls API)
    │       └── ContinueAsCollegeStudent/
    │           ├── FirstPageCollege.jsx  # College registration (calls API)
    │           └── LoginCollege.jsx      # College login (calls API)
    ├── vite.config.js        # Vite config with proxy setup
    └── package.json          # Dependencies
```

## 🚀 How to Run the Application

### Step 1: Start Backend Servers

**Terminal 1 - School Backend:**
```bash
cd D:\MYPATH\ALL_FILES\Backend_School
node index.js
```
✅ Server will start on http://localhost:5001

**Terminal 2 - College Backend:**
```bash
cd D:\MYPATH\ALL_FILES\Backend_College
node index.js
```
✅ Server will start on http://localhost:5002

### Step 2: Start Frontend

**Terminal 3 - Frontend:**
```bash
cd D:\MYPATH\ALL_FILES\Frontend
npm run dev
```
✅ Frontend will start on http://localhost:5173

## 🔄 How the System Works

### Registration Flow (School Student Example)

1. **User fills registration form** → SecondPageSchool.jsx
2. **Form submits data** → `/api/school/auth/register`
3. **Vite proxy forwards** → `http://localhost:5001/api/auth/register`
4. **Backend receives data** → routes/auth.js (POST /register)
5. **Password gets hashed** → bcrypt automatically (model pre-save hook)
6. **Data saved to MongoDB** → Collection: schoolstudents
7. **JWT token generated** → jsonwebtoken creates auth token
8. **Response sent back** → { success: true, token, student data }
9. **Frontend stores token** → localStorage.setItem('authToken', token)
10. **User redirected to login** → /loginschool

### Login Flow (School Student Example)

1. **User enters credentials** → LoginSchool.jsx
2. **Form submits data** → `/api/school/auth/login`
3. **Vite proxy forwards** → `http://localhost:5001/api/auth/login`
4. **Backend finds user** → SchoolStudent.findOne({ email })
5. **Password verified** → bcrypt.compare(password, hashedPassword)
6. **JWT token generated** → New token for this session
7. **Response sent back** → { success: true, token, student data }
8. **Frontend stores everything** → Token + all user data in localStorage
9. **User redirected to dashboard** → /dashboardschool

## 🗄️ Database Structure

### MongoDB Atlas Connection
- **Connection String:** mongodb+srv://24bai70506_db_user:RAMIT@09876rg@mypath.wt00wig.mongodb.net/
- **Database Name (School):** mypath_school
- **Database Name (College):** mypath_college

### Collections

**schoolstudents** (in mypath_school database):
```javascript
{
  _id: ObjectId,
  fullName: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  password: "$2a$10$hashed...", // bcrypt hash
  school: "ABC School",
  educationBoard: "CBSE",
  rollNumber: "12345",
  city: "Mumbai",
  state: "Maharashtra",
  grade: "12th",
  stream: "Science (PCM)",
  createdAt: ISODate,
  updatedAt: ISODate
}
```

**collegestudents** (in mypath_college database):
```javascript
{
  _id: ObjectId,
  fullName: "Jane Smith",
  email: "jane@example.com",
  phoneNumber: "1234567890",
  password: "$2a$10$hashed...", // bcrypt hash
  course: "B.Tech",
  specialization: "Computer Science",
  year: "2nd Year",
  collegeName: "XYZ College",
  rollNumber: "12345",
  category: "General",
  createdAt: ISODate,
  updatedAt: ISODate
}
```

## 🔐 Security Features

1. **Password Hashing:** 
   - All passwords are hashed using bcrypt with salt rounds = 10
   - Plain passwords are NEVER stored in database

2. **JWT Authentication:**
   - Each successful login/registration generates a JWT token
   - Token expires in 30 days
   - Token is stored in localStorage for subsequent requests

3. **CORS Protection:**
   - Backend only accepts requests from http://localhost:5173
   - Prevents unauthorized access from other origins

4. **Input Validation:**
   - Required field validation
   - Email format validation
   - Password length validation (minimum 8 characters)
   - Duplicate email prevention (unique constraint)

## 🌐 API Proxy Configuration

The frontend uses Vite's proxy to route API calls:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api/school': {
      target: 'http://localhost:5001',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/school/, '/api')
    },
    '/api/college': {
      target: 'http://localhost:5002',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/college/, '/api')
    }
  }
}
```

**How it works:**
- Frontend calls: `/api/school/auth/register`
- Proxy rewrites to: `http://localhost:5001/api/auth/register`
- Frontend calls: `/api/college/auth/login`
- Proxy rewrites to: `http://localhost:5002/api/auth/login`

## 📝 Environment Variables

### Backend_School/.env
```env
MONGODB_URI=mongodb+srv://24bai70506_db_user:RAMIT@09876rg@mypath.wt00wig.mongodb.net/
PORT=5001
JWT_SECRET=f4b3e3c2a12a9a0f4d3e7f8a9d6c8b7a...
FRONTEND_URL=http://localhost:5173
```

### Backend_College/.env
```env
MONGODB_URI=mongodb+srv://24bai70506_db_user:RAMIT@09876rg@mypath.wt00wig.mongodb.net/
PORT=5002
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6...
FRONTEND_URL=http://localhost:5173
```

## 🧪 Testing the Application

1. **Start all 3 servers** (2 backends + 1 frontend)
2. **Open browser** → http://localhost:5173
3. **Register as school student:**
   - Go to landing page
   - Click "Continue as School Student"
   - Select grade and stream
   - Fill registration form
   - Submit → Data saved to MongoDB
4. **Login as school student:**
   - Go to login page
   - Enter email and password
   - Submit → JWT token received
   - Dashboard loads with all user data

5. **Same process for college students** on port 5002

## 📦 Installed Packages

### Backend (both School & College):
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `dotenv` - Environment variable management
- `cors` - Cross-origin resource sharing

### Frontend:
- `react` - UI library
- `react-router-dom` - Routing
- `vite` - Build tool

## 🎯 Key Features Implemented

✅ Separate backends for school and college students
✅ MongoDB database integration with Mongoose
✅ Secure password hashing with bcrypt
✅ JWT authentication with 30-day expiration
✅ Vite proxy for seamless API routing
✅ Complete registration and login flow
✅ Error handling and validation
✅ CORS configuration for security
✅ Environment variable management
✅ Humanized comments throughout the code

## 🔧 Troubleshooting

**MongoDB Connection Issues:**
- Verify your MongoDB Atlas connection string is correct
- Check if your IP address is whitelisted in MongoDB Atlas
- Ensure network connectivity

**Backend Not Starting:**
- Check if port 5001/5002 is already in use
- Verify all dependencies are installed (npm install)
- Check .env file exists and has correct values

**Frontend API Errors:**
- Ensure both backend servers are running
- Check browser console for specific error messages
- Verify Vite dev server is running on port 5173

**Login/Registration Failures:**
- Check backend terminal for error logs
- Verify MongoDB connection is established
- Check if email already exists (for registration)
- Verify password is at least 8 characters

## 📚 Next Steps

- Add password reset functionality
- Implement email verification
- Add profile update features
- Create protected routes with JWT middleware
- Add more detailed error messages
- Implement refresh token mechanism
- Add logging system
- Set up production deployment

---

**Your backend is now fully integrated with MongoDB and ready to use!** 🎉
