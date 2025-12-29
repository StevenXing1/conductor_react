import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
})

export const authService = {
  async getCurrentUser() {
    const response = await api.get('/api/user')
    return response.data
  },

  async logout() {
    const response = await api.post('/auth/logout')
    return response.data
  },
}

export default api
