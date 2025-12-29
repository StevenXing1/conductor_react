import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import './ClassDirectory.css'

function ClassDirectory() {
  const [user] = useState({
    name: 'Professor Smith',
    email: 'psmith@ucsd.edu',
    role: 'Instructor'
  })

  const [activeTab, setActiveTab] = useState('professors')
  const [searchQuery, setSearchQuery] = useState('')

  const professors = [
    {
      id: 1,
      name: 'Dr. Thomas Powell',
      email: 'tpowell@ucsd.edu',
      officeHours: 'Mon/Wed 2-4 PM',
      location: 'CSE 4140',
      expertise: ['Software Architecture', 'Design Patterns']
    },
    {
      id: 2,
      name: 'Dr. Sarah Chen',
      email: 'schen@ucsd.edu',
      officeHours: 'Tue/Thu 1-3 PM',
      location: 'CSE 4250',
      expertise: ['Agile Development', 'Testing']
    }
  ]

  const tutors = [
    {
      id: 1,
      name: 'Mike Johnson',
      email: 'mjohnson@ucsd.edu',
      availability: 'Mon-Fri 10 AM - 4 PM',
      location: 'CSE Basement',
      specialties: ['Python', 'Git', 'Unit Testing']
    },
    {
      id: 2,
      name: 'Lisa Wang',
      email: 'lwang@ucsd.edu',
      availability: 'Tue/Thu 12-6 PM',
      location: 'CSE Basement',
      specialties: ['JavaScript', 'React', 'Node.js']
    }
  ]

  const tas = [
    {
      id: 1,
      name: 'Alex Martinez',
      email: 'amartinez@ucsd.edu',
      sections: 'Section A01, A02',
      officeHours: 'Wed 3-5 PM',
      location: 'CSE 2154'
    },
    {
      id: 2,
      name: 'Emily Taylor',
      email: 'etaylor@ucsd.edu',
      sections: 'Section B01, B02',
      officeHours: 'Thu 2-4 PM',
      location: 'CSE 2154'
    }
  ]

  const getCurrentData = () => {
    switch (activeTab) {
      case 'professors':
        return professors
      case 'tutors':
        return tutors
      case 'tas':
        return tas
      default:
        return []
    }
  }

  const filteredData = getCurrentData().filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderCard = (person) => {
    if (activeTab === 'professors') {
      return (
        <div key={person.id} className="directory-card">
          <div className="card-header">
            <div className="avatar">{person.name.charAt(0)}</div>
            <div className="person-info">
              <h3 className="person-name">{person.name}</h3>
              <a href={`mailto:${person.email}`} className="person-email">{person.email}</a>
            </div>
          </div>
          <div className="card-body">
            <div className="info-row">
              <span className="info-label">📅 Office Hours:</span>
              <span className="info-value">{person.officeHours}</span>
            </div>
            <div className="info-row">
              <span className="info-label">📍 Location:</span>
              <span className="info-value">{person.location}</span>
            </div>
            <div className="info-row">
              <span className="info-label">💡 Expertise:</span>
              <div className="tags">
                {person.expertise.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === 'tutors') {
      return (
        <div key={person.id} className="directory-card">
          <div className="card-header">
            <div className="avatar">{person.name.charAt(0)}</div>
            <div className="person-info">
              <h3 className="person-name">{person.name}</h3>
              <a href={`mailto:${person.email}`} className="person-email">{person.email}</a>
            </div>
          </div>
          <div className="card-body">
            <div className="info-row">
              <span className="info-label">📅 Availability:</span>
              <span className="info-value">{person.availability}</span>
            </div>
            <div className="info-row">
              <span className="info-label">📍 Location:</span>
              <span className="info-value">{person.location}</span>
            </div>
            <div className="info-row">
              <span className="info-label">🔧 Specialties:</span>
              <div className="tags">
                {person.specialties.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === 'tas') {
      return (
        <div key={person.id} className="directory-card">
          <div className="card-header">
            <div className="avatar">{person.name.charAt(0)}</div>
            <div className="person-info">
              <h3 className="person-name">{person.name}</h3>
              <a href={`mailto:${person.email}`} className="person-email">{person.email}</a>
            </div>
          </div>
          <div className="card-body">
            <div className="info-row">
              <span className="info-label">📚 Sections:</span>
              <span className="info-value">{person.sections}</span>
            </div>
            <div className="info-row">
              <span className="info-label">📅 Office Hours:</span>
              <span className="info-value">{person.officeHours}</span>
            </div>
            <div className="info-row">
              <span className="info-label">📍 Location:</span>
              <span className="info-value">{person.location}</span>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <DashboardLayout user={user}>
      <div className="class-directory-page">
        <header className="directory-header">
          <div className="header-info">
            <h2 className="page-title">Class Directory</h2>
            <p className="page-subtitle">
              Detailed contact and availability information for your instructors, tutors, and teaching team.
            </p>
          </div>
          <div className="header-right">
            <span className="offering-label">Active course</span>
            <span className="offering-name">CSE 210 Fall 2025</span>
          </div>
        </header>

        <div className="directory-tabs">
          <button
            className={`tab-btn ${activeTab === 'professors' ? 'active' : ''}`}
            onClick={() => setActiveTab('professors')}
          >
            Professors
          </button>
          <button
            className={`tab-btn ${activeTab === 'tutors' ? 'active' : ''}`}
            onClick={() => setActiveTab('tutors')}
          >
            Tutors
          </button>
          <button
            className={`tab-btn ${activeTab === 'tas' ? 'active' : ''}`}
            onClick={() => setActiveTab('tas')}
          >
            TAs
          </button>
        </div>

        <div className="directory-content">
          <div className="section-header">
            <div className="section-controls">
              <input
                type="search"
                className="search-input"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="cards-grid">
            {filteredData.map(person => renderCard(person))}
          </div>

          {filteredData.length === 0 && (
            <div className="empty-state">
              <p>No results found. Try a different search.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ClassDirectory
