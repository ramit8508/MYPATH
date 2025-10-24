const jwt = require('jsonwebtoken');
const SchoolStudent = require('../models/SchoolStudent');
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
      phone,
      password,
      school,
      educationBoard,
      rollNumber,
      city,
      state,
      grade,
      stream
    } = req.body;

    if (!fullName || !email || !phone || !password || !school || !educationBoard || !rollNumber || !city || !state) {
      throw new AppError('Please provide all required fields', 400);
    }

    const existingStudent = await SchoolStudent.findOne({ email: email.toLowerCase() });
    if (existingStudent) {
      throw new AppError('A student with this email already exists', 400);
    }

    const student = new SchoolStudent({
      fullName,
      email: email.toLowerCase(),
      phone,
      password,
      school,
      educationBoard,
      rollNumber,
      city,
      state,
      grade,
      stream
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
        phone: student.phone,
        school: student.school,
        educationBoard: student.educationBoard,
        rollNumber: student.rollNumber,
        city: student.city,
        state: student.state,
        grade: student.grade,
        stream: student.stream
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

    const student = await SchoolStudent.findOne({ email: email.toLowerCase() });
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
        phone: student.phone,
        school: student.school,
        educationBoard: student.educationBoard,
        rollNumber: student.rollNumber,
        city: student.city,
        state: student.state,
        grade: student.grade,
        stream: student.stream
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const student = req.user;

    res.json({
      success: true,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        phone: student.phone,
        school: student.school,
        educationBoard: student.educationBoard,
        rollNumber: student.rollNumber,
        city: student.city,
        state: student.state,
        grade: student.grade,
        stream: student.stream
      }
    });
  } catch (error) {
    next(error);
  }
};
