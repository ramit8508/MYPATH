const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for college students
// This stores all the information a college student provides during registration
const collegeStudentSchema = new mongoose.Schema({
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
  phoneNumber: {
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
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true // e.g., "B.Tech", "B.Sc", "B.Com"
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    trim: true // e.g., "Computer Science", "Mechanical Engineering"
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
    trim: true // e.g., "1st Year", "2nd Year"
  },
  collegeName: {
    type: String,
    required: [true, 'College name is required'],
    trim: true
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    trim: true
  },
  
  // Additional Information
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true // e.g., "General", "OBC", "SC", "ST"
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
collegeStudentSchema.pre('save', async function(next) {
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
collegeStudentSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
// This model will be used to interact with the 'collegestudents' collection in MongoDB
const CollegeStudent = mongoose.model('CollegeStudent', collegeStudentSchema);

module.exports = CollegeStudent;
