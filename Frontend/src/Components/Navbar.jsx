import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { Link, useLocation } from 'react-router-dom'
import '../Styles/Navbar.css'

export default function Navbar() {
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('school'); // default to school
  const location = useLocation();

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem('userName');
    console.log('Retrieved userName from localStorage:', storedName);
    if (storedName) {
      setUserName(storedName);
    }

    // Get user type from localStorage
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedName = localStorage.getItem('userName');
      const updatedUserType = localStorage.getItem('userType');
      console.log('Storage changed, new userName:', updatedName);
      if (updatedName) {
        setUserName(updatedName);
      }
      if (updatedUserType) {
        setUserType(updatedUserType);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  console.log('Current userName state:', userName);
  console.log('Current userType:', userType);

  // Determine syllabus, dashboard, and notifications links based on userType
  const syllabusLink = userType === 'college' ? '/syllabuscollege' : '/syllabusschool';
  const dashboardLink = userType === 'college' ? '/dashboardcollege' : '/dashboardschool';
  const notificationsLink = userType === 'college' ? '/notificationscollege' : '/notificationsschool';

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <h1 className="navbar-heading">MYPATH</h1>
        <h2 className="navbar-subheading">Your Personalized Academic Journey</h2>
      </div>
      <div className="navbar-right">
        {userName && <span className="navbar-welcome">Welcome, {userName}!</span>}
        <Link className="navbar-link" to='/'>Start Over</Link>
        <Link className="navbar-link" to={notificationsLink}>🔔Notifications</Link>
        <Link className="navbar-link" to={syllabusLink}>📚Syllabus</Link>
        <Link className="navbar-link-primary" to={dashboardLink}>Dashboard</Link>
        <Link className="navbar-link" to='/feedback'>Feedback</Link>
      </div>
    </div>
  )
}



