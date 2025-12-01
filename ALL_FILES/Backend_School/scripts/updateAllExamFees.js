import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const examSchema = new mongoose.Schema({
  name: String,
  description: String,
  targetClass: String,
  category: String,
  registrationFee: String,
  examDate: Date,
  registrationDeadline: Date,
}, { timestamps: true });

const Exam = mongoose.model('Exam', examSchema);

// Comprehensive exam fees with all details provided
const examFees = {
  'ACT Test': '$181.50 - $186.50',
  'ACT': '$181.50 - $186.50',
  'Air Force Common Admission Test (AFCAT)': 'AFCAT Entry: ₹550 (All categories), NCC Special Entry: ₹0',
  'AFCAT': 'AFCAT Entry: ₹550 (All categories), NCC Special Entry: ₹0',
  'AIIMS Entrance Examinations': 'General: ₹1,700-₹1,800, Gen-EWS/OBC-NCL: ₹1,600-₹1,700, SC/ST/PwD: ₹1,000-₹1,100',
  'AIIMS': 'General: ₹1,700-₹1,800, Gen-EWS/OBC-NCL: ₹1,600-₹1,700, SC/ST/PwD: ₹1,000-₹1,100',
  'All India Bar Examination': 'General/OBC: ₹3,560, SC/ST: ₹2,560',
  'TANCET / CEETA-PG 2025': 'General/OBC: ₹1,000, SC/ST: ₹500',
  'TANCET / CEETA-PG 2026': 'General/OBC: ₹1,000, SC/ST: ₹500',
  'SRMJEEE Application 2026': '₹1,400 per phase',
  'SRMJEEE': '₹1,400 per phase',
  'SRM Joint Engineering Entrance Exam 2026': '₹1,400 per phase',
  'SRM Joint Engineering Entrance Examination (UG)': '₹1,400 per phase',
  'AtCoder Regular Contest 211 (Div. 2)': '₹0 (Free)',
  'AtCoder': '₹0 (Free)',
  'Banaras Hindu University Admission Examination': 'UR/OBC-NCL/EWS: ₹500, SC/ST/PwD: ₹250',
  'BITS Pilani PhD Admissions': '₹1,000',
  'IELTS': 'Academic/General: ₹18,000, UKVI: ₹18,250, Life Skills: ₹17,000, OSR: ₹12,000',
  'Cambridge International AS & A Level': '₹8,500 - ₹12,000 per subject',
  'Cambridge': '₹8,500 - ₹12,000 per subject',
  'Chevening Scholarship': '₹0 (Free)',
  'Chevening': '₹0 (Free)',
  'CodeChef Global Coding Contests': '₹0 (Free)',
  'CodeChef': '₹0 (Free)',
  'Codingal Coding Competitions & Hackathons': '₹0 (Free)',
  'Codingal': '₹0 (Free)',
  'SAT': '$111 - $130.98 (₹9,400 - ₹11,500 with tax)',
  'CLAT 2026': 'General/OBC/PwD/NRI: ₹4,000, SC/ST/BPL: ₹3,500',
  'CLAT': 'General/OBC/PwD/NRI: ₹4,000, SC/ST/BPL: ₹3,500',
  'Google Cybersecurity Certificate': '$49/month (₹147-₹294 for 3-6 months)',
  'Google Data Analytics Professional Certificate': '$49/month (₹147-₹294 for 3-6 months)',
  'Central Teacher Eligibility Test (CTET)': 'General/OBC: ₹1,000 (one paper), ₹1,200 (both), SC/ST/PwD: ₹500 (one), ₹600 (both)',
  'CTET': 'General/OBC: ₹1,000 (one paper), ₹1,200 (both), SC/ST/PwD: ₹500 (one), ₹600 (both)',
  'GGSIPU Common Entrance Test 2025': '₹1,500',
  'GGSIPU Common Entrance Test 2026': '₹1,500',
  'GGSIPU': '₹1,500',
  'PhD Programs Admission': 'IITs/IISc: ₹800 (Gen), ₹400 (SC/ST), NITs: ₹1,000 (Gen), ₹500 (SC/ST)',
  'COMMON UNIVERSITY ENTRANCE TEST (UG)': 'Gen: ₹1,000, OBC-NCL/EWS: ₹900, SC/ST/PwD: ₹800',
  'CUET-UG 2025 for B.A. LLB, B.Tech (CSE), B.Pharma Admission at Central University of Punjab': 'Gen: ₹1,000, OBC-NCL/EWS: ₹900, SC/ST/PwD: ₹800',
  'CUET-UG 2026': 'Gen: ₹1,000, OBC-NCL/EWS: ₹900, SC/ST/PwD: ₹800',
  'CUET': 'Gen: ₹1,000, OBC-NCL/EWS: ₹900, SC/ST/PwD: ₹800',
  'DGCA Aviation Personnel Licensing Examinations': 'Regular: ₹2,500, On-Demand: ₹5,000',
  'DGCA': 'Regular: ₹2,500, On-Demand: ₹5,000',
  'Ph.D. Admissions at DJSCE': '₹500 - ₹1,000',
  'GRE General Test': '₹22,000 - ₹22,550 ($265)',
  'GRE': '₹22,000 - ₹22,550 ($265)',
  'TOEFL (Test of English as a Foreign Language)': 'iBT: ₹17,999-₹18,000, Essentials: ₹10,000',
  'TOEFL': 'iBT: ₹17,999-₹18,000, Essentials: ₹10,000',
  'AIST': 'General/OBC/Gen-EWS: ₹600, SC/ST/PwD: ₹300',
  'CUET PG 2025': 'Gen: ₹1,400, OBC-NCL/Gen-EWS: ₹1,200, SC/ST: ₹1,100, PwBD: ₹1,000',
  'CUET PG 2026': 'Gen: ₹1,400, OBC-NCL/Gen-EWS: ₹1,200, SC/ST: ₹1,100, PwBD: ₹1,000',
  'Guru Jambheshwar University of Science & Technology (GJUST) Entrance Examinations 2025-26': 'UG/PG Gen: ₹1,000-₹1,200, SC/BC: ₹250-₹300',
  'Guru Jambheshwar University of Science & Technology (GJUST) Entrance Examinations 2026': 'UG/PG Gen: ₹1,000-₹1,200, SC/BC: ₹250-₹300',
  'GJUST': 'UG/PG Gen: ₹1,000-₹1,200, SC/BC: ₹250-₹300',
  'HackerEarth Assessments & Challenges': '₹0 (Free)',
  'HackerEarth': '₹0 (Free)',
  'Chartered Accountancy Course': 'Foundation: ₹9,200, Intermediate: ₹18,000, Final: ₹22,000, Total: ₹51,200',
  'CA': 'Foundation: ₹9,200, Intermediate: ₹18,000, Final: ₹22,000, Total: ₹51,200',
  'CUET (ICAR-UG) 2025': 'Gen: ₹750-₹1,000, OBC-NCL/EWS: ₹700-₹900, SC/ST/PwD: ₹650-₹800',
  'CUET (ICAR-UG) 2026': 'Gen: ₹750-₹1,000, OBC-NCL/EWS: ₹700-₹900, SC/ST/PwD: ₹650-₹800',
  'Company Secretary Executive Entrance Test (CSEET)': 'General/OBC: ₹2,000, SC/ST/PwD: ₹1,000',
  'CSEET': 'General/OBC: ₹2,000, SC/ST/PwD: ₹1,000',
  'IIAD Admission Exam': '₹2,500',
  'Common Admission Test (CAT)': 'General/EWS: ₹2,600, SC/ST/PwD: ₹1,300',
  'CAT': 'General/EWS: ₹2,600, SC/ST/PwD: ₹1,300',
  'Indian Navy Recruitment': '₹550 + 18% GST (≈₹649)',
  'Joint Entrance Examination (Advanced) 2025': 'Female/SC/ST/PwD: ₹1,600, Others: ₹3,200',
  'Joint Entrance Examination (Advanced) 2026': 'Female/SC/ST/PwD: ₹1,600, Others: ₹3,200',
  'JEE Advanced': 'Female/SC/ST/PwD: ₹1,600, Others: ₹3,200',
  'International Gita Olympiad': '₹150 - ₹300',
  'Lucknow University Admission Entrance Examination 2024-25': 'Regular UG Gen: ₹800, SC/ST: ₹400, Professional Gen: ₹1,000, SC/ST: ₹500',
  'Lucknow University Admission Entrance Examination 2025-26': 'Regular UG Gen: ₹800, SC/ST: ₹400, Professional Gen: ₹1,000, SC/ST: ₹500',
  'LPUNEST 2026': 'Boys: ₹1,000 (soft), ₹1,500 (printed), Girls: ₹500-₹1,000 (soft), ₹1,000-₹1,500 (printed)',
  'LPUNEST': 'Boys: ₹1,000 (soft), ₹1,500 (printed), Girls: ₹500-₹1,000 (soft), ₹1,000-₹1,500 (printed)',
  'The LSAT - Law School Admission Test': '₹3,999 per session, Bundle: ₹7,998',
  'LSAT - Law School Admission Test': '₹3,999 per session, Bundle: ₹7,998',
  'LSAT': '₹3,999 per session, Bundle: ₹7,998',
  'Management Aptitude Test (MAT)': 'Single Mode: ₹2,100, Dual Mode: ₹3,300-₹3,800',
  'MAT': 'Single Mode: ₹2,100, Dual Mode: ₹3,300-₹3,800',
  'GMAT™ Exam': 'Test Center: $275 (₹22,900-₹24,390), Online: $300 (₹25,040-₹26,600)',
  'GMAT': 'Test Center: $275 (₹22,900-₹24,390), Online: $300 (₹25,040-₹26,600)',
  'Medical Counselling Committee (MCC) eCounselling Services': 'General/EWS: ₹11,000, SC/ST/OBC/PwD: ₹5,500',
  'MCC': 'General/EWS: ₹11,000, SC/ST/OBC/PwD: ₹5,500',
  'MHT CET': 'General: ₹1,000, Reserved: ₹800, Orphan/Transgender: ₹600-₹800',
  'National Aptitude Test in Architecture': 'Gen Male: ₹1,750-₹4,500, Gen Female: ₹1,250-₹3,000, SC/ST Male: ₹1,250-₹3,000',
  'NATA': 'Gen Male: ₹1,750-₹4,500, Gen Female: ₹1,250-₹3,000, SC/ST Male: ₹1,250-₹3,000',
  'AILET 2026': 'General/OBC/EWS: ₹3,000, SC/ST/PwD: ₹1,000, BPL: ₹0',
  'AILET': 'General/OBC/EWS: ₹3,000, SC/ST/PwD: ₹1,000, BPL: ₹0',
  'Foreign Medical Graduate Examination (FMGE)': '₹7,080 (₹6,000 + 18% GST)',
  'FMGE': '₹7,080 (₹6,000 + 18% GST)',
  'National Institute of Design B.Des. & M.Des. Admissions': 'Gen/Gen-EWS/OBC-NCL: ₹3,000, Female: ₹2,000, SC/ST: ₹1,500, Overseas: ₹5,000',
  'NID': 'Gen/Gen-EWS/OBC-NCL: ₹3,000, Female: ₹2,000, SC/ST: ₹1,500, Overseas: ₹5,000',
  'Odisha Joint Entrance Examination (OJEE)': 'Single Course: ₹1,000, Multiple: ₹1,500',
  'OJEE': 'Single Course: ₹1,000, Multiple: ₹1,500',
  'I.K. Gujral Punjab Technical University Ph.D. Admission Programme 2025-26 (Summer)': 'Application: ₹2,000, Pre-Registration: ₹20,000, Semester: ₹25,000',
  'I.K. Gujral Punjab Technical University Ph.D. Admission Programme 2026': 'Application: ₹2,000, Pre-Registration: ₹20,000, Semester: ₹25,000',
  'PU B.A./B.Com. LL.B. (Hons.) 5 Years Integrated Course Entrance Exam': 'General: ₹2,710, SC/ST/PwD: ₹1,355',
  'MBA Program Admission, Punjabi University': 'General: ₹1,000, SC/ST: ₹700',
  'National Scholarship Portal Scholarships': '₹0 (Free)',
  'NSP': '₹0 (Free)',
  'Silverzone Olympiads': 'Most Olympiads: ₹150, Reasoning: ₹200, STEM/AI: ₹300-₹325',
  'Symbiosis National Aptitude Test (SNAP)': '₹2,250 per attempt (Max 3 attempts)',
  'SNAP': '₹2,250 per attempt (Max 3 attempts)',
  'Test of Proficiency in Korean (TOPIK)': 'TOPIK I: ₹1,200, TOPIK II: ₹1,500, Both: ₹2,500',
  'TOPIK': 'TOPIK I: ₹1,200, TOPIK II: ₹1,500, Both: ₹2,500',
  'University Grants Commission (UGC)-NET': 'General: ₹1,150, Gen-EWS/OBC-NCL: ₹600, SC/ST/PwD: ₹325',
  'UGC-NET': 'General: ₹1,150, Gen-EWS/OBC-NCL: ₹600, SC/ST/PwD: ₹325',
  'National Science Talent Search Examination': '₹0 (Preparation packages: ₹400-₹826)',
  'NTSE': '₹0 (Preparation packages: ₹400-₹826)',
  'Civil Services Examination': 'General/OBC/EWS Male: ₹100, Female/SC/ST/PwD: ₹0',
  'UPSC Civil Services Examination (IAS)': 'General/OBC/EWS Male: ₹100, Female/SC/ST/PwD: ₹0',
  'UPSC': 'General/OBC/EWS Male: ₹100, Female/SC/ST/PwD: ₹0',
  'Fulbright-Nehru and other Fulbright Fellowships': '₹0 (Free)',
  'Fulbright-Nehru Fellowships for Indian Citizens': '₹0 (Free)',
  'Fulbright': '₹0 (Free)',
  'VITEEE 2026': '₹1,350',
  'Vellore Institute of Technology Engineering Entrance Examination (VITEEE)': '₹1,350',
  'VITEEE': '₹1,350',
  'Visvesvaraya Technological University (VTU) PhD & M.Sc (Engineering) Admissions': '₹1,000 - ₹1,200',
  'VTU': '₹1,000 - ₹1,200',
  'Common Entrance Examination for Design': 'Gen/OBC-NCL/EWS Male: ₹4,000, SC/ST/PwD/Women: ₹2,000',
  'CEED': 'Gen/OBC-NCL/EWS Male: ₹4,000, SC/ST/PwD/Women: ₹2,000',
  'IGNOU Admission Process': 'Registration: ₹300-₹500, Development: ₹200',
  'IGNOU': 'Registration: ₹300-₹500, Development: ₹200',
  'The Rhodes Scholarship': '₹0 (Free)',
  'Rhodes Scholarship': '₹0 (Free)',
  'Undergraduate Common Entrance Examination for Design (UCEED)': 'Women/SC/ST/PwD: ₹2,000, Others: ₹4,000',
  'UCEED': 'Women/SC/ST/PwD: ₹2,000, Others: ₹4,000',
  'Xavier Aptitude Test (XAT)': 'Indian: ₹2,200, NRI/Foreign: ₹5,000',
  'Xavier Aptitude Test (XAT) 2026': 'Basic: ₹2,200, with XLRI programmes: ₹2,600+',
  'XAT': 'Indian: ₹2,200, NRI/Foreign: ₹5,000'
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

async function updateExamDates() {
  const exams = await Exam.find({});
  let updated = 0;
  
  for (const exam of exams) {
    let needsUpdate = false;
    
    // Update 2025 to 2026 in name and description
    if (exam.name && exam.name.includes('2025')) {
      exam.name = exam.name.replace(/2025/g, '2026');
      needsUpdate = true;
    }
    
    if (exam.description && exam.description.includes('2025')) {
      exam.description = exam.description.replace(/2025/g, '2026');
      needsUpdate = true;
    }
    
    // Update dates if in 2025
    if (exam.examDate && new Date(exam.examDate).getFullYear() === 2025) {
      const oldDate = new Date(exam.examDate);
      oldDate.setFullYear(2026);
      exam.examDate = oldDate;
      needsUpdate = true;
    }
    
    if (exam.registrationDeadline && new Date(exam.registrationDeadline).getFullYear() === 2025) {
      const oldDate = new Date(exam.registrationDeadline);
      oldDate.setFullYear(2026);
      exam.registrationDeadline = oldDate;
      needsUpdate = true;
    }
    
    if (needsUpdate) {
      await exam.save();
      updated++;
      console.log(`✓ Updated dates for: ${exam.name}`);
    }
  }
  
  return updated;
}

async function updateAllFees() {
  try {
    await connectDB();
    
    console.log('\n📅 Updating exam dates from 2025 to 2026...');
    const datesUpdated = await updateExamDates();
    console.log(`✓ Updated ${datesUpdated} exams with new dates\n`);
    
    console.log('🔍 Fetching exams from database...');
    const exams = await Exam.find({});
    console.log(`Found ${exams.length} exams\n`);
    
    let updated = 0;
    let notFound = [];
    
    for (const exam of exams) {
      let fee = null;
      
      // Check for exact match
      if (examFees[exam.name]) {
        fee = examFees[exam.name];
      } else {
        // Check for partial match
        for (const [examName, examFee] of Object.entries(examFees)) {
          if (exam.name.toLowerCase().includes(examName.toLowerCase()) || 
              examName.toLowerCase().includes(exam.name.toLowerCase())) {
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
    console.log(`✓ Updated fees: ${updated} exams`);
    console.log(`✓ Updated dates: ${datesUpdated} exams`);
    console.log(`⚠ Fees not found: ${notFound.length} exams\n`);
    
    if (notFound.length > 0) {
      console.log('Exams without fee data:');
      notFound.forEach(name => console.log(`  - ${name}`));
    }
    
    mongoose.connection.close();
    console.log('\n✓ Database connection closed');
  } catch (error) {
    console.error('Error updating:', error);
    process.exit(1);
  }
}

updateAllFees();
