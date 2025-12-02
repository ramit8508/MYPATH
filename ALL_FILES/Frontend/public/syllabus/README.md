# 📚 Syllabus PDFs Folder

## How to Add PDFs

Place your exam syllabus PDF files in this folder with the following names:

### Current PDF Files Expected:
1. `ntse-2025-26.pdf` - NTSE Complete Syllabus
2. `jso-syllabus.pdf` - Junior Science Olympiad Syllabus
3. `kvpy-sample-papers.pdf` - KVPY Sample Question Papers
4. `nmo-guidelines.pdf` - National Mathematics Olympiad Guidelines

### Adding New PDFs:
1. Copy your PDF file to this folder
2. Update the `syllabusData` array in:
   - `Frontend/src/Pages/ContinueAsSchoolStudent/Syllabus.jsx`
   - `Frontend/src/Pages/ContinueAsCollegeStudent/Syllabus.jsx`

### PDF Object Structure:
```javascript
{
  title: "Document Title",
  subtitle: "Exam Name",
  description: "Brief description of the content",
  size: "File size (e.g., 2.1 MB)",
  updated: "Update date (DD/MM/YYYY)",
  type: "SYLLABUS|SAMPLE PAPER|NOTIFICATION",
  badge: "NEW" (optional),
  pdfPath: "/syllabus/your-file-name.pdf",
  officialLink: "https://official-website-link.com"
}
```

## Notes:
- PDFs are served from the public folder
- Files are accessed via the URL: `/syllabus/filename.pdf`
- Keep file sizes reasonable (under 5 MB recommended)
- Use descriptive filenames with hyphens (e.g., `exam-name-2026.pdf`)
