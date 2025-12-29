import { Link } from 'react-router-dom'
import './PlaceholderPage.css'

function PlaceholderPage({ title }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-content">
        <h1>{title}</h1>
        <p>This page is under construction.</p>
        <p className="subtitle">This feature will be implemented in a future update.</p>
        <Link to="/instructor-dashboard" className="back-button">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default PlaceholderPage
