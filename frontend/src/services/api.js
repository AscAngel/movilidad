import axios from 'axios'

// API base URL - configurable for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add error interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

/**
 * Search routes between two stations
 * @param {Object} params - Search parameters
 * @param {string} params.origin - Origin station ID
 * @param {string} params.destination - Destination station ID
 * @param {string} [params.departure_time] - Departure time (HH:MM)
 * @param {string} [params.preference] - User preference (balanced, fastest, least_transfers, cheapest)
 * @returns {Promise<Object>} Routes response
 */
export async function searchRoutes(params) {
  const payload = {
    origin: params.origin,
    destination: params.destination,
    departure_time: params.departureTime || params.departure_time || null,
    preference: params.preference || 'balanced',
  }
  
  console.log('🔍 Enviando búsqueda al API:')
  console.log('   URL: /api/routes/search')
  console.log('   Payload:', JSON.stringify(payload, null, 2))
  
  const response = await api.post('/api/routes/search', payload)
  
  console.log('✅ Respuesta del API:')
  console.log('   Total rutas:', response.data.routes?.length || 0)
  console.log('   Tiempo búsqueda:', response.data.search_time, 'ms')
  
  return response.data
}

/**
 * Get route details
 * @param {string} routeId - Route ID
 * @returns {Promise<Object>} Route details
 */
export async function getRouteDetails(routeId) {
  const response = await api.get(`/api/routes/${routeId}`)
  return response.data
}

/**
 * Get all available stations
 * @returns {Promise<Object>} Stations response
 */
export async function getStations() {
  const response = await api.get('/api/routes/stations')
  return response.data
}

/**
 * Get station details
 * @param {string} stationId - Station ID
 * @returns {Promise<Object>} Station details
 */
export async function getStation(stationId) {
  const response = await api.get(`/api/routes/stations/${stationId}`)
  return response.data
}

/**
 * Compare routes
 * @param {Array<string>} routeIds - Route IDs to compare
 * @returns {Promise<Object>} Comparison results
 */
export async function compareRoutes(routeIds) {
  const response = await api.post('/api/routes/compare', { 
    route_ids: routeIds 
  })
  return response.data
}

/**
 * Health check
 * @returns {Promise<Object>} Health status
 */
export async function healthCheck() {
  const response = await api.get('/api/health')
  return response.data
}

/**
 * Get system info
 * @returns {Promise<Object>} System information
 */
export async function getSystemInfo() {
  const response = await api.get('/api/info')
  return response.data
}

export default api
