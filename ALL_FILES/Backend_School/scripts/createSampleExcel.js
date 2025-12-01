const XLSX = require('xlsx');

// Create a sample Excel file with exam links
const sampleData = [
  ['Exam Name', 'URL', 'Notes'],
  ['JEE Main', 'https://jeemain.nta.nic.in/', 'Engineering entrance exam'],
  ['NEET', 'https://neet.nta.nic.in/', 'Medical entrance exam'],
  ['GATE', 'https://gate.iitb.ac.in/', 'Graduate engineering exam'],
  ['CAT', 'https://iimcat.ac.in/', 'MBA entrance exam'],
  ['UPSC Civil Services', 'https://www.upsc.gov.in/', 'Government job exam'],
  ['SSC CGL', 'https://ssc.nic.in/', 'Staff Selection Commission'],
  ['NTSE', 'https://ncert.nic.in/ntse.html', 'National Talent Search Exam'],
  ['NDA', 'https://www.upsc.gov.in/examinations/nda', 'Defence forces exam'],
  ['IELTS', 'https://www.ielts.org/', 'International English test'],
  ['GRE', 'https://www.ets.org/gre', 'Graduate Record Examination']
];

// Create workbook and worksheet
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(sampleData);

// Add worksheet to workbook
XLSX.utils.book_append_sheet(wb, ws, 'Exam Links');

// Write to file
XLSX.writeFile(wb, 'exam_links_sample.xlsx');

console.log('✓ Sample Excel file created: exam_links_sample.xlsx');
console.log('You can add your exam URLs to this file and then run:');
console.log('node scripts/processExams.js exam_links_sample.xlsx');
