const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  targetClass: {
    type: String,
    required: true,
    enum: ['8', '9', '10', '11', '12', 'college', 'graduate', 'postgraduate', 'all'],
    index: true
  },
  category: {
    type: String,
    enum: ['engineering', 'medical', 'defence', 'board', 'olympiad', 'management', 'government', 'international', 'certification', 'other'],
    default: 'other'
  },
  syllabus: {
    type: String,
    trim: true
  },
  registrationLink: {
    type: String,
    trim: true
  },
  officialWebsite: {
    type: String,
    trim: true
  },
  examDate: {
    type: Date
  },
  registrationDeadline: {
    type: Date
  },
  eligibility: {
    type: String,
    trim: true
  },
  examPattern: {
    type: String,
    trim: true
  },
  registrationFee: {
    type: String,
    trim: true
  },
  importantDates: [{
    event: String,
    date: Date,
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  scrapedData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
examSchema.index({ targetClass: 1, category: 1 });
examSchema.index({ isActive: 1 });

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
