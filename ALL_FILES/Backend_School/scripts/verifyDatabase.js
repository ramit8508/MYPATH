import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exam from '../models/Exam.js';

dotenv.config();

async function verifyDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');
    
    // Count total exams
    const totalCount = await Exam.countDocuments();
    console.log(`📊 Total Exams in Database: ${totalCount}\n`);
    
    // Count by class
    const byClass = await Exam.aggregate([
      { $group: { _id: '$targetClass', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('📚 Exams by Class:');
    byClass.forEach(item => {
      console.log(`  - ${item._id || 'Unknown'}: ${item.count} exams`);
    });
    
    // Count by category
    const byCategory = await Exam.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n🏷️  Exams by Category:');
    byCategory.forEach(item => {
      console.log(`  - ${item._id || 'Other'}: ${item.count} exams`);
    });
    
    // Show some sample exams
    console.log('\n🎓 Sample Exams:');
    const samples = await Exam.find().limit(10).select('name category targetClass officialWebsite');
    samples.forEach((exam, i) => {
      console.log(`\n${i + 1}. ${exam.name}`);
      console.log(`   Category: ${exam.category}`);
      console.log(`   Class: ${exam.targetClass}`);
      console.log(`   Website: ${exam.officialWebsite}`);
    });
    
    await mongoose.connection.close();
    console.log('\n✓ Database verification complete!');
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

verifyDatabase();
