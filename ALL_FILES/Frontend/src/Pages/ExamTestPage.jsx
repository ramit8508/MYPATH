import React from 'react';
import ExamDisplay from '../Components/ExamDisplay';
import '../Styles/ExamDisplay.css';

function ExamTestPage() {
  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1400px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        borderBottom: '2px solid #333',
        paddingBottom: '20px'
      }}>
        <h1>🎓 MYPATH Exam Portal - Test Page</h1>
        <p style={{ color: '#666' }}>Testing ExamDisplay Component with Different Class Levels</p>
      </header>

      {/* Test with College */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: '#2196F3', marginBottom: '20px' }}>
          📚 Exams for College Students
        </h2>
        <ExamDisplay userClass="college" />
      </section>

      {/* Test with Class 12 */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: '#4CAF50', marginBottom: '20px' }}>
          📝 Exams for Class 12
        </h2>
        <ExamDisplay userClass="12" />
      </section>

      {/* Test with Graduate */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: '#FF9800', marginBottom: '20px' }}>
          🎯 Exams for Graduate Students
        </h2>
        <ExamDisplay userClass="graduate" />
      </section>

      {/* Test with All */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: '#9C27B0', marginBottom: '20px' }}>
          🌟 All Available Exams
        </h2>
        <ExamDisplay userClass="all" />
      </section>
    </div>
  );
}

export default ExamTestPage;
