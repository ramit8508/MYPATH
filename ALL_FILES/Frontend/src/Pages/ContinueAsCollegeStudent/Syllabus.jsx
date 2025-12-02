import React from 'react'
import "../../Styles/Syllabus.css"

export default function SyllabusCollege() {
  const syllabusData = [
    {
      title: "Engineering Entrance",
      subtitle: "MHT CET",
      description: "Complete syllabus for Maharashtra Common Entrance Test covering Physics, Chemistry, Mathematics, and Biology.",
      size: "3.2 MB",
      updated: "02/12/2025",
      type: "SYLLABUS",
      badge: "NEW",
      officialLink: "https://cetcell.mahacet.org/"
    },
    {
      title: "VIT Entrance",
      subtitle: "VITEEE 2026",
      description: "Complete syllabus for VITEEE covering Physics, Chemistry, Mathematics, and English.",
      size: "2.9 MB",
      updated: "01/12/2025",
      type: "SYLLABUS",
      badge: "NEW",
      officialLink: "https://viteee.vit.ac.in/"
    },
    {
      title: "SRM Engineering Entrance",
      subtitle: "SRMJEEE Application 2026",
      description: "Complete syllabus for SRMJEEE covering Physics, Chemistry, Mathematics, and Aptitude.",
      size: "2.8 MB",
      updated: "28/11/2025",
      type: "SYLLABUS",
      officialLink: "https://www.srmist.edu.in/"
    },
    {
      title: "English Language Test",
      subtitle: "IELTS",
      description: "Complete syllabus for IELTS covering Listening, Reading, Writing, and Speaking modules.",
      size: "2.5 MB",
      updated: "25/11/2025",
      type: "SYLLABUS",
      officialLink: "https://www.ielts.org/"
    },
    {
      title: "TOEFL Examination",
      subtitle: "Test of English as Foreign Language",
      description: "Complete syllabus for TOEFL covering Reading, Listening, Speaking, and Writing sections.",
      size: "2.6 MB",
      updated: "22/11/2025",
      type: "SYLLABUS",
      officialLink: "https://www.ets.org/toefl"
    },
    {
      title: "GRE General Test",
      subtitle: "Graduate Record Examination",
      description: "Complete syllabus for GRE covering Verbal Reasoning, Quantitative Reasoning, and Analytical Writing.",
      size: "3.0 MB",
      updated: "20/11/2025",
      type: "SYLLABUS",
      officialLink: "https://www.ets.org/gre"
    },
    {
      title: "MBA Entrance",
      subtitle: "Management Aptitude Test (MAT)",
      description: "Complete MAT syllabus covering Language Comprehension, Mathematical Skills, Data Analysis, Intelligence & Critical Reasoning.",
      size: "2.4 MB",
      updated: "18/11/2025",
      type: "SYLLABUS",
      officialLink: "https://mat.aima.in/"
    },
    {
      title: "Graduate Management Test",
      subtitle: "GMAT™ Exam",
      description: "Comprehensive GMAT syllabus covering Quantitative, Verbal, Integrated Reasoning, and Analytical Writing.",
      size: "3.1 MB",
      updated: "15/11/2025",
      type: "SYLLABUS",
      officialLink: "https://www.mba.com/"
    },
    {
      title: "Foreign Medical Graduate Exam",
      subtitle: "FMGE (Screening Test)",
      description: "Complete syllabus for FMGE covering all medical subjects for foreign medical graduates.",
      size: "4.2 MB",
      updated: "12/11/2025",
      type: "SYLLABUS",
      officialLink: "https://natboard.edu.in/"
    },
    {
      title: "Medical Counselling",
      subtitle: "MCC eCounselling Services",
      description: "Complete information for medical counselling process for NEET qualified students.",
      size: "2.8 MB",
      updated: "10/11/2025",
      type: "NOTIFICATION",
      officialLink: "https://mcc.nic.in/"
    },
    {
      title: "Chartered Accountancy",
      subtitle: "CA Final Course - ICAI",
      description: "Complete syllabus for CA Final covering Financial Reporting, Advanced Auditing, and Direct & Indirect Taxation.",
      size: "5.5 MB",
      updated: "08/11/2025",
      type: "SYLLABUS",
      officialLink: "https://www.icai.org/"
    },
    {
      title: "Company Secretary",
      subtitle: "CSEET (CS Executive Entrance)",
      description: "Syllabus for CS Executive Entrance covering Business Communication, Legal Aptitude, Economic & Business Environment.",
      size: "2.3 MB",
      updated: "05/11/2025",
      type: "SYLLABUS",
      officialLink: "https://www.icsi.edu/"
    },
    {
      title: "Agriculture Entrance",
      subtitle: "CUET (ICAR-UG) 2026",
      description: "Complete syllabus for ICAR entrance covering Agriculture subjects for undergraduate programs.",
      size: "2.9 MB",
      updated: "02/11/2025",
      type: "SYLLABUS",
      officialLink: "https://icar.nta.ac.in/"
    },
    {
      title: "Common University Test",
      subtitle: "COMMON UNIVERSITY ENTRANCE TEST (UG)",
      description: "Complete syllabus for CUET-UG covering various subjects for central university admissions.",
      size: "3.5 MB",
      updated: "28/10/2025",
      type: "SYLLABUS",
      officialLink: "https://cuet.samarth.ac.in/"
    },
    {
      title: "Law School Admission",
      subtitle: "LSAT - Law School Admission Test",
      description: "Complete LSAT syllabus covering Logical Reasoning, Analytical Reasoning, and Reading Comprehension.",
      size: "2.2 MB",
      updated: "25/10/2025",
      type: "SYLLABUS",
      officialLink: "https://www.lsac.org/"
    },
    {
      title: "Law Entrance (Integrated)",
      subtitle: "PU B.A./B.Com. LL.B. (Hons.) 5 Years",
      description: "Complete syllabus for Punjabi University integrated law course entrance exam.",
      size: "2.4 MB",
      updated: "22/10/2025",
      type: "SYLLABUS",
      officialLink: "https://punjabiuniversity.ac.in/"
    },
    {
      title: "Teacher Eligibility Test",
      subtitle: "CTET (Central Teacher Eligibility Test)",
      description: "Complete CTET syllabus for Paper I (Classes I-V) and Paper II (Classes VI-VIII).",
      size: "2.8 MB",
      updated: "20/10/2025",
      type: "SYLLABUS",
      officialLink: "https://ctet.nic.in/"
    },
    {
      title: "UGC National Test",
      subtitle: "UGC-NET",
      description: "Complete syllabus for UGC-NET covering Teaching Aptitude, Research Aptitude, and subject-specific papers.",
      size: "3.7 MB",
      updated: "18/10/2025",
      type: "SYLLABUS",
      officialLink: "https://ugcnet.nta.nic.in/"
    },
    {
      title: "Civil Services",
      subtitle: "UPSC IAS/IPS/IFS",
      description: "Comprehensive syllabus for UPSC CSE covering Prelims and Mains with optional subjects.",
      size: "6.8 MB",
      updated: "15/10/2025",
      type: "SYLLABUS",
      officialLink: "https://www.upsc.gov.in/"
    },
    {
      title: "Indian Navy",
      subtitle: "Navy Officer Entry Recruitment",
      description: "Complete syllabus for Navy recruitment covering Mathematics, Physics, General Knowledge, and English.",
      size: "2.5 MB",
      updated: "12/10/2025",
      type: "SYLLABUS",
      officialLink: "https://www.joinindiannavy.gov.in/"
    },
    {
      title: "Air Force Entrance",
      subtitle: "AFCAT (Air Force Common Admission Test)",
      description: "Syllabus for AFCAT covering General Awareness, Verbal Ability, Numerical Ability, and Reasoning.",
      size: "2.3 MB",
      updated: "10/10/2025",
      type: "SYLLABUS",
      officialLink: "https://careerindianairforce.cdac.in/"
    },
    {
      title: "Aviation Licensing",
      subtitle: "DGCA Pilot License Exams",
      description: "Complete syllabus for DGCA aviation personnel licensing examinations.",
      size: "3.2 MB",
      updated: "08/10/2025",
      type: "SYLLABUS",
      officialLink: "https://www.dgca.gov.in/"
    },
    {
      title: "Cybersecurity Certificate",
      subtitle: "Google Cybersecurity Professional",
      description: "Complete curriculum for Google Cybersecurity Professional Certificate program.",
      size: "2.5 MB",
      updated: "05/10/2025",
      type: "NOTIFICATION",
      officialLink: "https://www.coursera.org/google-certificates/cybersecurity-certificate"
    },
    {
      title: "Data Analytics Certificate",
      subtitle: "Google Data Analytics Professional",
      description: "Complete curriculum for Google Data Analytics Professional Certificate program.",
      size: "2.4 MB",
      updated: "02/10/2025",
      type: "NOTIFICATION",
      officialLink: "https://www.coursera.org/google-certificates/data-analytics-certificate"
    },
    {
      title: "Study in USA",
      subtitle: "Fulbright-Nehru Fellowships",
      description: "Complete guidelines for Fulbright-Nehru fellowships for Indian citizens to study in the USA.",
      size: "2.9 MB",
      updated: "28/09/2025",
      type: "NOTIFICATION",
      officialLink: "https://www.usief.org.in/"
    },
    {
      title: "Study in UK",
      subtitle: "Chevening Scholarship",
      description: "Complete guidelines and application process for Chevening Scholarship to study in the UK.",
      size: "2.6 MB",
      updated: "25/09/2025",
      type: "NOTIFICATION",
      officialLink: "https://www.chevening.org/"
    },
    {
      title: "MBA Entrance",
      subtitle: "CAT (Common Admission Test)",
      description: "Complete syllabus for CAT covering Quantitative Ability, Verbal Ability, Data Interpretation & Logical Reasoning.",
      size: "3.2 MB",
      updated: "22/09/2025",
      type: "SYLLABUS",
      officialLink: "https://iimcat.ac.in/"
    },
    {
      title: "Postgraduate Entrance",
      subtitle: "CUET PG 2026",
      description: "Comprehensive syllabus for postgraduate entrance covering all subjects and domains.",
      size: "3.5 MB",
      updated: "20/09/2025",
      type: "SYLLABUS",
      badge: "NEW",
      officialLink: "https://cuet.samarth.ac.in/"
    },
    {
      title: "Xavier Aptitude Test",
      subtitle: "XAT 2026",
      description: "Detailed syllabus for XAT covering Verbal Ability, Decision Making, Quantitative Ability & Data Interpretation.",
      size: "2.4 MB",
      updated: "18/09/2025",
      type: "SYLLABUS",
      badge: "NEW",
      officialLink: "https://xatonline.in/"
    },
    {
      title: "Symbiosis Entrance",
      subtitle: "SNAP (Symbiosis National Aptitude Test)",
      description: "Complete SNAP syllabus covering General English, Quantitative, Data Interpretation & Analytical Reasoning.",
      size: "2.1 MB",
      updated: "15/09/2025",
      type: "SYLLABUS",
      officialLink: "https://www.snaptest.org/"
    },
    {
      title: "LPU Entrance",
      subtitle: "LPUNEST 2026",
      description: "Complete syllabus for LPUNEST covering various postgraduate programs.",
      size: "2.8 MB",
      updated: "12/09/2025",
      type: "SYLLABUS",
      officialLink: "https://www.lpu.in/nest/"
    },
    {
      title: "IPU Entrance",
      subtitle: "GGSIPU Common Entrance Test 2026",
      description: "Complete syllabus for IPU CET covering MBA, MCA, and other postgraduate programs.",
      size: "3.0 MB",
      updated: "10/09/2025",
      type: "SYLLABUS",
      officialLink: "http://www.ipu.ac.in/"
    },
    {
      title: "GJUST Entrance",
      subtitle: "Guru Jambheshwar University Entrance 2026-26",
      description: "Complete syllabus for GJUST entrance examinations for various postgraduate programs.",
      size: "2.7 MB",
      updated: "08/09/2025",
      type: "SYLLABUS",
      officialLink: "https://www.gjust.ac.in/"
    },
    {
      title: "Tamil Nadu CET",
      subtitle: "TANCET / CEETA-PG 2026",
      description: "Complete syllabus for TANCET covering MBA, MCA, ME/M.Tech programs.",
      size: "2.5 MB",
      updated: "05/09/2025",
      type: "SYLLABUS",
      officialLink: "https://tancet.annauniv.edu/"
    },
    {
      title: "Odisha Entrance",
      subtitle: "OJEE (Odisha Joint Entrance Examination)",
      description: "Complete syllabus for OJEE covering various postgraduate programs including MBA, MCA, M.Tech.",
      size: "2.9 MB",
      updated: "02/09/2025",
      type: "SYLLABUS",
      officialLink: "https://ojee.nic.in/"
    },
    {
      title: "Lucknow University",
      subtitle: "LU Admission Entrance Examination 2024-25",
      description: "Complete syllabus for Lucknow University postgraduate entrance examinations.",
      size: "2.4 MB",
      updated: "28/08/2025",
      type: "SYLLABUS",
      officialLink: "https://www.lkouniv.ac.in/"
    },
    {
      title: "MBA Program",
      subtitle: "MBA Program Admission, Punjabi University",
      description: "Complete syllabus and guidelines for MBA admission at Punjabi University.",
      size: "2.0 MB",
      updated: "25/08/2025",
      type: "SYLLABUS",
      officialLink: "https://punjabiuniversity.ac.in/"
    },
    {
      title: "Design Entrance",
      subtitle: "NID B.Des. & M.Des. Admissions",
      description: "Complete syllabus for NID admissions covering design aptitude and creativity tests.",
      size: "3.5 MB",
      updated: "22/08/2025",
      type: "SYLLABUS",
      officialLink: "https://www.nid.edu/"
    },
    {
      title: "Design Entrance",
      subtitle: "CEED (Common Entrance Examination for Design)",
      description: "Complete syllabus for CEED covering design aptitude, visualization, and creativity.",
      size: "2.6 MB",
      updated: "20/08/2025",
      type: "SYLLABUS",
      officialLink: "http://www.ceed.iitb.ac.in/"
    },
    {
      title: "PhD Programs",
      subtitle: "PhD Programs Admission",
      description: "General guidelines and syllabus pattern for PhD entrance examinations across universities.",
      size: "3.8 MB",
      updated: "18/08/2025",
      type: "NOTIFICATION",
      officialLink: "https://www.ugc.ac.in/"
    },
    {
      title: "BITS PhD",
      subtitle: "BITS Pilani PhD Admissions",
      description: "Complete syllabus and guidelines for BITS Pilani PhD admissions.",
      size: "2.2 MB",
      updated: "15/08/2025",
      type: "SYLLABUS",
      officialLink: "https://www.bits-pilani.ac.in/"
    },
    {
      title: "DJSCE PhD",
      subtitle: "Ph.D. Admissions at DJSCE",
      description: "Complete guidelines for PhD admissions at DJ Sanghvi College of Engineering.",
      size: "1.9 MB",
      updated: "12/08/2025",
      type: "NOTIFICATION",
      officialLink: "https://www.djsce.ac.in/"
    },
    {
      title: "PTU PhD",
      subtitle: "I.K. Gujral PTU Ph.D. Admission Programme 2026-26",
      description: "Complete guidelines and syllabus for PTU PhD admission programme.",
      size: "2.3 MB",
      updated: "10/08/2025",
      type: "SYLLABUS",
      officialLink: "https://www.ptu.ac.in/"
    },
    {
      title: "VTU Postgraduate",
      subtitle: "VTU PhD & M.Sc (Engineering) Admissions",
      description: "Complete syllabus for VTU PhD & M.Sc (Engineering) admissions.",
      size: "3.1 MB",
      updated: "08/08/2025",
      type: "SYLLABUS",
      officialLink: "https://vtu.ac.in/"
    },
    {
      title: "Rhodes Scholarship",
      subtitle: "The Rhodes Scholarship",
      description: "Complete guidelines and application process for Rhodes Scholarship to study at Oxford.",
      size: "2.8 MB",
      updated: "05/08/2025",
      type: "NOTIFICATION",
      officialLink: "https://www.rhodeshouse.ox.ac.uk/"
    },
    {
      title: "AIST Program",
      subtitle: "AIST Postgraduate Program",
      description: "Complete information for AIST postgraduate program admissions.",
      size: "2.0 MB",
      updated: "02/08/2025",
      type: "NOTIFICATION",
      officialLink: "https://www.aist.go.jp/"
    },
    {
      title: "IIAD Entrance",
      subtitle: "IIAD Admission Exam",
      description: "Complete syllabus for IIAD postgraduate admission examinations.",
      size: "2.4 MB",
      updated: "28/07/2025",
      type: "SYLLABUS",
      officialLink: "https://www.iiad.edu.in/"
    }
  ];

  // College-level exam links only (undergraduate, postgraduate, professional)
  const examLinks = [];

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
        {/* Header */}
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
            📄 Syllabus & Downloads - College
          </h1>
        </div>

        {/* Syllabus Grid */}
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
              {/* Badges */}
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

              {/* Icon */}
              <div style={{
                fontSize: '32px',
                marginBottom: '12px'
              }}>
                📄
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '4px',
                paddingRight: '120px'
              }}>
                {item.title}
              </h3>

              {/* Subtitle */}
              <h4 style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#3b82f6',
                marginBottom: '12px'
              }}>
                {item.subtitle}
              </h4>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                color: '#9ca3af',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                {item.description}
              </p>

              {/* Meta Info */}
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

              {/* Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <a
                  href={item.officialLink}
                  target="_blank"
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
                  📥 Download
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
