import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Filter } from 'lucide-react'
import { ComparisonCard } from '../components/compare/ComparisonCard'
import { ComparisonBarChart, ComparisonRadarChart } from '../components/compare/ComparisonChart'
import { Button } from '../components/ui/Button'
import { GlassCard, GlassCardTitle, GlassCardContent } from '../components/ui/GlassCard'
import { Select } from '../components/ui/Select'
import { getStationById } from '../data/stations'

// Mock data for multiple routes
const mockRoutes = [
  {
    id: 'route-1',
    name: 'Ruta Óptima (L1 + L3)',
    lines: ['L1', 'L3'],
    metrics: {
      totalTime: 45,
      transfers: 1,
      cost: 9.50,
      stations: 12,
      walkingTime: 5,
      isFastest: true,
    },
    tags: [
      { label: 'Más rápida', variant: 'primary' },
      { label: 'Recomendada', variant: 'success' },
    ],
  },
  {
    id: 'route-2',
    name: 'Ruta Directa (L7)',
    lines: ['L7'],
    metrics: {
      totalTime: 52,
      transfers: 0,
      cost: 9.50,
      stations: 18,
      walkingTime: 3,
      fewestTransfers: true,
    },
    tags: [
      { label: 'Sin transbordos', variant: 'warning' },
    ],
  },
  {
    id: 'route-3',
    name: 'Ruta Alternativa (L1 + L2 + L3)',
    lines: ['L1', 'L2', 'L3'],
    metrics: {
      totalTime: 48,
      transfers: 2,
      cost: 14.25,
      stations: 15,
      walkingTime: 8,
    },
    tags: [
      { label: 'Más opciones', variant: 'accent' },
    ],
  },
  {
    id: 'route-4',
    name: 'Ruta Económica (L6)',
    lines: ['L6'],
    metrics: {
      totalTime: 55,
      transfers: 0,
      cost: 7.00,
      stations: 20,
      walkingTime: 10,
      cheapest: true,
    },
    tags: [
      { label: 'Más económica', variant: 'primary' },
    ],
  },
]

export function ComparePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [routes, setRoutes] = useState([])
  const [selectedRoutes, setSelectedRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('recommended')

  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')

  const originStation = useMemo(() => getStationById(origin), [origin])
  const destStation = useMemo(() => getStationById(destination), [destination])

  const sortOptions = [
    { value: 'recommended', label: 'Recomendadas' },
    { value: 'fastest', label: 'Más rápidas' },
    { value: 'transfers', label: 'Menos transbordos' },
    { value: 'cheapest', label: 'Más económicas' },
  ]

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 600))
      setRoutes(mockRoutes)
      setSelectedRoutes([mockRoutes[0].id]) // Pre-select recommended
      setLoading(false)
    }
    fetchRoutes()
  }, [origin, destination])

  const sortedRoutes = useMemo(() => {
    const sorted = [...routes]
    switch (sortBy) {
      case 'fastest':
        sorted.sort((a, b) => a.metrics.totalTime - b.metrics.totalTime)
        break
      case 'transfers':
        sorted.sort((a, b) => a.metrics.transfers - b.metrics.transfers)
        break
      case 'cheapest':
        sorted.sort((a, b) => a.metrics.cost - b.metrics.cost)
        break
      default:
        // Keep original order (recommended first)
        break
    }
    return sorted
  }, [routes, sortBy])

  const selectedRouteData = useMemo(() => {
    return routes.filter(r => selectedRoutes.includes(r.id))
  }, [routes, selectedRoutes])

  const handleSelectRoute = (routeId) => {
    setSelectedRoutes(prev => {
      if (prev.includes(routeId)) {
        return prev.filter(id => id !== routeId)
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), routeId]
      }
      return [...prev, routeId]
    })
  }

  const handleViewDetails = (routeId) => {
    navigate(`/resultados?origin=${origin}&destination=${destination}&route=${routeId}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground-muted">Cargando rutas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Comparar Rutas
          </h1>
          
          {origin && destination && (
            <div className="flex items-center gap-2 mt-2 text-foreground-muted">
              <span>{originStation?.name || origin}</span>
              <span className="text-primary">→</span>
              <span>{destStation?.name || destination}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Select
            icon={Filter}
            options={sortOptions}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-48"
          />
        </div>
      </div>

      {/* Selection Info */}
      <GlassCard padding="p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground-muted">
            Selecciona hasta 3 rutas para comparar. 
            <span className="text-primary font-medium ml-1">
              {selectedRoutes.length} seleccionada{selectedRoutes.length !== 1 ? 's' : ''}
            </span>
          </p>
          {selectedRoutes.length > 0 && (
            <Button 
              size="sm" 
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => handleViewDetails(selectedRoutes[0])}
            >
              Ver Ruta Seleccionada
            </Button>
          )}
        </div>
      </GlassCard>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {sortedRoutes.map((route, index) => (
          <ComparisonCard
            key={route.id}
            route={route}
            isRecommended={index === 0 && sortBy === 'recommended'}
            isSelected={selectedRoutes.includes(route.id)}
            onSelect={handleSelectRoute}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Charts Section */}
      {selectedRouteData.length >= 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComparisonBarChart 
            routes={selectedRouteData} 
            metric="totalTime"
            title="Comparación de Tiempo"
          />
          <ComparisonRadarChart routes={selectedRouteData} />
        </div>
      )}

      {/* Single Route Info */}
      {selectedRouteData.length === 1 && (
        <GlassCard className="text-center py-8">
          <p className="text-foreground-muted">
            Selecciona al menos 2 rutas para ver la comparación gráfica
          </p>
        </GlassCard>
      )}
    </div>
  )
}
