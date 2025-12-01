const express = require('express');
const {
  getExamsByClass,
  getExamsByClassAndCategory,
  getCategoriesByClass,
  getExamById,
  searchExams,
  getAllExams,
  getExamStats
} = require('../controllers/examController');

const router = express.Router();

// Public routes
router.get('/class/:targetClass', getExamsByClass);
router.get('/class/:targetClass/category/:category', getExamsByClassAndCategory);
router.get('/class/:targetClass/categories', getCategoriesByClass);
router.get('/search', searchExams);
router.get('/stats', getExamStats);
router.get('/:id', getExamById);
router.get('/', getAllExams);

module.exports = router;
