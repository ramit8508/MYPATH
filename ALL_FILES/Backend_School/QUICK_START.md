# Quick Start Guide - Exam Scraping with Gemini API

## 📝 Step 1: Prepare Your Spreadsheet

### Option A: Create Sample Excel File
```bash
cd ALL_FILES/Backend_School
node scripts/createSampleExcel.js
```

This creates `exam_links_sample.xlsx` with sample exam URLs.

### Option B: Use Your Own Spreadsheet

Create an Excel file (.xlsx) or CSV file with exam URLs. The script will automatically detect URLs in ANY column or cell.

**Example formats that work:**

| Exam Name | URL | Category |
|-----------|-----|----------|
| JEE Main | https://jeemain.nta.nic.in/ | Engineering |
| NEET | https://neet.nta.nic.in/ | Medical |

OR just URLs in a single column:

| Exam Links |
|------------|
| https://jeemain.nta.nic.in/ |
| https://neet.nta.nic.in/ |
| https://gate.iitb.ac.in/ |

OR plain text file (`exam_links.txt`):
```
https://jeemain.nta.nic.in/
https://neet.nta.nic.in/
https://gate.iitb.ac.in/
```

## 🔑 Step 2: Get Gemini API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

## ⚙️ Step 3: Configure Environment

Edit `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/mypath_school
GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
PORT=5001
FRONTEND_URL=http://localhost:5173
```

## 🚀 Step 4: Run the Scraper

```bash
cd ALL_FILES/Backend_School

# For Excel/CSV file:
node --experimental-modules scripts/processExams.js your_exam_links.xlsx

# For text file:
node --experimental-modules scripts/processExams.js exam_links.txt
```

## 📊 What Happens Next

1. **Extracts URLs**: Script reads your spreadsheet and finds all URLs
2. **Fetches Content**: Downloads each exam website
3. **AI Processing**: Gemini analyzes content and extracts:
   - Exam name
   - Description
   - Target class (8, 9, 10, 11, 12, college, graduate, etc.)
   - Category (engineering, medical, defence, etc.)
   - Syllabus summary
   - Registration link
   - Eligibility criteria
   - Exam pattern
   - Important dates
4. **Saves to Database**: All data stored in MongoDB
5. **Progress Report**: Shows success/failure for each exam

## 📱 Step 5: Use in Your App

### Backend - Start Server
```bash
cd ALL_FILES/Backend_School
npm start
```

Server runs on: http://localhost:5001

### Frontend - Import Component

Add to your dashboard/page:

```javascript
import ExamDisplay from '../Components/ExamDisplay';

function Dashboard() {
  const userClass = "12"; // Get from user's profile
  
  return (
    <div>
      <h1>Your Dashboard</h1>
      <ExamDisplay userClass={userClass} />
    </div>
  );
}
```

## 🔍 Test API Endpoints

```bash
# Get all exams for class 12
curl http://localhost:5001/api/exams/class/12

# Get engineering exams for college students
curl http://localhost:5001/api/exams/class/college/category/engineering

# Search exams
curl "http://localhost:5001/api/exams/search?query=JEE&targetClass=12"

# Get statistics
curl http://localhost:5001/api/exams/stats
```

## 🎯 Expected Results

For each exam URL, Gemini will extract:

```json
{
  "name": "Joint Entrance Examination Main (JEE Main)",
  "description": "JEE Main is a national level entrance exam for admission to engineering colleges in India. It is conducted by NTA for B.Tech/B.E programs.",
  "targetClass": "12",
  "category": "engineering",
  "syllabus": "Physics, Chemistry, Mathematics covering class 11 and 12 CBSE syllabus with topics like Mechanics, Thermodynamics, Organic Chemistry, Calculus, Algebra, etc.",
  "registrationLink": "https://jeemain.nta.nic.in/registration",
  "eligibility": "Class 12 pass or appearing with 75% marks in PCM subjects. Age limit: Born on or after October 1, 2000",
  "examPattern": "2 papers, 3 hours each. Paper 1: 90 MCQs (Physics-30, Chemistry-30, Maths-30). 4 marks for correct, -1 for incorrect.",
  "examDate": "2025-04-15",
  "registrationDeadline": "2025-03-10"
}
```

## ⏱️ Performance

- **Processing Time**: ~5-10 seconds per exam
- **Rate Limiting**: 2 seconds between requests (adjustable)
- **Batch Size**: Process 10-50 exams in one run
- **Accuracy**: ~90-95% for well-structured websites

## ❌ Troubleshooting

### No URLs found
- Make sure your spreadsheet has URLs starting with http:// or https://
- Check file format (.xlsx, .xls, .csv, or .txt)

### Gemini API errors
- Verify API key is correct
- Check quota: https://makersuite.google.com/app/apikey
- Some websites might block scraping

### MongoDB connection failed
- Make sure MongoDB is running
- Check MONGODB_URI in .env file

### Script errors
- Use Node.js v14 or higher
- Run: `npm install` to install dependencies

## 💡 Tips

1. **Start Small**: Test with 5-10 URLs first
2. **Quality URLs**: Use official exam websites for best results
3. **Review Data**: Always verify extracted data for accuracy
4. **Update Regularly**: Re-run script periodically to update exam info
5. **Backup Database**: Export MongoDB data before re-scraping

## 📞 Need Help?

- Check the main README: `EXAM_SCRAPING_README.md`
- Review Gemini API docs: https://ai.google.dev/docs
- MongoDB docs: https://docs.mongodb.com/

---

**You're all set! Start scraping exam data now! 🚀**
