const jwt = require('jsonwebtoken');
const SchoolStudent = require('../models/SchoolStudent');
const { AppError } = require('../utils/errorHandler');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError('Not authorized to access this route', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await SchoolStudent.findById(decoded.userId).select('-password');

    if (!req.user) {
      throw new AppError('User not found', 404);
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new AppError('Invalid token', 401));
    } else if (error.name === 'TokenExpiredError') {
      next(new AppError('Token expired', 401));
    } else {
      next(error);
    }
  }
};
