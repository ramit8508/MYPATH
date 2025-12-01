# Exam Data Scraping System with Gemini API

This system automatically scrapes exam information from websites using Google's Gemini API and stores it in MongoDB for dynamic display based on user class selection.

## 🎯 Features

- **Automated Scraping**: Uses Gemini AI to extract structured exam data from any exam website
- **Smart Classification**: Automatically categorizes exams by class level (8-12, college, graduate, etc.)
- **RESTful API**: Well-structured endpoints to fetch exams filtered by class and category
- **Database Storage**: MongoDB integration for persistent exam data
- **Batch Processing**: Process multiple exam URLs efficiently with rate limiting

## 📋 Prerequisites

1. **MongoDB** - Running instance (local or cloud)
2. **Gemini API Key** - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Node.js** - Version 14 or higher

## 🚀 Setup Instructions

### 1. Configure Environment Variables

Add to your `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/mypath_school
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=5001
FRONTEND_URL=http://localhost:5173
```

### 2. Prepare Exam Links

Create or edit `exam_links.txt` with exam URLs (one per line):

```
https://jeemain.nta.nic.in/
https://neet.nta.nic.in/
https://gate.iitb.ac.in/
https://www.upsc.gov.in/
https://olympiads.hbcse.tifr.res.in/
```

### 3. Run the Scraping Script

```bash
cd ALL_FILES/Backend_School
node --experimental-modules scripts/processExams.js exam_links.txt
```

The script will:
1. Read all URLs from the file
2. Fetch webpage content for each URL
3. Use Gemini API to extract structured exam data
4. Save to MongoDB database
5. Show progress and statistics

## 📊 Database Schema

The `Exam` model stores:

```javascript
{
  name: String,              // Exam name (e.g., "JEE Main")
  description: String,       // Brief description
  targetClass: String,       // "8", "9", "10", "11", "12", "college", etc.
  category: String,          // engineering, medical, defence, etc.
  syllabus: String,          // Syllabus summary
  registrationLink: String,  // Registration URL
  officialWebsite: String,   // Official website
  examDate: Date,           // Exam date
  registrationDeadline: Date,
  eligibility: String,
  examPattern: String,
  isActive: Boolean,
  timestamps: true
}
```

## 🔌 API Endpoints

### Get Exams by Class
```
GET /api/exams/class/:targetClass
```
Example: `/api/exams/class/12` returns all exams for class 12 students

### Get Exams by Class and Category
```
GET /api/exams/class/:targetClass/category/:category
```
Example: `/api/exams/class/college/category/engineering`

### Get Categories for Class
```
GET /api/exams/class/:targetClass/categories
```
Returns all available categories for a specific class

### Search Exams
```
GET /api/exams/search?query=JEE&targetClass=12
```

### Get Single Exam
```
GET /api/exams/:id
```

### Get Exam Statistics
```
GET /api/exams/stats
```

## 💻 Frontend Integration

### Example: Fetch Exams on Signup

```javascript
// In your signup/dashboard component
const fetchExamsForUser = async (userClass) => {
  try {
    const response = await fetch(
      `http://localhost:5001/api/exams/class/${userClass}`
    );
    const data = await response.json();
    
    if (data.success) {
      setExams(data.data);
      console.log(`Found ${data.count} exams for class ${userClass}`);
    }
  } catch (error) {
    console.error('Error fetching exams:', error);
  }
};

// Call when user selects class during signup
useEffect(() => {
  if (selectedClass) {
    fetchExamsForUser(selectedClass);
  }
}, [selectedClass]);
```

### Example: Display Exams by Category

```javascript
const ExamList = ({ userClass }) => {
  const [exams, setExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Fetch categories
    fetch(`http://localhost:5001/api/exams/class/${userClass}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data.data));
    
    // Fetch exams
    const url = selectedCategory === 'all' 
      ? `http://localhost:5001/api/exams/class/${userClass}`
      : `http://localhost:5001/api/exams/class/${userClass}/category/${selectedCategory}`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => setExams(data.data));
  }, [userClass, selectedCategory]);

  return (
    <div>
      <h2>Exams for Class {userClass}</h2>
      
      {/* Category Filter */}
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Exam Cards */}
      <div className="exam-grid">
        {exams.map(exam => (
          <div key={exam._id} className="exam-card">
            <h3>{exam.name}</h3>
            <p>{exam.description}</p>
            <span className="category">{exam.category}</span>
            {exam.registrationLink && (
              <a href={exam.registrationLink} target="_blank">
                Register Now
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 🔧 Customization

### Modify Target Classes

Edit `models/Exam.js` to add/remove class levels:

```javascript
targetClass: {
  type: String,
  enum: ['8', '9', '10', '11', '12', 'college', 'graduate', 'postgraduate', 'all']
}
```

### Modify Categories

```javascript
category: {
  type: String,
  enum: ['engineering', 'medical', 'defence', 'board', 'olympiad', ...]
}
```

### Adjust Rate Limiting

In `scripts/processExams.js`, change delay between requests:

```javascript
await geminiService.processMultipleExams(urls, 3000); // 3 seconds between requests
```

## 📝 Notes

- **Rate Limits**: Gemini API has rate limits. The script includes 2-second delays between requests.
- **Token Limits**: Large webpages are truncated to 15,000 characters to avoid token limits.
- **Cost**: Gemini Pro is free with generous limits, but monitor your usage.
- **Accuracy**: AI extraction is ~90-95% accurate. Review critical data manually.

## 🐛 Troubleshooting

### "Module not found" errors
Make sure all dependencies are installed:
```bash
npm install axios cheerio mongoose dotenv
```

### Gemini API errors
- Check your API key is correct
- Verify your API quota hasn't been exceeded
- Ensure you're using the correct endpoint

### No exams scraped
- Check if URLs are accessible
- Verify the website isn't blocking bots
- Check Gemini API response for errors

## 📈 Next Steps

1. **Schedule Updates**: Use cron jobs to update exam data periodically
2. **Admin Panel**: Build UI to manually review/edit scraped data
3. **Notifications**: Send alerts when new exams are added
4. **Search**: Implement full-text search for exam names
5. **Analytics**: Track which exams users view most

## 🤝 Support

For issues or questions, contact the development team.

---

**Built with ❤️ for MYPATH**
