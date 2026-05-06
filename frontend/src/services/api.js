import axios from 'axios'

// API base URL - configurable for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Route search request
export async function searchRoutes(params) {
  const response = await api.post('/api/routes/search', params)
  return response.data
}

// Get route details
export async function getRouteDetails(routeId) {
  const response = await api.get(`/api/routes/${routeId}`)
  return response.data
}

// Get all stations
export async function getStations() {
  const response = await api.get('/api/stations')
  return response.data
}

// Compare routes
export async function compareRoutes(routeIds) {
  const response = await api.post('/api/routes/compare', { route_ids: routeIds })
  return response.data
}

export default api
