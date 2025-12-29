import { Link, useNavigate } from 'react-router-dom'
import './Sidebar.css'

function Sidebar({ user }) {
  const navigate = useNavigate()

  const handleSignOut = () => {
    navigate('/')
  }

  const navigationLinks = [
    { name: 'Dashboard', path: '/instructor-dashboard', icon: '🏠' },
    { name: 'Roster', path: '/roster', icon: '👥' },
    { name: 'Lectures', path: '/instructor-lectures', icon: '📚' },
    { name: 'Team Meetings', path: '/instructor-team-meetings', icon: '👥' },
    { name: 'Class Directory', path: '/class-directory', icon: '📖' },
    { name: 'Course Settings', path: '/course-settings', icon: '⚙️' },
    { name: 'Attendance', path: '/meeting-attendance', icon: '✓' },
  ]

  return (
    <aside className="sidebar" role="navigation" aria-label="Primary navigation">
      <div className="sidebar-logo">
        <img src="/assets/temp-logo.png" alt="Conductor logo" />
      </div>
      <h1 className="sidebar-title">Conductor</h1>

      <div className="main-menu-header">Main Menu</div>
      
      <p className="sidebar-user">
        <span className="sidebar-user-name">{user?.name || 'Loading...'}</span><br />
        <span className="sidebar-user-role">{user?.role || 'Loading...'}</span>
      </p>

      <nav aria-label="Dashboard navigation">
        {navigationLinks.map((link, index) => (
          <Link key={index} to={link.path} className="sidebar-link">
            <span className="sidebar-link-icon">{link.icon}</span>
            {link.name}
          </Link>
        ))}
      </nav>

      <footer className="sidebar-footer">
        <button onClick={handleSignOut} className="btn btn-ghost btn-footer">
          Sign out
        </button>
      </footer>
    </aside>
  )
}

export default Sidebar
