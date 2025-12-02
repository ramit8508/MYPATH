const mongoose = require('mongoose');
const Exam = require('../models/Exam');
require('dotenv').config();

const fixExamTargetClasses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Define exam patterns and their correct target classes
    const examMappings = [
      // Postgraduate/PhD (Must check first - most specific)
      { pattern: /PhD|Ph\.D|Doctoral|CUET-PG|CUET PG|Postgraduate|Post Graduate/i, targetClass: 'postgraduate', category: 'other' },
      
      // Management (Graduate level - MBA/PGDM)
      { pattern: /^CAT|^MAT|^XAT|^GMAT|^SNAP|^NMAT|^CMAT|^ATMA|Management Aptitude Test/i, targetClass: 'graduate', category: 'management' },
      
      // Law Exams (12th pass for integrated, Graduate for LLM)
      { pattern: /CLAT|AILET.*2026|All India Bar/i, targetClass: '12', category: 'other' },
      { pattern: /LSAT|LLM/i, targetClass: 'graduate', category: 'other' },
      
      // Professional Certifications (Graduate level)
      { pattern: /Chartered Accountant|^CA |ICAI|Company Secretary|CSEET|Google.*Certificate/i, targetClass: 'graduate', category: 'certification' },
      
      // Medical License (Graduate level - for doctors)
      { pattern: /FMGE|Foreign Medical Graduate|Medical Counselling/i, targetClass: 'graduate', category: 'medical' },
      
      // Medical Entrance (12th pass required)
      { pattern: /NEET|AIIMS Entrance/i, targetClass: '12', category: 'medical' },
      
      // Engineering Entrance (12th pass required)
      { pattern: /JEE|Joint Entrance.*Advanced|BITSAT|VITEEE|SRMJEEE|SRM Joint Engineering|WBJEE|MHT-CET|OJEE/i, targetClass: '12', category: 'engineering' },
      
      // NTSE (Class 10 specific)
      { pattern: /NTSE|National Talent Search Examination/i, targetClass: '10', category: 'olympiad' },
      
      // Olympiads for Classes 8-12
      { pattern: /Junior.*Olympiad/i, targetClass: '10', category: 'olympiad' },
      { pattern: /National.*Olympiad|Science.*Olympiad|NSO|Gita Olympiad|Silverzone/i, targetClass: '12', category: 'olympiad' },
      
      // KVPY (Classes 11-12)
      { pattern: /KVPY|Kishore Vaigyanik/i, targetClass: '12', category: 'olympiad' },
      
      // Coding Competitions (Open to all)
      { pattern: /AtCoder|CodeChef|Codingal|HackerEarth/i, targetClass: 'all', category: 'olympiad' },
      
      // Government Jobs (Graduate level)
      { pattern: /UPSC|SSC|Civil Services|CTET|UGC-NET/i, targetClass: 'graduate', category: 'government' },
      
      // Defence (12th for NDA, Graduate for others)
      { pattern: /NDA/i, targetClass: '12', category: 'defence' },
      { pattern: /AFCAT|Indian Navy|CDS/i, targetClass: 'graduate', category: 'defence' },
      
      // International Tests/Scholarships
      { pattern: /Chevening|Rhodes|Fulbright/i, targetClass: 'graduate', category: 'international' },
      { pattern: /TOEFL|IELTS|GRE|Cambridge.*A Level/i, targetClass: 'college', category: 'international' },
      { pattern: /SAT|ACT Test/i, targetClass: '12', category: 'international' },
      
      // University/College Admissions (12th pass)
      { pattern: /BHU|CUET \(UG\)|CUET-UG|LPUNEST|GJUST|Lucknow University|GGSIPU|IIAD|NATA|UCEED/i, targetClass: '12', category: 'other' },
      
      // Open Distance Learning
      { pattern: /IGNOU/i, targetClass: 'all', category: 'other' },
      
      // Aviation (Graduate/Professional)
      { pattern: /DGCA/i, targetClass: 'graduate', category: 'certification' },
      
      // National Scholarship
      { pattern: /National Scholarship Portal/i, targetClass: 'all', category: 'other' }
    ];

    let updatedCount = 0;
    const allExams = await Exam.find({});
    
    console.log(`\nFound ${allExams.length} exams in database`);
    console.log('\nUpdating exam target classes...\n');

    for (const exam of allExams) {
      let updated = false;
      
      for (const mapping of examMappings) {
        if (mapping.pattern.test(exam.name) || mapping.pattern.test(exam.description)) {
          // Update if different
          if (exam.targetClass !== mapping.targetClass || exam.category !== mapping.category) {
            console.log(`Updating: ${exam.name}`);
            console.log(`  From: targetClass="${exam.targetClass}", category="${exam.category}"`);
            console.log(`  To:   targetClass="${mapping.targetClass}", category="${mapping.category}"`);
            
            exam.targetClass = mapping.targetClass;
            exam.category = mapping.category;
            await exam.save();
            updatedCount++;
            updated = true;
            break;
          }
        }
      }
      
      if (!updated) {
        console.log(`No change: ${exam.name} (targetClass="${exam.targetClass}", category="${exam.category}")`);
      }
    }

    console.log(`\n✅ Updated ${updatedCount} exams successfully!`);
    
    // Show summary
    console.log('\n📊 Summary by Target Class:');
    const summary = await Exam.aggregate([
      { $group: { _id: '$targetClass', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    summary.forEach(item => {
      console.log(`  ${item._id}: ${item.count} exams`);
    });

  } catch (error) {
    console.error('Error fixing exam target classes:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
};

fixExamTargetClasses();
