import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import './InstructorLectures.css'

function InstructorLectures() {
  const [user] = useState({
    name: 'Professor Smith',
    email: 'psmith@ucsd.edu',
    role: 'Instructor'
  })

  const [lectures] = useState([
    {
      id: 1,
      title: 'Introduction to Software Engineering',
      date: '2025-09-15',
      startTime: '14:00',
      endTime: '15:30',
      attendancePercent: 95,
      totalStudents: 45,
      attended: 43
    },
    {
      id: 2,
      title: 'Agile Methodologies',
      date: '2025-09-22',
      startTime: '14:00',
      endTime: '15:30',
      attendancePercent: 88,
      totalStudents: 45,
      attended: 40
    },
    {
      id: 3,
      title: 'Design Patterns',
      date: '2025-09-29',
      startTime: '14:00',
      endTime: '15:30',
      attendancePercent: 92,
      totalStudents: 45,
      attended: 41
    },
    {
      id: 4,
      title: 'Testing Strategies',
      date: '2025-10-06',
      startTime: '14:00',
      endTime: '15:30',
      attendancePercent: 78,
      totalStudents: 45,
      attended: 35
    }
  ])

  const lastLecturePercent = lectures.length > 0 ? lectures[0].attendancePercent : 0

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <DashboardLayout user={user}>
      <div className="instructor-lectures-page">
        <header className="lectures-header">
          <div className="stat-and-chart-container">
            <div className="stat-card-large">
              <p className="eyebrow">Last session</p>
              <div className="stat-value-large">{lastLecturePercent}%</div>
              <p className="stat-caption">attendance in last lecture</p>
            </div>
            <div className="chart-card">
              <div className="chart-header">
                <span>Attendance history</span>
              </div>
              <div className="bar-chart-container">
                <div className="bar-chart">
                  {lectures.map((lecture, index) => (
                    <div key={lecture.id} className="bar-wrapper">
                      <div
                        className={`bar ${lecture.attendancePercent < 80 ? 'low' : ''}`}
                        style={{ height: `${Math.max(lecture.attendancePercent, 8)}%` }}
                      >
                        <div className="bar-percent">{lecture.attendancePercent}%</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chart-dates">
                  {lectures.map(lecture => (
                    <div key={lecture.id} className="date-label">
                      {formatDate(lecture.date)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="lecture-stack">
          <header className="stack-header">
            <h2>Lecture Attendance</h2>
            <button className="btn-primary">
              <span>New Lecture Attendance</span>
              <span aria-hidden="true">+</span>
            </button>
          </header>

          <div className="lecture-cards">
            {lectures.map(lecture => (
              <article key={lecture.id} className="lecture-card">
                <div className="lecture-card-header">
                  <h3 className="lecture-title">{lecture.title}</h3>
                  <div className="lecture-actions">
                    <button className="btn-link">View Responses</button>
                    <button className="btn-link btn-delete">Delete</button>
                  </div>
                </div>
                <div className="lecture-card-body">
                  <div className="lecture-meta">
                    <span className="lecture-date">📅 {formatDate(lecture.date)}</span>
                    <span className="lecture-time">🕒 {lecture.startTime} - {lecture.endTime}</span>
                  </div>
                  <div className="attendance-summary">
                    <div className="attendance-bar">
                      <div
                        className="attendance-fill"
                        style={{ width: `${lecture.attendancePercent}%` }}
                      ></div>
                    </div>
                    <div className="attendance-stats">
                      <span className="attendance-percent">{lecture.attendancePercent}%</span>
                      <span className="attendance-count">
                        {lecture.attended} / {lecture.totalStudents} students
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {lectures.length === 0 && (
            <div className="empty-state">
              <p>No lecture sessions yet. Start by creating one with the button above.</p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  )
}

export default InstructorLectures
