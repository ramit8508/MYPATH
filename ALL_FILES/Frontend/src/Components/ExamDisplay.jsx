import React, { useState, useEffect } from 'react';
import '../Styles/ExamDisplay.css';

const API_BASE_URL = '/api/school';

const ExamDisplay = ({ userClass }) => {
  const [exams, setExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedExams, setAppliedExams] = useState(new Set());

  // Calculate days until deadline
  const getDaysUntilDeadline = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Determine urgency level
  const getUrgencyLevel = (exam) => {
    const deadline = exam.registrationDeadline || exam.examDate;
    const daysLeft = getDaysUntilDeadline(deadline);
    
    if (!daysLeft || daysLeft < 0) return 'expired';
    if (daysLeft <= 7) return 'urgent'; // Red - 7 days or less
    if (daysLeft <= 30) return 'soon'; // Orange - 30 days or less
    return 'normal'; // Blue - more than 30 days
  };

  // Toggle applied status
  const toggleApplied = (examId) => {
    setAppliedExams(prev => {
      const newSet = new Set(prev);
      if (newSet.has(examId)) {
        newSet.delete(examId);
        localStorage.removeItem(`exam_applied_${examId}`);
      } else {
        newSet.add(examId);
        localStorage.setItem(`exam_applied_${examId}`, 'true');
      }
      return newSet;
    });
  };

  // Load applied exams from localStorage
  useEffect(() => {
    const loadAppliedExams = () => {
      const applied = new Set();
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('exam_applied_')) {
          const examId = key.replace('exam_applied_', '');
          applied.add(examId);
        }
      }
      setAppliedExams(applied);
    };
    loadAppliedExams();
  }, []);

  // Fetch exams based on class and category
  useEffect(() => {
    const fetchExams = async () => {
      if (!userClass) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch categories for this class
        const categoriesRes = await fetch(
          `${API_BASE_URL}/exams/class/${userClass}/categories`
        );
        const categoriesData = await categoriesRes.json();
        
        if (categoriesData.success) {
          setCategories(categoriesData.data);
        }

        // Fetch exams
        const url = selectedCategory === 'all'
          ? `${API_BASE_URL}/exams/class/${userClass}`
          : `${API_BASE_URL}/exams/class/${userClass}/category/${selectedCategory}`;
        
        const examsRes = await fetch(url);
        const examsData = await examsRes.json();
        
        if (examsData.success) {
          setExams(examsData.data);
        } else {
          setError('Failed to fetch exams');
        }
      } catch (err) {
        console.error('Error fetching exams:', err);
        setError('Failed to load exams. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [userClass, selectedCategory]);

  const getCategoryDisplayName = (category) => {
    const names = {
      engineering: '🔧 Engineering',
      medical: '⚕️ Medical',
      defence: '🛡️ Defence',
      board: '📚 Board Exams',
      olympiad: '🏆 Olympiad',
      management: '💼 Management',
      government: '🏛️ Government Jobs',
      international: '🌍 International',
      certification: '📜 Certification',
      other: '📖 Other'
    };
    return names[category] || category;
  };

  // Get exam type badge
  const getExamTypeBadge = (exam) => {
    const fee = exam.registrationFee?.toLowerCase() || '';
    const name = exam.name?.toLowerCase() || '';
    const category = exam.category?.toLowerCase() || '';
    
    // Check for scholarship
    if (name.includes('scholarship') || name.includes('fellowship')) {
      return { text: '🎓 Scholarship', color: '#8b5cf6' };
    }
    
    // Check for free contests/competitions
    if ((fee.includes('free') || fee === '₹0' || fee === '0') && 
        (name.includes('contest') || name.includes('competition') || name.includes('olympiad') || 
         category.includes('olympiad'))) {
      return { text: '🏆 Free Contest', color: '#10b981' };
    }
    
    // Check for certification
    if (category === 'certification' || name.includes('certificate')) {
      return { text: '📜 Certification', color: '#f59e0b' };
    }
    
    // Check for entrance exam
    if (name.includes('entrance') || category === 'engineering' || category === 'medical') {
      return { text: '🎯 Entrance Exam', color: '#3b82f6' };
    }
    
    // Check for competitive exam
    if (category === 'government' || category === 'defence') {
      return { text: '🏛️ Competitive Exam', color: '#ef4444' };
    }
    
    // Default
    return { text: '📝 Exam', color: '#6b7280' };
  };

  if (!userClass) {
    return (
      <div className="exam-display-empty">
        <p>Please select your class to view available exams.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="exam-display-loading">
        <div className="spinner"></div>
        <p>Loading exams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exam-display-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="exam-display-container">
      <div className="exam-display-header">
        <h2>Available Exams for Class {userClass}</h2>
        <p className="exam-count">{exams.length} exams found</p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="category-filter">
          <label>Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {getCategoryDisplayName(category)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Exams Grid */}
      {exams.length === 0 ? (
        <div className="no-exams">
          <p>No exams found for the selected criteria.</p>
        </div>
      ) : (
        <div className="exam-grid">
          {exams.map((exam) => {
            const urgency = getUrgencyLevel(exam);
            const daysLeft = getDaysUntilDeadline(exam.registrationDeadline || exam.examDate);
            const isApplied = appliedExams.has(exam._id);
            const examType = getExamTypeBadge(exam);
            
            return (
            <div 
              key={exam._id} 
              className={`exam-card urgency-${urgency}`}
              style={{
                background: urgency === 'urgent' ? 'linear-gradient(135deg, #2d1a1a 0%, #1a0f0f 100%)' : 
                           'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                border: urgency === 'urgent' ? '2px solid #ef4444' : '2px solid #334155',
                borderRadius: '16px',
                padding: '24px',
                position: 'relative'
              }}
            >
              {/* Header with title and badges */}
              <div className="exam-card-header">
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <h3 className="exam-name" style={{ 
                      color: '#FFFFFF', 
                      fontSize: '20px', 
                      fontWeight: '600', 
                      margin: '0',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px' 
                    }}>
                      {exam.name}
                      {urgency === 'urgent' && <span style={{ fontSize: '18px' }}>⚠️</span>}
                    </h3>
                  </div>
                  
                  {/* Exam Type Badge */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{
                      background: examType.color,
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '11px',
                      fontWeight: '700',
                      display: 'inline-block'
                    }}>
                      {examType.text}
                    </span>
                    <span style={{
                      background: '#334155',
                      color: '#94a3b8',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '11px',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      {getCategoryDisplayName(exam.category)}
                    </span>
                  </div>

                  <p className="exam-description" style={{ 
                    color: '#94a3b8', 
                    fontSize: '14px', 
                    marginBottom: '16px',
                    lineHeight: '1.5',
                    margin: '0'
                  }}>
                    {exam.description || `${getCategoryDisplayName(exam.category)} examination for Class ${exam.targetClass} students`}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  <span 
                    className="eligible-badge"
                    style={{
                      background: '#10b981',
                      color: 'white',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span style={{ fontSize: '14px' }}>✓</span> ELIGIBLE
                  </span>
                </div>
              </div>

              {/* Dates section */}
              <div style={{ display: 'flex', gap: '40px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {exam.examDate && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>📅</span>
                    <div>
                      <p style={{ color: '#64748b', fontSize: '12px', margin: '0' }}>Exam Date:</p>
                      <p style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '500', margin: '0' }}>
                        {new Date(exam.examDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                )}
                {exam.registrationDeadline && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>⏰</span>
                    <div>
                      <p style={{ color: '#64748b', fontSize: '12px', margin: '0' }}>Deadline:</p>
                      <p style={{ 
                        color: urgency === 'urgent' ? '#ef4444' : '#FFFFFF', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        margin: '0' 
                      }}>
                        {new Date(exam.registrationDeadline).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Registration Fee */}
              {exam.registrationFee && (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 6px 0', fontWeight: '600' }}>Registration Fee:</p>
                  <div style={{ 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                    padding: '10px 14px'
                  }}>
                    <p style={{ 
                      color: '#10b981', 
                      fontSize: exam.registrationFee.length > 50 ? '13px' : '16px', 
                      fontWeight: '700', 
                      margin: '0', 
                      lineHeight: '1.6',
                      wordBreak: 'break-word'
                    }}>
                      {exam.registrationFee === '₹0' || exam.registrationFee === '0' || exam.registrationFee.toLowerCase().includes('free') 
                        ? '₹0 (Free)' 
                        : exam.registrationFee}
                    </p>
                  </div>
                </div>
              )}

              {/* Requirements */}
              {exam.eligibility && (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Requirements:</p>
                  <ul style={{ 
                    margin: '0', 
                    paddingLeft: '20px', 
                    color: '#cbd5e1', 
                    fontSize: '13px', 
                    lineHeight: '1.8' 
                  }}>
                    {exam.eligibility.split(/[.,]/).filter(req => req.trim()).slice(0, 3).map((req, idx) => (
                      <li key={idx}>{req.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Apply Button */}
              {(exam.registrationLink || exam.officialWebsite) ? (
                <a
                  href={exam.registrationLink || exam.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => toggleApplied(exam._id)}
                  style={{
                    width: '95%',
                    maxWidth: '700px',
                    background: isApplied 
                      ? '#10b981' 
                      : '#2563eb',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    margin: '20px auto 0',
                    display: 'block',
                    textAlign: 'center',
                    textDecoration: 'none'
                  }}
                >
                   Apply for Exam
                </a>
              ) : (
                <button
                  onClick={() => toggleApplied(exam._id)}
                  style={{
                    width: '95%',
                    maxWidth: '700px',
                    background: isApplied 
                      ? '#10b981' 
                      : '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: isApplied ? 'pointer' : 'not-allowed',
                    margin: '20px auto 0',
                    display: 'block',
                    textAlign: 'center',
                    opacity: isApplied ? 1 : 0.6
                  }}
                  disabled={!isApplied}
                >
                  {isApplied ? '✓ Applied for Exam' : '⚠ No Registration Link'}
                </button>
              )}
            </div>
          )})}
        </div>
      )}
    </div>
  );
};

export default ExamDisplay;
