const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for school students
// This stores all the information a school student provides during registration
const schoolStudentSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Each email can only be used once
    lowercase: true, // Convert to lowercase before saving
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  
  // Academic Information
  grade: {
    type: String, // e.g., "class 10th", "class 11th"
    required: false
  },
  stream: {
    type: String, // e.g., "Science (PCM)", "Commerce"
    required: false
  },
  school: {
    type: String,
    required: [true, 'School name is required'],
    trim: true
  },
  educationBoard: {
    type: String,
    required: [true, 'Education board is required'],
    trim: true // e.g., "CBSE", "ICSE", "State Board"
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    trim: true
  },
  
  // Location Information
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  
  // Metadata - automatically managed by MongoDB
  createdAt: {
    type: Date,
    default: Date.now // Automatically set to current date when created
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Hash the password before saving to database
// This runs automatically before any save operation
schoolStudentSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // Generate a salt (random data) for hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with hashed password in database
// This is used during login to verify the password
schoolStudentSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
// This model will be used to interact with the 'schoolstudents' collection in MongoDB
const SchoolStudent = mongoose.model('SchoolStudent', schoolStudentSchema);

module.exports = SchoolStudent;
