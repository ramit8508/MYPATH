import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

// Import Exam model
const examSchema = new mongoose.Schema({
  name: String,
  description: String,
  targetClass: String,
  category: String,
  syllabus: String,
  registrationLink: String,
  officialWebsite: String,
  examDate: Date,
  registrationDeadline: Date,
  eligibility: String,
  examPattern: String,
  registrationFee: String,
}, { timestamps: true });

const Exam = mongoose.model('Exam', examSchema);

// Common exam fees (manually curated from research)
const knownFees = {
  'JEE Main': '₹1000 (Gen/OBC-NCL), ₹500 (SC/ST/PWD)',
  'JEE Advanced': '₹2800 (Gen/OBC-NCL), ₹1400 (SC/ST/PWD)',
  'NEET': '₹1700 (Gen/EWS/OBC-NCL), ₹1000 (SC/ST/PWD)',
  'CUET': '₹800 per domain',
  'GATE': '₹1700 (Gen/OBC-NCL), ₹850 (SC/ST/PWD)',
  'CAT': '₹2500 (Gen/EWS), ₹1250 (SC/ST/PWD)',
  'CLAT': '₹4000 (Gen/OBC-NCL), ₹2000 (SC/ST/PWD)',
  'NDA': '₹100',
  'CDS': '₹200',
  'AFCAT': '₹250',
  'UPSC Civil Services': '₹100',
  'SSC CGL': '₹100',
  'IBPS PO': '₹850 (Gen/OBC), ₹175 (SC/ST/PWD)',
  'SAT': '$60 (without essay), $85 (with essay)',
  'ACT': '$63 (without writing), $88 (with writing)',
  'GRE': '$213',
  'GMAT': '$275',
  'TOEFL': '$180-$190',
  'IELTS': '₹16,250',
  'NTSE': '₹0',
  'IMO': '₹125',
  'NSO': '₹125',
  'NCO': '₹125',
  'KVPY': '₹0',
  'BITSAT': '₹3400 (Boys), ₹2900 (Girls)',
  'VITEEE': '₹1150',
  'SRMJEEE': '₹1400',
  'COMEDK UGET': '₹1800',
  'MHT CET': '₹1050',
  'TS EAMCET': '₹1400 (Gen), ₹1000 (SC/ST)',
  'AP EAMCET': '₹1400 (Gen), ₹1000 (SC/ST)',
  'WBJEE': '₹600 (Gen), ₹550 (SC/ST)',
  'KEAM': '₹1350 (Gen), ₹650 (SC/ST)',
  'AIIMS': '₹1600 (Gen/OBC), ₹800 (SC/ST/PWD)',
  'JIPMER': '₹1500 (Gen/OBC), ₹750 (SC/ST)',
  'CBSE Board': '₹0',
  'ICSE': '₹0',
  'ISC': '₹0',
  'XAT': '₹2000',
  'SNAP': '₹1950',
  'NMAT': '₹2300',
  'MAT': '₹1550',
  'CMAT': '₹1600'
};

async function connectDB() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://ramitsharma8508:RAMIT%408508@mypath.cclnd.mongodb.net/mypath_school?retryWrites=true&w=majority&appName=MYPATH';
    
    await mongoose.connect(mongoURI);
    console.log('✓ Connected to MongoDB');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  }
}

async function updateExamFees() {
  try {
    await connectDB();
    
    console.log('\n🔍 Fetching exams from database...');
    const exams = await Exam.find({});
    console.log(`Found ${exams.length} exams\n`);
    
    let updated = 0;
    let notFound = [];
    
    for (const exam of exams) {
      let fee = null;
      
      // Check for exact match
      if (knownFees[exam.name]) {
        fee = knownFees[exam.name];
      } else {
        // Check for partial match
        for (const [examName, examFee] of Object.entries(knownFees)) {
          if (exam.name.includes(examName) || examName.includes(exam.name)) {
            fee = examFee;
            break;
          }
        }
      }
      
      if (fee) {
        exam.registrationFee = fee;
        await exam.save();
        console.log(`✓ Updated ${exam.name}: ${fee}`);
        updated++;
      } else {
        notFound.push(exam.name);
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`✓ Updated: ${updated} exams`);
    console.log(`⚠ Not found: ${notFound.length} exams\n`);
    
    if (notFound.length > 0) {
      console.log('Exams without fee data:');
      notFound.forEach(name => console.log(`  - ${name}`));
    }
    
    mongoose.connection.close();
    console.log('\n✓ Database connection closed');
  } catch (error) {
    console.error('Error updating fees:', error);
    process.exit(1);
  }
}

updateExamFees();
