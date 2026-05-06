import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, GitCompare, Share2, Download, AlertCircle } from 'lucide-react'
import { RouteTimeline } from '../components/results/RouteTimeline'
import { RouteMetrics } from '../components/results/RouteMetrics'
import { ExpertExplanation } from '../components/results/ExpertExplanation'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge, LineBadge } from '../components/ui/Badge'
import { getStationById } from '../data/stations'
import { searchRoutes } from '../services/api'

export function ResultsPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [routeData, setRouteData] = useState(null)
  const [allRoutes, setAllRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const time = searchParams.get('time')
  const preference = searchParams.get('preference') || 'balanced'

  const originStation = useMemo(() => getStationById(origin), [origin])
  const destStation = useMemo(() => getStationById(destination), [destination])

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Try to get cached results first
        let searchResults = null
        const cached = sessionStorage.getItem('routeSearchResults')
        
        if (cached) {
          console.log('Usando resultados en caché')
          searchResults = JSON.parse(cached)
          sessionStorage.removeItem('routeSearchResults')
        } else {
          // If no cache, try to fetch from API directly
          console.log('No hay caché, buscando desde API...')
          if (!origin || !destination) {
            throw new Error('Parámetros de búsqueda faltantes')
          }
          
          searchResults = await searchRoutes({
            origin: origin,
            destination: destination,
            departureTime: time && time !== 'now' ? time : null,
            preference: preference,
          })
          console.log('Resultados del API:', searchResults)
        }

        if (searchResults && searchResults.routes && searchResults.routes.length > 0) {
          console.log('Rutas encontradas:', searchResults.routes.length)
          setAllRoutes(searchResults.routes)
          setRouteData(searchResults.routes[0]) // First route is the recommended one
        } else if (searchResults && searchResults.routes) {
          // Empty routes array is a valid response, not an error
          console.log('Sin rutas disponibles para esta búsqueda')
          setError('No se encontraron rutas disponibles entre las estaciones seleccionadas')
          setAllRoutes([])
        } else {
          throw new Error('Respuesta inválida del servidor')
        }
      } catch (err) {
        console.error('Error loading routes:', err)
        setError(err.message || 'Error al cargar las rutas')
        setAllRoutes([])
      } finally {
        setLoading(false)
      }
    }

    if (origin && destination) {
      fetchRoutes()
    }
  }, [origin, destination, time, preference])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground-muted">Analizando rutas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>
        
        <GlassCard className="border border-danger/20 bg-danger-muted/50">
          <div className="p-6 flex gap-4">
            <AlertCircle className="w-6 h-6 text-danger flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-danger mb-2">Error al procesar la búsqueda</h3>
              <p className="text-sm text-danger/80 mb-4">{error}</p>
              <Button 
                onClick={() => navigate('/')}
                size="sm"
              >
                Ir al inicio
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    )
  }

  if (!routeData) {
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
          <p className="text-foreground-muted mb-4">No se encontraron rutas</p>
          <Button onClick={() => navigate('/')}>
            Volver a buscar
          </Button>
        </div>
      </div>
    )
  }

  // Transform API response to match component expectations
  const transformedSteps = routeData.steps.map(step => ({
    station: step.station,
    line: step.line,
    direction: step.direction || '',
    instruction: step.instruction,
    duration: step.duration ? `${step.duration} min` : null,
    type: step.step_type,
  }))

  const transformedMetrics = {
    totalTime: routeData.metrics.total_time,
    transfers: routeData.metrics.transfers,
    cost: routeData.metrics.cost,
    stations: routeData.metrics.stations_count,
    walkingTime: routeData.metrics.walking_time,
    waitTime: routeData.metrics.wait_time,
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
            Ruta Recomendada
          </h1>
          
          <div className="flex items-center gap-2 mt-2 text-foreground-muted text-sm">
            <span className="font-medium">{originStation?.name || routeData.origin_name}</span>
            <span className="text-primary">→</span>
            <span className="font-medium">{destStation?.name || routeData.destination_name}</span>
            {time && time !== 'now' && (
              <>
                <span className="text-border">•</span>
                <span>Salida: {time}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          {routeData.lines.map(line => (
            <LineBadge key={line} line={line} className="text-sm px-3 py-1.5" />
          ))}
          {routeData.explanation.confidence && (
            <Badge variant="success" className="text-xs">
              {routeData.explanation.confidence}% confianza
            </Badge>
          )}
        </div>
      </div>

      {/* Actions */}
      {/* <div className="flex flex-wrap gap-3">
        {allRoutes.length > 1 && (
          <Link to={`/comparar?origin=${origin}&destination=${destination}&time=${time}&preference=${preference}`}>
            <Button variant="secondary" icon={GitCompare}>
              Comparar {allRoutes.length} Rutas
            </Button>
          </Link>
        )}
        <Button variant="ghost" icon={Share2}>
          Compartir
        </Button>
        <Button variant="ghost" icon={Download}>
          Descargar
        </Button>
      </div> */}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <RouteTimeline steps={transformedSteps} />
        </div>
        
        {/* Right Column - Metrics */}
        <div className="space-y-6">
          <RouteMetrics metrics={transformedMetrics} />
        </div>
      </div>

      {/* Expert Explanation - Full Width */}
      <ExpertExplanation explanation={routeData.explanation} />
    </div>
  )
}
