import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate logged in as professor
    // In real app, this would check actual user role
    navigate('/instructor-dashboard', { replace: true })
  }, [navigate])

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}

export default Dashboard
