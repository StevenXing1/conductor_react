import Sidebar from '../components/Sidebar'
import './DashboardLayout.css'

function DashboardLayout({ children, user }) {
  return (
    <div className="dashboard-layout">
      <Sidebar user={user} />
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
