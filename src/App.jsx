import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import StudentDashboard from './pages/StudentDashboard'
import InstructorDashboard from './pages/InstructorDashboard'
import TutorDashboard from './pages/TutorDashboard'
import TADashboard from './pages/TADashboard'
import AdminDashboard from './pages/AdminDashboard'
import AccessDenied from './pages/AccessDenied'
import PlaceholderPage from './pages/PlaceholderPage'
import Roster from './pages/Roster'
import InstructorLectures from './pages/InstructorLectures'
import ClassDirectory from './pages/ClassDirectory'
import CourseSettings from './pages/CourseSettings'
import TeamMeetings from './pages/TeamMeetings'
import AttendanceReports from './pages/AttendanceReports'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/tutor-dashboard" element={<TutorDashboard />} />
        <Route path="/ta-dashboard" element={<TADashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        
        {/* Instructor-specific routes */}
        <Route path="/roster" element={<Roster />} />
        <Route path="/instructor-lectures" element={<InstructorLectures />} />
        <Route path="/class-directory" element={<ClassDirectory />} />
        <Route path="/instructor-team-meetings" element={<TeamMeetings />} />
        <Route path="/course-settings" element={<CourseSettings />} />
        <Route path="/meeting-attendance" element={<AttendanceReports />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
