import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Filter } from 'lucide-react'
import { ComparisonCard } from '../components/compare/ComparisonCard'
import { ComparisonBarChart, ComparisonRadarChart } from '../components/compare/ComparisonChart'
import { Button } from '../components/ui/Button'
import { GlassCard, GlassCardTitle, GlassCardContent } from '../components/ui/GlassCard'
import { Select } from '../components/ui/Select'
import { getStationById } from '../data/stations'

export function ComparePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [routes, setRoutes] = useState([])
  const [selectedRoutes, setSelectedRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('recommended')

  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const time = searchParams.get('time')
  const preference = searchParams.get('preference') || 'balanced'

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
      try {
        // Try to get cached results from previous search
        const cached = sessionStorage.getItem('routeSearchResults')
        if (cached) {
          const searchResults = JSON.parse(cached)
          if (searchResults.routes) {
            // Transform API response to match component expectations
            const transformedRoutes = searchResults.routes.map((route, index) => {
              const tags = []
              if (index === 0) {
                tags.push({ label: 'Recomendada', variant: 'success' })
              }
              if (route.metrics.transfers === 0) {
                tags.push({ label: 'Sin transbordos', variant: 'warning' })
              }
              if (route.metrics.total_time === Math.min(...searchResults.routes.map(r => r.metrics.total_time))) {
                tags.push({ label: 'Más rápida', variant: 'primary' })
              }
              if (route.metrics.cost === Math.min(...searchResults.routes.map(r => r.metrics.cost))) {
                tags.push({ label: 'Más económica', variant: 'accent' })
              }

              return {
                id: route.id,
                name: `Ruta ${index + 1} ${route.lines.join(' + ')}`,
                lines: route.lines,
                metrics: {
                  totalTime: route.metrics.total_time,
                  transfers: route.metrics.transfers,
                  cost: route.metrics.cost,
                  stations: route.metrics.stations_count,
                  walkingTime: route.metrics.walking_time,
                },
                tags: tags.length > 0 ? tags : undefined,
              }
            })

            setRoutes(transformedRoutes)
            setSelectedRoutes([transformedRoutes[0]?.id])
          }
        }
      } catch (err) {
        console.error('Error loading routes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
  }, [])

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
    const params = new URLSearchParams({
      origin,
      destination,
      time: time || 'now',
      preference,
      route: routeId,
    })
    navigate(`/resultados?${params.toString()}`)
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

  if (routes.length === 0) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>
        <div className="text-center py-12">
          <p className="text-foreground-muted">No hay rutas para comparar</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Nueva búsqueda
          </Button>
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
        <div className="flex items-center justify-between flex-wrap gap-4">
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
