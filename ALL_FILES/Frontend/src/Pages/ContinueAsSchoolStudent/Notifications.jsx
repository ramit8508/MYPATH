import React from 'react'
import "../../Styles/Notifications.css"

export default function NotificationsSchool() {
  const notifications = [
    {
      id: 1,
      type: 'urgent',
      title: 'JEE Main 2025 Application Deadline',
      message: 'Last date to apply for JEE Main 2025 is approaching. Complete your application by November 15, 2025.',
      date: '2 hours ago',
      icon: '🔴'
    },
    {
      id: 2,
      type: 'important',
      title: 'NEET 2025 Registration Started',
      message: 'NEET 2025 registration is now open. Early bird applicants get additional practice materials.',
      date: '5 hours ago',
      icon: '⚠️'
    },
    {
      id: 3,
      type: 'info',
      title: 'CBSE Board Exam Schedule Released',
      message: 'CBSE Class 10 and 12 board exam schedules for 2025 have been released. Check the detailed timetable.',
      date: '1 day ago',
      icon: '📢'
    },
    {
      id: 4,
      type: 'success',
      title: 'New Study Materials Available',
      message: 'Updated JEE Advanced study materials and mock tests are now available in your dashboard.',
      date: '2 days ago',
      icon: '✅'
    },
    {
      id: 5,
      type: 'info',
      title: 'NDA 2025 Exam Pattern Updated',
      message: 'UPSC has announced changes to NDA exam pattern. Review the updated syllabus and prepare accordingly.',
      date: '3 days ago',
      icon: '📢'
    },
    {
      id: 6,
      type: 'important',
      title: 'NTSE Stage 1 Results Declared',
      message: 'NTSE Stage 1 results are out. Qualified students can now prepare for Stage 2 examination.',
      date: '4 days ago',
      icon: '⚠️'
    },
    {
      id: 7,
      type: 'info',
      title: 'Free Mock Test Series Started',
      message: 'Weekly free mock tests for JEE and NEET have started. Participate to track your progress.',
      date: '5 days ago',
      icon: '📢'
    },
    {
      id: 8,
      type: 'success',
      title: 'Scholarship Opportunity',
      message: 'Apply for merit-based scholarships for Class 11 & 12 students. Deadline: December 31, 2025.',
      date: '1 week ago',
      icon: '✅'
    }
  ];

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1 className="notifications-title">School Notifications</h1>
        <p className="notifications-subtitle">Stay updated with important exam dates, registrations, and announcements</p>
        <div className="notification-stats">
          <span className="stat-badge urgent">3 Urgent</span>
          <span className="stat-badge total">8 Total</span>
        </div>
      </div>

      <div className="notifications-content">
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div key={notification.id} className={`notification-card ${notification.type}`}>
              <div className="notification-icon">{notification.icon}</div>
              <div className="notification-body">
                <div className="notification-header-row">
                  <h3 className="notification-title">{notification.title}</h3>
                  <span className={`notification-badge ${notification.type}`}>
                    {notification.type}
                  </span>
                </div>
                <p className="notification-message">{notification.message}</p>
                <span className="notification-date">{notification.date}</span>
              </div>
              <button className="notification-action">View Details</button>
            </div>
          ))}
        </div>

        <div className="notifications-sidebar">
          <div className="sidebar-card">
            <h3>Quick Actions</h3>
            <button className="action-btn">Mark All as Read</button>
            <button className="action-btn">Filter Urgent</button>
            <button className="action-btn">Notification Settings</button>
          </div>

          <div className="sidebar-card">
            <h3>Upcoming Deadlines</h3>
            <ul className="deadline-list">
              <li>
                <span>JEE Main Registration</span>
                <span className="deadline-date">Nov 15</span>
              </li>
              <li>
                <span>NEET Application</span>
                <span className="deadline-date">Nov 30</span>
              </li>
              <li>
                <span>NTSE Stage 2</span>
                <span className="deadline-date">Dec 10</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

