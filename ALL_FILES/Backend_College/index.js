require('dotenv').config();
const app = require('./app');
const connectDB = require('./db/connection');

const PORT = process.env.PORT || 5002;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 College Backend Server is running on port ${PORT}`);
  console.log(`🌐 Access at: http://localhost:${PORT}`);
});
