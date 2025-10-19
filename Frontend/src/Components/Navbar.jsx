import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const navbar={
    "display" : 'flex',
    'flexDirection' : 'row',
    'alignItems': 'center',
    'justifyContent': 'space-between',
    'padding': '10px 20px',
    'backgroundColor': '#1e293b',
    'boxShadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
}
const mypathlogo={
    "width" :  '40px',
  "height" :  '40px',
  "marginLeft" :  '20px',
  "borderRadius": '50%',
  "backgroundColor": 'white',
  "padding": '2px',
}

const heading = {
  "fontSize": '24px',
  "fontWeight": 'bold',
  "marginLeft": '10px',
  "color": '#fff',
}

const subheading = {
  "fontSize": '16px',
  "color": '#94a3b8',
  "flex": 1,
  "marginLeft": '20px',
}

const welcomeText = {
  "fontSize": '16px',
  "color": 'white',
  "fontWeight": '600',
  "marginRight": '20px',
  "whiteSpace": 'nowrap',
  "backgroundColor": 'lightgreen',
  "padding": '6px 12px',
  "borderRadius": '5px',
  "border": '1px solid lightgreen',
}

const icon1 = {
    "marginRight": '20px',
    "color": 'white',
    "textDecoration": 'none',
    "fontSize": '16px',
    "fontWeight": '500',
}
const icon2 = {
    "marginRight": '20px',
    "color": 'white',
    "textDecoration": 'none',
    "fontSize": '16px',
    "fontWeight": '500',
    "border": '1px solid #155DFC',
    "padding": '6px 12px',
    "borderRadius": '5px',
    "backgroundColor": '#155DFC',
}
const icon3 = {
    "marginRight": '20px',
    "color": 'white',
    "textDecoration": 'none',
    "fontSize": '16px',
    "fontWeight": '500',
}

export default function Navbar() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem('userName');
    console.log('Retrieved userName from localStorage:', storedName);
    if (storedName) {
      setUserName(storedName);
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedName = localStorage.getItem('userName');
      console.log('Storage changed, new userName:', updatedName);
      if (updatedName) {
        setUserName(updatedName);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  console.log('Current userName state:', userName);

  return (
    <>
      <div style={navbar}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img style={mypathlogo} src={logo} alt="Logo" className="logo" />
          <h1 style={heading}>MYPATH</h1>
          <h2 style={subheading}>Your Personalized Academic Journey</h2>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          {userName && <span style={welcomeText}>Welcome, {userName}!</span>}
          <Link style={icon1} to='/'>Start Over</Link>
          <Link style={icon3} to='/notifications'>🔔Notifications</Link>
          <Link style={icon3} to='/syllabus'>📚Syllabus</Link>
          <Link style={icon2} to='/dashboardschool'>Dashboard</Link>
          <Link style={icon1} to='/feedback'>Feedback</Link>

        </div>
      </div>
    </>
  )
}


