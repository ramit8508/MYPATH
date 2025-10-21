# MYPATH Backend API

Backend server for MYPATH - Your Personalized Academic Journey platform.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Navigate to Backend directory
```bash
cd ALL_FILES/Backend
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Base URL
- Development: `http://localhost:5000`
- Production: TBD

### Available Routes

#### General
- `GET /` - API welcome message
- `GET /health` - Health check

#### Users (Coming Soon)
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile

#### Exams (Coming Soon)
- `GET /api/exams` - Get all exams
- `GET /api/exams/:id` - Get exam details
- `POST /api/exams` - Create new exam

#### Notifications (Coming Soon)
- `GET /api/notifications` - Get all notifications
- `POST /api/notifications` - Create notification

## 🛠️ Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
Backend/
├── server.js           # Entry point
├── package.json        # Dependencies
├── .env.example        # Environment template
├── .gitignore          # Git ignore rules
├── models/             # Database models (coming soon)
├── routes/             # API routes (coming soon)
├── controllers/        # Route controllers (coming soon)
├── middleware/         # Custom middleware (coming soon)
└── config/             # Configuration files (coming soon)
```

## 🔒 Security

- JWT tokens for authentication
- Password hashing with bcryptjs
- CORS enabled for frontend
- Environment variables for sensitive data

## 📝 Environment Variables

Create a `.env` file with:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

## 👨‍💻 Developer

**Ramit Goyal**
- Email: ramigoyal1987@gmail.com
- GitHub: [@ramit8508](https://github.com/ramit8508)

## 📄 License

MIT
