const express = require('express');
const jwt = require('jsonwebtoken');
const CollegeStudent = require('../models/CollegeStudent');

const router = express.Router();

// Helper function to generate JWT token
// This creates a secure token that identifies the user
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, // Payload - data stored in the token
    process.env.JWT_SECRET, // Secret key for signing
    { expiresIn: '30d' } // Token expires in 30 days
  );
};

// POST /api/auth/register
// Register a new college student
router.post('/register', async (req, res) => {
  try {
    // Extract all fields from request body
    const {
      fullName,
      email,
      phoneNumber,
      password,
      course,
      specialization,
      year,
      collegeName,
      rollNumber,
      category
    } = req.body;

    // Validate that all required fields are provided
    if (!fullName || !email || !phoneNumber || !password || !course || !specialization || !year || !collegeName || !rollNumber || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if a student with this email already exists
    const existingStudent = await CollegeStudent.findOne({ email: email.toLowerCase() });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email already exists'
      });
    }

    // Create new student record
    // Password will be automatically hashed by the model's pre-save hook
    const student = new CollegeStudent({
      fullName,
      email: email.toLowerCase(),
      phoneNumber,
      password,
      course,
      specialization,
      year,
      collegeName,
      rollNumber,
      category
    });

    // Save student to database
    await student.save();

    // Generate JWT token for the new student
    const token = generateToken(student._id);

    // Send success response with token and student data
    // We exclude the password from the response for security
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        phoneNumber: student.phoneNumber,
        course: student.course,
        specialization: student.specialization,
        year: student.year,
        collegeName: student.collegeName,
        rollNumber: student.rollNumber,
        category: student.category
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(err => err.message).join(', ')
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Error during registration. Please try again.'
    });
  }
});

// POST /api/auth/login
// Login an existing college student
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate that email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find student by email
    const student = await CollegeStudent.findOne({ email: email.toLowerCase() });
    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if password matches using the comparePassword method
    const isPasswordValid = await student.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token for the logged-in student
    const token = generateToken(student._id);

    // Send success response with token and student data
    res.json({
      success: true,
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        phoneNumber: student.phoneNumber,
        course: student.course,
        specialization: student.specialization,
        year: student.year,
        collegeName: student.collegeName,
        rollNumber: student.rollNumber,
        category: student.category
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login. Please try again.'
    });
  }
});

module.exports = router;
