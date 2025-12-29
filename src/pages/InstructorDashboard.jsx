import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './InstructorDashboard.css'

function InstructorDashboard() {
  const navigate = useNavigate()
  const [user] = useState({
    name: 'Professor Smith',
    email: 'psmith@ucsd.edu',
    role: 'Instructor',
    avatar: '/assets/default-avatar.png'
  })

  const [stats] = useState({
    totalStudents: 45,
    totalTeams: 9,
    pendingReviews: 12,
    upcomingLectures: 3
  })

  const [announcements] = useState([
    { id: 1, title: 'Week 10 Project Demo', date: '2025-12-15', content: 'Final project demos scheduled' },
    { id: 2, title: 'Office Hours Update', date: '2025-12-10', content: 'Extended office hours this week' }
  ])

  const [quickLinks] = useState([
    { name: 'Roster Management', url: '/roster' },
    { name: 'Lecture Builder', url: '/instructor-lectures' },
    { name: 'Team Meetings', url: '/instructor-team-meetings' },
    { name: 'Class Directory', url: '/class-directory' },
    { name: 'Course Settings', url: '/course-settings' },
    { name: 'Attendance Reports', url: '/meeting-attendance' }
  ])

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="instructor-dashboard">
      <header className="dashboard-header">
        <h1>🧭 Conductor - Instructor Dashboard</h1>
        <div className="user-info">
          <img src={user.avatar} alt="User" className="user-avatar" />
          <div>
            <p className="user-name">{user.name}</p>
            <p className="user-role">{user.role}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="stats-section">
          <h2>Course Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats.totalStudents}</h3>
              <p>Total Students</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalTeams}</h3>
              <p>Total Teams</p>
            </div>
            <div className="stat-card">
              <h3>{stats.pendingReviews}</h3>
              <p>Pending Reviews</p>
            </div>
            <div className="stat-card">
              <h3>{stats.upcomingLectures}</h3>
              <p>Upcoming Lectures</p>
            </div>
          </div>
        </section>

        <div className="dashboard-grid">
          <section className="announcements-section">
            <h2>Recent Announcements</h2>
            <div className="announcements-list">
              {announcements.map(announcement => (
                <div key={announcement.id} className="announcement-card">
                  <h3>{announcement.title}</h3>
                  <p className="announcement-date">{announcement.date}</p>
                  <p>{announcement.content}</p>
                </div>
              ))}
            </div>
            <button className="create-btn">+ Create Announcement</button>
          </section>

          <section className="quick-links-section">
            <h2>Quick Links</h2>
            <div className="links-grid">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.url} className="link-card">
                  {link.name}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            <li>Team 4 submitted Sprint 3 deliverables</li>
            <li>15 students completed Week 9 lecture attendance</li>
            <li>New journal entries from 8 teams</li>
            <li>Course materials updated for Week 10</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default InstructorDashboard
