import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import './AttendanceReports.css'

function AttendanceReports() {
  const [user] = useState({
    name: 'Professor Smith',
    email: 'psmith@ucsd.edu',
    role: 'Instructor'
  })

  const [filter, setFilter] = useState('all')
  
  const [meetings] = useState([
    {
      id: 1,
      type: 'Lecture',
      title: 'Introduction to Software Engineering',
      date: '2025-12-10',
      time: '14:00-15:30',
      status: 'completed',
      attended: 43,
      total: 45,
      percent: 96
    },
    {
      id: 2,
      type: 'Team Meeting',
      title: 'Team Alpha Meeting',
      date: '2025-12-11',
      time: '10:00-11:00',
      status: 'completed',
      attended: 5,
      total: 5,
      percent: 100
    },
    {
      id: 3,
      type: 'Lecture',
      title: 'Agile Methodologies',
      date: '2025-12-17',
      time: '14:00-15:30',
      status: 'completed',
      attended: 40,
      total: 45,
      percent: 89
    },
    {
      id: 4,
      type: 'Team Meeting',
      title: 'Team Beta Meeting',
      date: '2025-12-18',
      time: '14:00-15:00',
      status: 'open',
      attended: 4,
      total: 6,
      percent: 67
    },
    {
      id: 5,
      type: 'Lecture',
      title: 'Design Patterns Workshop',
      date: '2025-12-24',
      time: '14:00-15:30',
      status: 'scheduled',
      attended: 0,
      total: 45,
      percent: 0
    }
  ])

  const filteredMeetings = meetings.filter(meeting => {
    if (filter === 'all') return true
    if (filter === 'lectures') return meeting.type === 'Lecture'
    if (filter === 'team-meetings') return meeting.type === 'Team Meeting'
    if (filter === 'completed') return meeting.status === 'completed'
    if (filter === 'open') return meeting.status === 'open'
    if (filter === 'scheduled') return meeting.status === 'scheduled'
    return true
  })

  const overallAttendance = Math.round(
    meetings.reduce((sum, m) => sum + m.percent, 0) / meetings.length
  )

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'status-completed'
      case 'open': return 'status-open'
      case 'scheduled': return 'status-scheduled'
      default: return ''
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Completed'
      case 'open': return 'In Progress'
      case 'scheduled': return 'Scheduled'
      default: return status
    }
  }

  return (
    <DashboardLayout user={user}>
      <div className="attendance-reports-page">
        <div className="reports-header">
          <div className="header-info">
            <h2 className="page-title">Attendance Reports</h2>
            <p className="page-subtitle">
              Track and review attendance across all lectures and team meetings
            </p>
          </div>
          <div className="overall-stats">
            <div className="stat-card-lg">
              <p className="stat-label">Overall Attendance</p>
              <p className="stat-value">{overallAttendance}%</p>
            </div>
          </div>
        </div>

        <div className="reports-controls">
          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-tab ${filter === 'lectures' ? 'active' : ''}`}
              onClick={() => setFilter('lectures')}
            >
              Lectures
            </button>
            <button
              className={`filter-tab ${filter === 'team-meetings' ? 'active' : ''}`}
              onClick={() => setFilter('team-meetings')}
            >
              Team Meetings
            </button>
            <span className="filter-divider">|</span>
            <button
              className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
            <button
              className={`filter-tab ${filter === 'open' ? 'active' : ''}`}
              onClick={() => setFilter('open')}
            >
              Open
            </button>
            <button
              className={`filter-tab ${filter === 'scheduled' ? 'active' : ''}`}
              onClick={() => setFilter('scheduled')}
            >
              Scheduled
            </button>
          </div>

          <button className="btn-export">📊 Export Report</button>
        </div>

        <div className="reports-list">
          {filteredMeetings.map(meeting => (
            <div key={meeting.id} className="report-card">
              <div className="report-card-header">
                <div>
                  <div className="report-type-badge">{meeting.type}</div>
                  <h3 className="report-title">{meeting.title}</h3>
                  <p className="report-date">
                    📅 {formatDate(meeting.date)} • 🕒 {meeting.time}
                  </p>
                </div>
                <div className="report-stats">
                  <div className={`status-badge ${getStatusClass(meeting.status)}`}>
                    {getStatusLabel(meeting.status)}
                  </div>
                  {meeting.status === 'completed' && (
                    <div className="attendance-percentage">{meeting.percent}%</div>
                  )}
                </div>
              </div>
              <div className="report-card-body">
                {meeting.status !== 'scheduled' && (
                  <>
                    <div className="attendance-bar">
                      <div
                        className="attendance-fill"
                        style={{ width: `${meeting.percent}%` }}
                      ></div>
                    </div>
                    <div className="attendance-summary">
                      <span>{meeting.attended} / {meeting.total} attended</span>
                      <button className="btn-link">View Details</button>
                    </div>
                  </>
                )}
                {meeting.status === 'scheduled' && (
                  <p className="scheduled-message">Attendance tracking will begin when the session starts</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMeetings.length === 0 && (
          <div className="empty-state">
            <p>No meetings found matching your filter criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default AttendanceReports
