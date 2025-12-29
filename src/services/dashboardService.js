import api from './api'

export const dashboardService = {
  async getDashboardData() {
    const response = await api.get('/api/dashboard')
    return response.data
  },

  async getOfferingStats(offeringId) {
    const response = await api.get(`/api/course-offerings/${offeringId}`)
    return response.data
  },

  async getAnnouncements(offeringId) {
    const response = await api.get(`/api/announcements/${offeringId}`)
    return response.data
  },

  async getUserEnrollment(offeringId, userId) {
    const response = await api.get(`/api/enrollments/${offeringId}/user/${userId}`)
    return response.data
  },
}
