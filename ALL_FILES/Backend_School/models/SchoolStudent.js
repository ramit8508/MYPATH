const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schoolStudentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
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
  grade: {
    type: String,
    required: false
  },
  stream: {
    type: String,
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
    trim: true
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    trim: true
  },
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
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

schoolStudentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

schoolStudentSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const SchoolStudent = mongoose.model('SchoolStudent', schoolStudentSchema);

module.exports = SchoolStudent;
