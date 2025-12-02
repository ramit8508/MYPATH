import React from 'react'
import "../../Styles/Syllabus.css"

export default function SyllabusSchool() {
  // Get userGrade from localStorage and extract the class number
  const userGrade = localStorage.getItem('userGrade') || 'class 10th';
  const userClass = userGrade.replace('class ', '').replace('th', '') || '10';

  const allSyllabusData = {
    '8': [
      {
        title: "Complete Syllabus",
        subtitle: "Silverzone Olympiads - Class 8",
        description: "Syllabus for various Silverzone olympiads including Science, Math, Computer, and English for Class 8.",
        size: "1.8 MB",
        updated: "02/12/2025",
        type: "SYLLABUS",
        badge: "NEW",
        pdfUrl: "https://silverzone.org/",
        officialLink: "https://silverzone.org/"
      },
      {
        title: "Coding Competition",
        subtitle: "CodeChef & AtCoder Contests",
        description: "Complete guide for participating in CodeChef and AtCoder coding competitions for beginners.",
        size: "1.2 MB",
        updated: "01/12/2025",
        type: "NOTIFICATION",
        pdfUrl: "https://www.codechef.com/",
        officialLink: "https://www.codechef.com/"
      }
    ],
    '9': [
      {
        title: "Olympiad Syllabus",
        subtitle: "Silverzone Olympiads - Class 9",
        description: "Syllabus for various Silverzone olympiads including Science, Math, Computer, and English for Class 9.",
        size: "1.9 MB",
        updated: "02/12/2025",
        type: "SYLLABUS",
        badge: "NEW",
        pdfUrl: "https://silverzone.org/",
        officialLink: "https://silverzone.org/"
      },
      {
        title: "Science Olympiad",
        subtitle: "Junior Science Olympiad - Class 9",
        description: "Detailed syllabus covering Physics, Chemistry, Biology, and Mathematics for Class 9.",
        size: "2.1 MB",
        updated: "28/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://www.unifiedcouncil.com/",
        officialLink: "https://www.unifiedcouncil.com/"
      }
    ],
    '10': [
      {
        title: "Complete Syllabus 2025-26",
        subtitle: "NTSE (National Talent Search Examination)",
        description: "Comprehensive syllabus for Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT) for Class 10 students.",
        size: "1.8 MB",
        updated: "02/12/2025",
        type: "SYLLABUS",
        badge: "NEW",
        pdfUrl: "https://ncert.nic.in/",
        officialLink: "https://ncert.nic.in/"
      },
      {
        title: "Examination Guidelines",
        subtitle: "National Mathematics Olympiad",
        description: "Official guidelines and syllabus for mathematics olympiad covering algebra, geometry, and number theory.",
        size: "1.3 MB",
        updated: "01/12/2025",
        type: "NOTIFICATION",
        pdfUrl: "https://www.mtai.org.in/",
        officialLink: "https://www.mtai.org.in/"
      },
      {
        title: "Exam Pattern & Syllabus",
        subtitle: "International Gita Olympiad",
        description: "Complete syllabus for Bhagavad Gita knowledge test covering all chapters and verses.",
        size: "1.5 MB",
        updated: "28/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://gitaolympiad.com/",
        officialLink: "https://gitaolympiad.com/"
      },
      {
        title: "Complete Syllabus",
        subtitle: "Silverzone Olympiads - Class 10",
        description: "Syllabus for various Silverzone olympiads including Science, Math, Computer, and English.",
        size: "2.0 MB",
        updated: "25/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://silverzone.org/",
        officialLink: "https://silverzone.org/"
      }
    ],
    '11': [
      {
        title: "Engineering Entrance",
        subtitle: "JEE Advanced 2026",
        description: "Complete syllabus for Physics, Chemistry, and Mathematics for JEE Advanced entrance examination.",
        size: "3.5 MB",
        updated: "02/12/2025",
        type: "SYLLABUS",
        badge: "NEW",
        pdfUrl: "/syllabus/jee-advanced-syllabus-ea547018.pdf",
        officialLink: "https://jeeadv.ac.in/"
      },
      {
        title: "Medical Entrance",
        subtitle: "AIIMS Entrance Examinations",
        description: "Complete syllabus for AIIMS MBBS entrance covering Physics, Chemistry, Biology and General Knowledge.",
        size: "3.2 MB",
        updated: "01/12/2025",
        type: "SYLLABUS",
        badge: "NEW",
        pdfUrl: "/syllabus/AIIMS Entrance Examinations.pdf",
        officialLink: "https://www.aiimsexams.ac.in/"
      },
      {
        title: "Medical Entrance",
        subtitle: "NEET",
        description: "Comprehensive syllabus for Physics, Chemistry, and Biology for medical entrance examination.",
        size: "3.8 MB",
        updated: "28/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://neet.nta.nic.in/",
        officialLink: "https://neet.nta.nic.in/"
      },
      {
        title: "International Test",
        subtitle: "SAT",
        description: "Complete guide for SAT covering Reading, Writing, and Mathematics sections.",
        size: "2.8 MB",
        updated: "25/11/2025",
        type: "SYLLABUS",
        pdfUrl: "/syllabus/SAT.pdf",
        officialLink: "https://www.collegeboard.org/"
      },
      {
        title: "ACT Test",
        subtitle: "ACT (American College Testing)",
        description: "Complete syllabus for ACT covering English, Mathematics, Reading, and Science sections.",
        size: "2.6 MB",
        updated: "22/11/2025",
        type: "SYLLABUS",
        pdfUrl: "/syllabus/ACT test.pdf",
        officialLink: "https://www.act.org/"
      },
      {
        title: "Law Entrance",
        subtitle: "CLAT 2026",
        description: "Common Law Admission Test syllabus covering Legal Reasoning, Logical Reasoning, and General Knowledge.",
        size: "2.4 MB",
        updated: "20/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://consortiumofnlus.ac.in/",
        officialLink: "https://consortiumofnlus.ac.in/"
      },
      {
        title: "Law Entrance",
        subtitle: "AILET 2026",
        description: "All India Law Entrance Test syllabus for admission to National Law University Delhi.",
        size: "2.2 MB",
        updated: "18/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://nludelhi.ac.in/",
        officialLink: "https://nludelhi.ac.in/"
      },
      {
        title: "University Entrance",
        subtitle: "CUET-UG 2026",
        description: "Complete syllabus for CUET-UG covering various subjects for undergraduate admissions.",
        size: "3.4 MB",
        updated: "15/11/2025",
        type: "SYLLABUS",
        pdfUrl: "/syllabus/COMMON UNIVERSITY ENTRANCE TEST (UG).pdf",
        officialLink: "https://cuet.samarth.ac.in/"
      },
      {
        title: "Engineering Entrance",
        subtitle: "SRM Joint Engineering Entrance Exam",
        description: "Complete syllabus for SRMJEEE covering Physics, Chemistry, Mathematics, and Aptitude.",
        size: "2.9 MB",
        updated: "12/11/2025",
        type: "SYLLABUS",
        pdfUrl: "/syllabus/SRMJEEE 2026 Syllabus.pdf",
        officialLink: "https://www.srmist.edu.in/"
      },
      {
        title: "VIT Entrance",
        subtitle: "VITEEE",
        description: "Complete syllabus for VITEEE covering Physics, Chemistry, Mathematics, and English.",
        size: "2.7 MB",
        updated: "10/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://viteee.vit.ac.in/",
        officialLink: "https://viteee.vit.ac.in/"
      },
      {
        title: "Architecture Entrance",
        subtitle: "NATA",
        description: "Complete syllabus for NATA covering Mathematics, General Aptitude, and Drawing.",
        size: "2.5 MB",
        updated: "08/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://nata.in/",
        officialLink: "https://nata.in/"
      },
      {
        title: "Design Entrance",
        subtitle: "UCEED",
        description: "Complete syllabus for UCEED covering design aptitude, visualization, and creativity.",
        size: "2.3 MB",
        updated: "05/11/2025",
        type: "SYLLABUS",
        pdfUrl: "/syllabus/UCEED2026_Information_Brochure.pdf",
        officialLink: "http://www.uceed.iitb.ac.in/"
      },
      {
        title: "BHU Entrance",
        subtitle: "Banaras Hindu University Admission",
        description: "Complete syllabus for BHU undergraduate entrance examinations.",
        size: "2.8 MB",
        updated: "02/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://www.bhu.ac.in/",
        officialLink: "https://www.bhu.ac.in/"
      },
      {
        title: "Cambridge Examination",
        subtitle: "Cambridge International AS & A Level",
        description: "Complete syllabus for Cambridge AS & A Level examinations across all subjects.",
        size: "4.2 MB",
        updated: "28/10/2025",
        type: "SYLLABUS",
        pdfUrl: "https://www.cambridgeinternational.org/",
        officialLink: "https://www.cambridgeinternational.org/"
      },
      {
        title: "Bar Examination",
        subtitle: "All India Bar Examination",
        description: "Complete syllabus for All India Bar Examination for law graduates.",
        size: "2.1 MB",
        updated: "25/10/2025",
        type: "SYLLABUS",
        pdfUrl: "/syllabus/All India Bar Examination.pdf",
        officialLink: "https://allindiabarexamination.com/"
      },
      {
        title: "Gita Olympiad",
        subtitle: "International Gita Olympiad",
        description: "Complete syllabus for Bhagavad Gita knowledge test covering all chapters and verses.",
        size: "1.5 MB",
        updated: "20/10/2025",
        type: "SYLLABUS",
        pdfUrl: "https://gitaolympiad.com/",
        officialLink: "https://gitaolympiad.com/"
      },
      {
        title: "Olympiads",
        subtitle: "Silverzone Olympiads",
        description: "Syllabus for various Silverzone olympiads including Science, Math, Computer, and English.",
        size: "2.0 MB",
        updated: "18/10/2025",
        type: "SYLLABUS",
        pdfUrl: "https://silverzone.org/",
        officialLink: "https://silverzone.org/"
      },
      {
        title: "Talent Search",
        subtitle: "NTSE",
        description: "Comprehensive syllabus for Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT).",
        size: "1.8 MB",
        updated: "15/10/2025",
        type: "SYLLABUS",
        pdfUrl: "https://ncert.nic.in/",
        officialLink: "https://ncert.nic.in/"
      }
    ],
    '12': [
      {
        title: "Engineering Entrance",
        subtitle: "JEE Advanced 2026",
        description: "Complete syllabus for Physics, Chemistry, and Mathematics for JEE Advanced entrance examination.",
        size: "3.5 MB",
        updated: "02/12/2025",
        type: "SYLLABUS",
        badge: "NEW",
        pdfUrl: "/syllabus/jee-advanced-syllabus-ea547018.pdf",
        officialLink: "https://jeeadv.ac.in/"
      },
      {
        title: "Medical Entrance",
        subtitle: "AIIMS Entrance Examinations",
        description: "Complete syllabus for AIIMS MBBS entrance covering Physics, Chemistry, Biology and General Knowledge.",
        size: "3.2 MB",
        updated: "01/12/2025",
        type: "SYLLABUS",
        badge: "NEW",
        pdfUrl: "/syllabus/AIIMS Entrance Examinations.pdf",
        officialLink: "https://www.aiimsexams.ac.in/"
      },
      {
        title: "Medical Entrance",
        subtitle: "NEET",
        description: "Comprehensive syllabus for Physics, Chemistry, and Biology for medical entrance examination.",
        size: "3.8 MB",
        updated: "28/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://neet.nta.nic.in/",
        officialLink: "https://neet.nta.nic.in/"
      },
      {
        title: "International Test",
        subtitle: "SAT",
        description: "Complete guide for SAT covering Reading, Writing, and Mathematics sections.",
        size: "2.8 MB",
        updated: "25/11/2025",
        type: "SYLLABUS",
        pdfUrl: "/syllabus/SAT.pdf",
        officialLink: "https://www.collegeboard.org/"
      },
      {
        title: "ACT Test",
        subtitle: "ACT (American College Testing)",
        description: "Complete syllabus for ACT covering English, Mathematics, Reading, and Science sections.",
        size: "2.6 MB",
        updated: "22/11/2025",
        type: "SYLLABUS",
        pdfUrl: "/syllabus/ACT test.pdf",
        officialLink: "https://www.act.org/"
      },
      {
        title: "Law Entrance",
        subtitle: "CLAT 2026",
        description: "Common Law Admission Test syllabus covering Legal Reasoning, Logical Reasoning, and General Knowledge.",
        size: "2.4 MB",
        updated: "20/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://consortiumofnlus.ac.in/",
        officialLink: "https://consortiumofnlus.ac.in/"
      },
      {
        title: "Law Entrance",
        subtitle: "AILET 2026",
        description: "All India Law Entrance Test syllabus for admission to National Law University Delhi.",
        size: "2.2 MB",
        updated: "18/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://nludelhi.ac.in/",
        officialLink: "https://nludelhi.ac.in/"
      },
      {
        title: "University Entrance",
        subtitle: "CUET-UG 2026",
        description: "Complete syllabus for CUET-UG covering various subjects for undergraduate admissions.",
        size: "3.4 MB",
        updated: "15/11/2025",
        type: "SYLLABUS",
        pdfUrl: "/syllabus/COMMON UNIVERSITY ENTRANCE TEST (UG).pdf",
        officialLink: "https://cuet.samarth.ac.in/"
      },
      {
        title: "Engineering Entrance",
        subtitle: "SRM Joint Engineering Entrance Exam",
        description: "Complete syllabus for SRMJEEE covering Physics, Chemistry, Mathematics, and Aptitude.",
        size: "2.9 MB",
        updated: "12/11/2025",
        type: "SYLLABUS",
        pdfUrl: "/syllabus/SRMJEEE 2026 Syllabus.pdf",
        officialLink: "https://www.srmist.edu.in/"
      },
      {
        title: "VIT Entrance",
        subtitle: "VITEEE",
        description: "Complete syllabus for VITEEE covering Physics, Chemistry, Mathematics, and English.",
        size: "2.7 MB",
        updated: "10/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://viteee.vit.ac.in/",
        officialLink: "https://viteee.vit.ac.in/"
      },
      {
        title: "Architecture Entrance",
        subtitle: "NATA",
        description: "Complete syllabus for NATA covering Mathematics, General Aptitude, and Drawing.",
        size: "2.5 MB",
        updated: "08/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://nata.in/",
        officialLink: "https://nata.in/"
      },
      {
        title: "Design Entrance",
        subtitle: "UCEED",
        description: "Complete syllabus for UCEED covering design aptitude, visualization, and creativity.",
        size: "2.3 MB",
        updated: "05/11/2025",
        type: "SYLLABUS",
        pdfUrl: "/syllabus/UCEED2026_Information_Brochure.pdf",
        officialLink: "http://www.uceed.iitb.ac.in/"
      },
      {
        title: "BHU Entrance",
        subtitle: "Banaras Hindu University Admission",
        description: "Complete syllabus for BHU undergraduate entrance examinations.",
        size: "2.8 MB",
        updated: "02/11/2025",
        type: "SYLLABUS",
        pdfUrl: "https://www.bhu.ac.in/",
        officialLink: "https://www.bhu.ac.in/"
      },
      {
        title: "Cambridge Examination",
        subtitle: "Cambridge International AS & A Level",
        description: "Complete syllabus for Cambridge AS & A Level examinations across all subjects.",
        size: "4.2 MB",
        updated: "28/10/2025",
        type: "SYLLABUS",
        pdfUrl: "https://www.cambridgeinternational.org/",
        officialLink: "https://www.cambridgeinternational.org/"
      },
      {
        title: "Bar Examination",
        subtitle: "All India Bar Examination",
        description: "Complete syllabus for All India Bar Examination for law graduates.",
        size: "2.1 MB",
        updated: "25/10/2025",
        type: "SYLLABUS",
        pdfUrl: "/syllabus/All India Bar Examination.pdf",
        officialLink: "https://allindiabarexamination.com/"
      },
      {
        title: "Gita Olympiad",
        subtitle: "International Gita Olympiad",
        description: "Complete syllabus for Bhagavad Gita knowledge test covering all chapters and verses.",
        size: "1.5 MB",
        updated: "20/10/2025",
        type: "SYLLABUS",
        pdfUrl: "https://gitaolympiad.com/",
        officialLink: "https://gitaolympiad.com/"
      },
      {
        title: "Olympiads",
        subtitle: "Silverzone Olympiads",
        description: "Syllabus for various Silverzone olympiads including Science, Math, Computer, and English.",
        size: "2.0 MB",
        updated: "18/10/2025",
        type: "SYLLABUS",
        pdfUrl: "https://silverzone.org/",
        officialLink: "https://silverzone.org/"
      },
      {
        title: "Talent Search",
        subtitle: "NTSE",
        description: "Comprehensive syllabus for Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT).",
        size: "1.8 MB",
        updated: "15/10/2025",
        type: "SYLLABUS",
        pdfUrl: "https://ncert.nic.in/",
        officialLink: "https://ncert.nic.in/"
      }
    ]
  };

  const syllabusData = allSyllabusData[userClass] || [];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            📄 Syllabus & Downloads - Class {userClass}
          </h1>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
          gap: '24px'
        }}>
          {syllabusData.map((item, index) => (
            <div key={index} style={{
              backgroundColor: '#1a2332',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #2d3748',
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '16px',
                position: 'absolute',
                top: '24px',
                right: '24px'
              }}>
                <span style={{
                  backgroundColor: item.type === 'SYLLABUS' ? '#3b82f6' : 
                                 item.type === 'SAMPLE PAPER' ? '#10b981' : '#f59e0b',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {item.type}
                </span>
                {item.badge && (
                  <span style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {item.badge}
                  </span>
                )}
              </div>

              <div style={{
                fontSize: '32px',
                marginBottom: '12px'
              }}>
                📄
              </div>

              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '4px',
                paddingRight: '120px'
              }}>
                {item.title}
              </h3>

              <h4 style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#3b82f6',
                marginBottom: '12px'
              }}>
                {item.subtitle}
              </h4>

              <p style={{
                fontSize: '14px',
                color: '#9ca3af',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                {item.description}
              </p>

              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '16px',
                fontSize: '13px',
                color: '#6b7280'
              }}>
                <span>📦 Size: {item.size}</span>
                <span>📅 Updated: {item.updated}</span>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <a
                  href={item.pdfUrl.startsWith('/') ? item.pdfUrl : item.officialLink}
                  download={item.pdfUrl.startsWith('/') ? true : undefined}
                  target={item.pdfUrl.startsWith('/') ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    backgroundColor: '#3b82f6',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                  📥 {item.pdfUrl.startsWith('/') ? 'Download PDF' : 'View Online'}
                </a>
                <a 
                  href={item.officialLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#9ca3af',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: '1px solid #374151',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#374151';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#9ca3af';
                  }}
                >
                  🔗 Official Site
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

