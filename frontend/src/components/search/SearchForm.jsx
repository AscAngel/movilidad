import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, Settings2, ArrowRight, Search, Repeat } from 'lucide-react'
import { GlassCard, GlassCardTitle, GlassCardContent } from '../ui/GlassCard'
import { Select } from '../ui/Select'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { getStationOptions } from '../../data/stations'

export function SearchForm({ onSearch }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureTime: '',
    preference: 'balanced',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const stationOptions = useMemo(() => getStationOptions(), [])

  const preferenceOptions = [
    { value: 'balanced', label: 'Equilibrado' },
    { value: 'fastest', label: 'Menor tiempo' },
    { value: 'least_transfers', label: 'Menos transbordos' },
    { value: 'cheapest', label: 'Más económico' },
  ]

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const swapStations = () => {
    setFormData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.origin) newErrors.origin = 'Selecciona un origen'
    if (!formData.destination) newErrors.destination = 'Selecciona un destino'
    if (formData.origin && formData.destination && formData.origin === formData.destination) {
      newErrors.destination = 'El destino debe ser diferente al origen'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    
    // Simulate API call or use real API
    try {
      // For now, navigate to results with query params
      const params = new URLSearchParams({
        origin: formData.origin,
        destination: formData.destination,
        time: formData.departureTime || 'now',
        preference: formData.preference,
      })
      
      if (onSearch) {
        await onSearch(formData)
      }
      
      navigate(`/results?${params.toString()}`)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassCard elevated className="w-full max-w-2xl mx-auto animate-fade-in">
      <GlassCardTitle icon={Search} className="mb-6">
        Buscar Ruta
      </GlassCardTitle>
      
      <GlassCardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Origin and Destination */}
          <div className="relative">
            <div className="space-y-4">
              <Select
                label="Origen"
                icon={MapPin}
                options={stationOptions}
                value={formData.origin}
                onChange={handleChange('origin')}
                error={errors.origin}
                placeholder="Selecciona estación de origen"
              />
              
              <Select
                label="Destino"
                icon={MapPin}
                options={stationOptions}
                value={formData.destination}
                onChange={handleChange('destination')}
                error={errors.destination}
                placeholder="Selecciona estación de destino"
              />
            </div>
            
            {/* Swap button */}
            <button
              type="button"
              onClick={swapStations}
              className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 p-2 rounded-full bg-surface-elevated border border-border hover:border-primary hover:bg-primary-muted transition-all group"
              aria-label="Intercambiar origen y destino"
            >
              <Repeat className="w-4 h-4 text-foreground-muted group-hover:text-primary transition-colors" />
            </button>
          </div>

          {/* Time and Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="time"
              label="Hora de salida"
              icon={Clock}
              value={formData.departureTime}
              onChange={handleChange('departureTime')}
              placeholder="Ahora"
            />
            
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
            loading={loading}
            icon={ArrowRight}
            iconPosition="right"
            className="w-full"
            size="lg"
          >
            Buscar Rutas
          </Button>
        </form>
      </GlassCardContent>
    </GlassCard>
  )
}
