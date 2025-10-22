# MYPATH School Backend

Backend server for school student registration and authentication.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```

Edit `.env` file:
- `MONGODB_URI`: Your MongoDB connection string (default: mongodb://localhost:27017/mypath_school)
- `PORT`: Server port (default: 5001)
- `JWT_SECRET`: Secret key for JWT tokens (generate a random string)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:5173)

### 3. Start MongoDB
Make sure MongoDB is running locally:
```bash
# On Windows (if installed as service)
net start MongoDB

# Or start mongod manually
mongod
```

### 4. Start the Server
```bash
node index.js
```

Server will start on port 5001 (or the port specified in .env)

## API Endpoints

### POST /api/auth/register
Register a new school student

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123",
  "school": "ABC School",
  "educationBoard": "CBSE",
  "rollNumber": "12345",
  "city": "Mumbai",
  "state": "Maharashtra",
  "grade": "12th",
  "stream": "Science (PCM)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "jwt_token_here",
  "student": {
    "id": "student_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    ...
  }
}
```

### POST /api/auth/login
Login with email and password

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "student": {
    "id": "student_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    ...
  }
}
```

### GET /api/health
Health check endpoint to verify server is running

**Response:**
```json
{
  "status": "OK",
  "message": "School Backend Server is running",
  "timestamp": "2025-10-22T..."
}
```

## Database Schema

**SchoolStudent Model:**
- fullName: String (required)
- email: String (required, unique)
- phone: String (required)
- password: String (required, hashed with bcrypt)
- school: String (required)
- educationBoard: String (required)
- rollNumber: String (required)
- city: String (required)
- state: String (required)
- grade: String (optional)
- stream: String (optional)
- createdAt: Date (auto-generated)
- updatedAt: Date (auto-generated)

## Security Features

- Passwords are hashed using bcrypt before storing in database
- JWT tokens are used for authentication (expires in 30 days)
- CORS is configured to allow requests only from frontend URL
- Input validation on all required fields
- Unique email constraint prevents duplicate registrations

## Development

To test the API, you can use tools like:
- Postman
- Thunder Client (VS Code extension)
- curl commands
- Frontend application (configured with proxy)
