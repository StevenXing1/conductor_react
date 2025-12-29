import { useState, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import './Roster.css'

function Roster() {
  const [user] = useState({
    name: 'Professor Smith',
    email: 'psmith@ucsd.edu',
    role: 'Instructor'
  })

  const [roster, setRoster] = useState([
    { id: 1, name: 'Alice Johnson', email: 'ajohnson@ucsd.edu', pid: 'A12345678', role: 'Student', status: 'Enrolled', team: 'Team 1' },
    { id: 2, name: 'Bob Williams', email: 'bwilliams@ucsd.edu', pid: 'A87654321', role: 'Student', status: 'Enrolled', team: 'Team 2' },
    { id: 3, name: 'Carol Davis', email: 'cdavis@ucsd.edu', pid: 'A11223344', role: 'TA', status: 'Enrolled', team: null },
    { id: 4, name: 'David Miller', email: 'dmiller@ucsd.edu', pid: 'A99887766', role: 'Tutor', status: 'Enrolled', team: null },
    { id: 5, name: 'Eve Anderson', email: 'eanderson@ucsd.edu', pid: 'A55667788', role: 'Student', status: 'Enrolled', team: 'Team 1' },
  ])

  const [filters, setFilters] = useState({
    search: '',
    role: 'all',
    status: 'all',
    team: 'all'
  })

  const [stats, setStats] = useState({
    total: 0,
    students: 0,
    tas: 0,
    tutors: 0
  })

  useEffect(() => {
    calculateStats()
  }, [roster])

  const calculateStats = () => {
    setStats({
      total: roster.length,
      students: roster.filter(p => p.role === 'Student').length,
      tas: roster.filter(p => p.role === 'TA').length,
      tutors: roster.filter(p => p.role === 'Tutor').length
    })
  }

  const filteredRoster = roster.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         person.email.toLowerCase().includes(filters.search.toLowerCase()) ||
                         person.pid.toLowerCase().includes(filters.search.toLowerCase())
    const matchesRole = filters.role === 'all' || person.role.toLowerCase() === filters.role.toLowerCase()
    const matchesStatus = filters.status === 'all' || person.status.toLowerCase() === filters.status.toLowerCase()
    const matchesTeam = filters.team === 'all' || person.team === filters.team
    
    return matchesSearch && matchesRole && matchesStatus && matchesTeam
  })

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }))
  }

  const handleRoleFilter = (role) => {
    setFilters(prev => ({ ...prev, role }))
  }

  const handleStatusFilter = (status) => {
    setFilters(prev => ({ ...prev, status }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      role: 'all',
      status: 'all',
      team: 'all'
    })
  }

  return (
    <DashboardLayout user={user}>
      <div className="roster-page">
        <div className="roster-header">
          <div className="roster-title-section">
            <h2 className="page-title">Course Roster</h2>
            <div className="active-offering-display">
              <span className="offering-label">Active Offering:</span>
              <span className="offering-name">CSE 210 Fall 2025</span>
            </div>
          </div>
          <div className="roster-actions">
            <button className="btn btn-soft">Export</button>
            <button className="btn btn-soft">Import</button>
            <button className="btn btn-primary">Add Person</button>
          </div>
        </div>

        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total People</div>
              <div className="stat-value">{stats.total}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Students</div>
              <div className="stat-value">{stats.students}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">TAs</div>
              <div className="stat-value">{stats.tas}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Tutors</div>
              <div className="stat-value">{stats.tutors}</div>
            </div>
          </div>
        </section>

        <section className="roster-controls">
          <div className="search-input-wrapper">
            <input
              type="search"
              placeholder="Search name, email, PID"
              value={filters.search}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <div className="chip-group">
              <button
                className={`chip ${filters.role === 'all' ? 'active' : ''}`}
                onClick={() => handleRoleFilter('all')}
              >
                All roles
              </button>
              <button
                className={`chip ${filters.role === 'student' ? 'active' : ''}`}
                onClick={() => handleRoleFilter('student')}
              >
                Students
              </button>
              <button
                className={`chip ${filters.role === 'ta' ? 'active' : ''}`}
                onClick={() => handleRoleFilter('ta')}
              >
                TAs
              </button>
              <button
                className={`chip ${filters.role === 'tutor' ? 'active' : ''}`}
                onClick={() => handleRoleFilter('tutor')}
              >
                Tutors
              </button>
            </div>
          </div>

          <div className="filter-group">
            <div className="chip-group">
              <button
                className={`chip ${filters.status === 'all' ? 'active' : ''}`}
                onClick={() => handleStatusFilter('all')}
              >
                All statuses
              </button>
              <button
                className={`chip ${filters.status === 'enrolled' ? 'active' : ''}`}
                onClick={() => handleStatusFilter('enrolled')}
              >
                Enrolled
              </button>
            </div>
          </div>

          <button className="btn btn-ghost" onClick={clearFilters}>
            Clear filters
          </button>
        </section>

        <section className="roster-table-section">
          <table className="roster-table">
            <thead>
              <tr>
                <th>Person</th>
                <th>Course Role</th>
                <th>Status</th>
                <th>Team</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoster.map(person => (
                <tr key={person.id}>
                  <td>
                    <div className="person-cell">
                      <div className="person-info">
                        <div className="person-name">{person.name}</div>
                        <div className="person-email">{person.email}</div>
                        <div className="person-pid">{person.pid}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge role-${person.role.toLowerCase()}`}>
                      {person.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${person.status.toLowerCase()}`}>
                      {person.status}
                    </span>
                  </td>
                  <td>{person.team || '—'}</td>
                  <td>
                    <button className="btn-icon" title="Edit">✏️</button>
                    <button className="btn-icon" title="Delete">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRoster.length === 0 && (
            <div className="empty-state">
              <p>No people found. Try clearing your search or filters.</p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  )
}

export default Roster
