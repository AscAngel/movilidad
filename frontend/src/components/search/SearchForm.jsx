import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, Settings2, ArrowRight, Search, Repeat, AlertCircle } from 'lucide-react'
import { GlassCard, GlassCardTitle, GlassCardContent } from '../ui/GlassCard'
import { Select } from '../ui/Select'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { getAvailableLines, getStationsForLine, getStationById } from '../../data/stations'
import { searchRoutes } from '../../services/api'

export function SearchForm({ onSearch }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    originLine: '',
    originStation: '',
    destinationLine: '',
    destinationStation: '',
    departureTime: '',
    preference: 'balanced',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState(null)

  const availableLines = useMemo(() => getAvailableLines(), [])
  const originStations = useMemo(() => getStationsForLine(formData.originLine), [formData.originLine])
  const destinationStations = useMemo(() => getStationsForLine(formData.destinationLine), [formData.destinationLine])

  const preferenceOptions = [
    { value: 'balanced', label: 'Equilibrado' },
    { value: 'fastest', label: 'Menor tiempo' },
    { value: 'least_transfers', label: 'Menos transbordos' },
    { value: 'cheapest', label: 'Más económico' },
  ]

  const handleChange = (field) => (e) => {
    const value = e.target.value
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      
      // Clear station selection if line changed
      if (field === 'originLine') {
        newData.originStation = ''
      }
      if (field === 'destinationLine') {
        newData.destinationStation = ''
      }
      
      return newData
    })
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
    setApiError(null)
  }

  const swapStations = () => {
    setFormData(prev => ({
      ...prev,
      originLine: prev.destinationLine,
      originStation: prev.destinationStation,
      destinationLine: prev.originLine,
      destinationStation: prev.originStation,
    }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.originLine) newErrors.originLine = 'Selecciona línea de origen'
    if (!formData.originStation) newErrors.originStation = 'Selecciona estación de origen'
    if (!formData.destinationLine) newErrors.destinationLine = 'Selecciona línea de destino'
    if (!formData.destinationStation) newErrors.destinationStation = 'Selecciona estación de destino'
    
    if (formData.originStation && formData.destinationStation && 
        formData.originStation === formData.destinationStation) {
      newErrors.destinationStation = 'El destino debe ser diferente al origen'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setApiError(null)
    
    try {
      // Call the API to search routes
      const response = await searchRoutes({
        origin: formData.originStation,
        destination: formData.destinationStation,
        departureTime: formData.departureTime,
        preference: formData.preference,
      })

      // Store the results in sessionStorage to pass to ResultsPage
      sessionStorage.setItem('routeSearchResults', JSON.stringify(response))
      
      if (onSearch) {
        await onSearch(formData)
      }
      
      // Navigate to results page with search parameters
      const params = new URLSearchParams({
        origin: formData.originStation,
        destination: formData.destinationStation,
        time: formData.departureTime || 'now',
        preference: formData.preference,
      })
      
      navigate(`/resultados?${params.toString()}`)
    } catch (error) {
      console.error('Search error:', error)
      const errorMessage = error.response?.data?.detail || 
                          error.message || 
                          'Error al buscar rutas. Verifica los datos e intenta nuevamente.'
      setApiError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassCard elevated className="w-full max-w-4xl mx-auto animate-fade-in">
      <GlassCardTitle icon={Search} className="mb-6">
        Buscar Ruta
      </GlassCardTitle>
      
      <GlassCardContent>
        {apiError && (
          <div className="mb-6 p-4 rounded-lg bg-danger-muted border border-danger/20 flex gap-3">
            <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-danger">{apiError}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Origin: Line and Station */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Origen</label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                placeholder="Selecciona línea"
                options={availableLines}
                value={formData.originLine}
                onChange={handleChange('originLine')}
                error={errors.originLine}
              />
              <Select
                placeholder="Selecciona estación"
                options={originStations}
                value={formData.originStation}
                onChange={handleChange('originStation')}
                error={errors.originStation}
                disabled={!formData.originLine}
              />
            </div>
          </div>

          {/* Swap button - Compact */}
          <div className="flex justify-center -my-2">
            <button
              type="button"
              onClick={swapStations}
              className="p-1.5 rounded-full bg-surface hover:bg-surface-elevated border border-border-subtle hover:border-primary transition-all group"
              aria-label="Intercambiar origen y destino"
              title="Intercambiar"
            >
              <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary transition-colors rotate-90" />
            </button>
          </div>

          {/* Destination: Line and Station */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Destino</label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                placeholder="Selecciona línea"
                options={availableLines}
                value={formData.destinationLine}
                onChange={handleChange('destinationLine')}
                error={errors.destinationLine}
              />
              <Select
                placeholder="Selecciona estación"
                options={destinationStations}
                value={formData.destinationStation}
                onChange={handleChange('destinationStation')}
                error={errors.destinationStation}
                disabled={!formData.destinationLine}
              />
            </div>
          </div>

          {/* Time and Preference */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Hora de salida (opcional)
              </label>
              <Input
                type="time"
                value={formData.departureTime}
                onChange={handleChange('departureTime')}
                placeholder="HH:MM"
              />
            </div>
            
            <Select
              label="Preferencia"
              icon={Settings2}
              options={preferenceOptions}
              value={formData.preference}
              onChange={handleChange('preference')}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? 'Buscando rutas...' : 'Buscar Rutas'}
          </Button>
        </form>
      </GlassCardContent>
    </GlassCard>
  )
}
