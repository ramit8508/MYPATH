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
              {/* Header with title and eligible badge */}
              <div className="exam-card-header">
                <div style={{ flex: 1 }}>
                  <h3 className="exam-name" style={{ 
                    color: '#FFFFFF', 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    marginBottom: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px' 
                  }}>
                    {exam.name}
                    {urgency === 'urgent' && <span style={{ fontSize: '18px' }}>⚠️</span>}
                  </h3>
                  <p className="exam-description" style={{ 
                    color: '#94a3b8', 
                    fontSize: '14px', 
                    marginBottom: '16px',
                    lineHeight: '1.5'
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
                  <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 4px 0' }}>Registration Fee:</p>
                  <p style={{ color: '#10b981', fontSize: '18px', fontWeight: '700', margin: '0' }}>
                    {exam.registrationFee === '₹0' || exam.registrationFee === '0' ? '₹0 (Free)' : exam.registrationFee}
                  </p>
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
                  className="apply-btn"
                  style={{
                    width: '100%',
                    background: isApplied ? '#10b981' : '#2563eb',
                    color: 'white',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '12px',
                    display: 'block',
                    textAlign: 'center',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {isApplied ? '✓ Applied for Exam' : 'Apply for Exam'}
                </a>
              ) : (
                <button
                  onClick={() => toggleApplied(exam._id)}
                  className="apply-btn"
                  style={{
                    width: '100%',
                    background: isApplied ? '#10b981' : '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: isApplied ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                    marginTop: '12px'
                  }}
                  disabled={!isApplied}
                >
                  {isApplied ? '✓ Applied for Exam' : 'No Registration Link'}
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
