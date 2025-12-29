import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import './TeamMeetings.css'

function TeamMeetings() {
  const [user] = useState({
    name: 'Professor Smith',
    email: 'psmith@ucsd.edu',
    role: 'Instructor'
  })

  const [teams] = useState([
    {
      id: 1,
      name: 'Team Alpha',
      meetings: [
        { id: 1, date: '2025-12-10', time: '10:00-11:00', attendance: 5, total: 5, percent: 100 },
        { id: 2, date: '2025-12-17', time: '10:00-11:00', attendance: 4, total: 5, percent: 80 },
        { id: 3, date: '2025-12-24', time: '10:00-11:00', attendance: 3, total: 5, percent: 60 }
      ]
    },
    {
      id: 2,
      name: 'Team Beta',
      meetings: [
        { id: 4, date: '2025-12-10', time: '14:00-15:00', attendance: 6, total: 6, percent: 100 },
        { id: 5, date: '2025-12-17', time: '14:00-15:00', attendance: 5, total: 6, percent: 83 }
      ]
    },
    {
      id: 3,
      name: 'Team Gamma',
      meetings: [
        { id: 6, date: '2025-12-11', time: '11:00-12:00', attendance: 4, total: 5, percent: 80 },
        { id: 7, date: '2025-12-18', time: '11:00-12:00', attendance: 5, total: 5, percent: 100 }
      ]
    }
  ])

  const [selectedTeam, setSelectedTeam] = useState(null)

  const calculateOverallAttendance = (meetings) => {
    if (meetings.length === 0) return 0
    const totalAttendance = meetings.reduce((sum, m) => sum + m.attendance, 0)
    const totalPossible = meetings.reduce((sum, m) => sum + m.total, 0)
    return Math.round((totalAttendance / totalPossible) * 100)
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <DashboardLayout user={user}>
      <div className="team-meetings-page">
        {!selectedTeam ? (
          <>
            <div className="meetings-header">
              <div className="header-info">
                <p className="eyebrow">Team Meetings Overview</p>
                <h2 className="page-title">All Teams</h2>
                <p className="page-subtitle">Review meeting attendance for all teams</p>
              </div>
            </div>

            <div className="teams-grid">
              {teams.map(team => (
                <div
                  key={team.id}
                  className="team-card"
                  onClick={() => setSelectedTeam(team)}
                >
                  <div className="team-card-header">
                    <h3 className="team-name">{team.name}</h3>
                    <div className="team-attendance">
                      {calculateOverallAttendance(team.meetings)}%
                    </div>
                  </div>
                  <div className="team-card-body">
                    <div className="team-stat">
                      <span className="stat-label">Total Meetings:</span>
                      <span className="stat-value">{team.meetings.length}</span>
                    </div>
                    <button className="btn-link">View Details →</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="meetings-header">
              <button className="back-button" onClick={() => setSelectedTeam(null)}>
                ← Back
              </button>
              <div className="header-info">
                <p className="eyebrow">Team Meetings</p>
                <h2 className="page-title">{selectedTeam.name}</h2>
                <p className="page-subtitle">Review all meeting attendance for this team</p>
              </div>
              <div className="attendance-stats-card">
                <p className="label">Attendance Overall</p>
                <p className="value">{calculateOverallAttendance(selectedTeam.meetings)}%</p>
              </div>
            </div>

            <div className="meetings-list">
              {selectedTeam.meetings.map(meeting => (
                <div key={meeting.id} className="meeting-card">
                  <div className="meeting-card-header">
                    <div>
                      <h3 className="meeting-title">Team Meeting</h3>
                      <p className="meeting-date">📅 {formatDate(meeting.date)} • 🕒 {meeting.time}</p>
                    </div>
                    <div className="meeting-attendance-badge">
                      {meeting.percent}%
                    </div>
                  </div>
                  <div className="meeting-card-body">
                    <div className="attendance-bar">
                      <div
                        className="attendance-fill"
                        style={{ width: `${meeting.percent}%` }}
                      ></div>
                    </div>
                    <div className="attendance-details">
                      <span>{meeting.attendance} / {meeting.total} members attended</span>
                      <button className="btn-link">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

export default TeamMeetings
