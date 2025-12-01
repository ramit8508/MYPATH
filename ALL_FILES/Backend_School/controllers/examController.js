const Exam = require('../models/Exam');

// Get all exams filtered by class
const getExamsByClass = async (req, res) => {
  try {
    const { targetClass } = req.params;
    
    const validClasses = ['8', '9', '10', '11', '12', 'college', 'graduate', 'postgraduate', 'all'];
    if (!validClasses.includes(targetClass)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid class. Must be one of: ' + validClasses.join(', ')
      });
    }
    
    // Find exams for specific class or 'all'
    const exams = await Exam.find({
      $or: [
        { targetClass: targetClass },
        { targetClass: 'all' }
      ],
      isActive: true
    }).sort({ name: 1 });
    
    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams
    });
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exams',
      error: error.message
    });
  }
};

// Get exams by class and category
const getExamsByClassAndCategory = async (req, res) => {
  try {
    const { targetClass, category } = req.params;
    
    const exams = await Exam.find({
      $or: [
        { targetClass: targetClass },
        { targetClass: 'all' }
      ],
      category: category,
      isActive: true
    }).sort({ name: 1 });
    
    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams
    });
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exams',
      error: error.message
    });
  }
};

// Get all categories for a class
const getCategoriesByClass = async (req, res) => {
  try {
    const { targetClass } = req.params;
    
    const categories = await Exam.distinct('category', {
      $or: [
        { targetClass: targetClass },
        { targetClass: 'all' }
      ],
      isActive: true
    });
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};

// Get single exam by ID
const getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const exam = await Exam.findById(id);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: exam
    });
  } catch (error) {
    console.error('Error fetching exam:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exam',
      error: error.message
    });
  }
};

// Search exams by name
const searchExams = async (req, res) => {
  try {
    const { query, targetClass } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const searchFilter = {
      name: { $regex: query, $options: 'i' },
      isActive: true
    };
    
    if (targetClass) {
      searchFilter.$or = [
        { targetClass: targetClass },
        { targetClass: 'all' }
      ];
    }
    
    const exams = await Exam.find(searchFilter).sort({ name: 1 }).limit(20);
    
    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams
    });
  } catch (error) {
    console.error('Error searching exams:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search exams',
      error: error.message
    });
  }
};

// Get all exams (admin)
const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams
    });
  } catch (error) {
    console.error('Error fetching all exams:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exams',
      error: error.message
    });
  }
};

// Get exam statistics
const getExamStats = async (req, res) => {
  try {
    const stats = await Exam.aggregate([
      {
        $group: {
          _id: '$targetClass',
          count: { $sum: 1 },
          categories: { $addToSet: '$category' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    const totalExams = await Exam.countDocuments({ isActive: true });
    
    res.status(200).json({
      success: true,
      data: {
        total: totalExams,
        byClass: stats
      }
    });
  } catch (error) {
    console.error('Error fetching exam stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
};

module.exports = {
  getExamsByClass,
  getExamsByClassAndCategory,
  getCategoriesByClass,
  getExamById,
  searchExams,
  getAllExams,
  getExamStats
};
