const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(e => e.message).join(', ');
    error.statusCode = 400;
    error.message = message;
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    error.statusCode = 400;
    error.message = `${field} already exists`;
  }

  if (err.name === 'CastError') {
    error.statusCode = 400;
    error.message = 'Invalid ID format';
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
