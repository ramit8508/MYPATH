const jwt = require('jsonwebtoken');
const CollegeStudent = require('../models/CollegeStudent');
const { AppError } = require('../utils/errorHandler');

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

exports.register = async (req, res, next) => {
  try {
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

    if (!fullName || !email || !phoneNumber || !password || !course || !specialization || !year || !collegeName || !rollNumber || !category) {
      throw new AppError('Please provide all required fields', 400);
    }

    const existingStudent = await CollegeStudent.findOne({ email: email.toLowerCase() });
    if (existingStudent) {
      throw new AppError('A student with this email already exists', 400);
    }

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

    await student.save();

    const token = generateToken(student._id);

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
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const student = await CollegeStudent.findOne({ email: email.toLowerCase() });
    if (!student) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await student.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = generateToken(student._id);

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
    next(error);
  }
};
