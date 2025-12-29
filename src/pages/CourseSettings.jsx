import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import './CourseSettings.css'

function CourseSettings() {
  const [user] = useState({
    name: 'Professor Smith',
    email: 'psmith@ucsd.edu',
    role: 'Instructor'
  })

  const [courseInfo, setCourseInfo] = useState({
    code: 'CSE 210',
    name: 'Software Engineering',
    department: 'Computer Science & Engineering',
    credits: 4,
    term: 'Fall',
    year: 2025,
    startDate: '2025-09-15',
    endDate: '2025-12-15',
    location: 'CSE 1202',
    meetingDays: ['Monday', 'Wednesday', 'Friday'],
    meetingTime: '14:00-15:30'
  })

  const [theme, setTheme] = useState({
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    accentColor: '#f59e0b'
  })

  const handleCourseChange = (e) => {
    setCourseInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleThemeChange = (e) => {
    setTheme(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    alert('Settings saved successfully!')
  }

  return (
    <DashboardLayout user={user}>
      <div className="course-settings-page">
        <div className="settings-header">
          <h1 className="page-title">Course Settings</h1>
          <p className="page-subtitle">Manage your course configuration and appearance</p>
        </div>

        <form onSubmit={handleSave} className="settings-form">
          {/* Course Information */}
          <section className="settings-section">
            <div className="section-header">
              <h2 className="section-title">Course Information</h2>
              <p className="section-description">Update basic course details and scheduling information</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="code" className="form-label">
                  Course Code <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={courseInfo.code}
                  onChange={handleCourseChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Course Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={courseInfo.name}
                  onChange={handleCourseChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="department" className="form-label">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={courseInfo.department}
                  onChange={handleCourseChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="credits" className="form-label">Credits</label>
                <input
                  type="number"
                  id="credits"
                  name="credits"
                  value={courseInfo.credits}
                  onChange={handleCourseChange}
                  className="form-input"
                  min="0"
                  max="10"
                />
              </div>

              <div className="form-group">
                <label htmlFor="term" className="form-label">Term</label>
                <select
                  id="term"
                  name="term"
                  value={courseInfo.term}
                  onChange={handleCourseChange}
                  className="form-select"
                >
                  <option value="">Select term</option>
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="year" className="form-label">Year</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={courseInfo.year}
                  onChange={handleCourseChange}
                  className="form-input"
                  min="2000"
                  max="2100"
                />
              </div>

              <div className="form-group">
                <label htmlFor="startDate" className="form-label">
                  Start Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={courseInfo.startDate}
                  onChange={handleCourseChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate" className="form-label">
                  End Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={courseInfo.endDate}
                  onChange={handleCourseChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="location" className="form-label">Meeting Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={courseInfo.location}
                  onChange={handleCourseChange}
                  className="form-input"
                  placeholder="Building & Room Number"
                />
              </div>
            </div>
          </section>

          {/* Theme Settings */}
          <section className="settings-section">
            <div className="section-header">
              <h2 className="section-title">Theme Customization</h2>
              <p className="section-description">Customize the visual appearance of your course</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="primaryColor" className="form-label">Primary Color</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    id="primaryColor"
                    name="primaryColor"
                    value={theme.primaryColor}
                    onChange={handleThemeChange}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={theme.primaryColor}
                    onChange={handleThemeChange}
                    name="primaryColor"
                    className="form-input color-text"
                    placeholder="#667eea"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="secondaryColor" className="form-label">Secondary Color</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    id="secondaryColor"
                    name="secondaryColor"
                    value={theme.secondaryColor}
                    onChange={handleThemeChange}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={theme.secondaryColor}
                    onChange={handleThemeChange}
                    name="secondaryColor"
                    className="form-input color-text"
                    placeholder="#764ba2"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="accentColor" className="form-label">Accent Color</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    id="accentColor"
                    name="accentColor"
                    value={theme.accentColor}
                    onChange={handleThemeChange}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={theme.accentColor}
                    onChange={handleThemeChange}
                    name="accentColor"
                    className="form-input color-text"
                    placeholder="#f59e0b"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default CourseSettings
