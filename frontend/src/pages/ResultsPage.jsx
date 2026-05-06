import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, GitCompare, Share2, Download } from 'lucide-react'
import { RouteTimeline } from '../components/results/RouteTimeline'
import { RouteMetrics } from '../components/results/RouteMetrics'
import { ExpertExplanation } from '../components/results/ExpertExplanation'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge, LineBadge } from '../components/ui/Badge'
import { getStationById } from '../data/stations'

// Mock data for demonstration - will be replaced with API data
const mockRouteData = {
  id: 'route-1',
  origin: 'Periferico_Norte',
  destination: 'Central_de_Autobuses',
  metrics: {
    totalTime: 45,
    transfers: 1,
    cost: 9.50,
    stations: 12,
    walkingTime: 5,
    waitTime: 8,
  },
  steps: [
    {
      station: 'Periférico Norte',
      line: 'L1',
      direction: 'Periférico Sur',
      instruction: 'Aborda el Tren Ligero Línea 1',
      duration: '2 min',
      type: 'board',
    },
    {
      station: 'Ávila Camacho',
      line: 'L1',
      type: 'transfer',
      transferTo: 'Línea 3',
      instruction: 'Transbordo a Línea 3',
      duration: '5 min',
    },
    {
      station: 'Ávila Camacho',
      line: 'L3',
      direction: 'Central de Autobuses',
      instruction: 'Continúa en Línea 3',
      duration: '3 min',
      type: 'continue',
    },
    {
      station: 'Guadalajara Centro',
      line: 'L3',
      instruction: 'Continúa por 6 estaciones',
      duration: '15 min',
      type: 'transit',
    },
    {
      station: 'Central de Autobuses',
      line: 'L3',
      instruction: 'Has llegado a tu destino',
      duration: null,
      type: 'arrive',
    },
  ],
  explanation: {
    summary: 'Esta ruta ha sido seleccionada como la óptima considerando tu preferencia de equilibrio entre tiempo y transbordos. Utiliza la combinación de Línea 1 y Línea 3, con un único transbordo en la estación Ávila Camacho.',
    reasoning: [
      'Se analizaron 4 rutas posibles entre Periférico Norte y Central de Autobuses.',
      'La ruta directa por Línea 7 fue descartada por mayor tiempo total (58 min).',
      'Se priorizó la combinación L1-L3 por menor tiempo de espera en transbordo.',
      'El horario actual (fuera de hora pico) favorece frecuencias de 5-7 minutos.',
      'Se consideró la capacidad disponible basada en datos históricos.',
    ],
    factors: [
      'Tiempo total',
      'Número de transbordos',
      'Frecuencia de servicio',
      'Hora del día',
      'Capacidad estimada',
      'Distancia caminando',
    ],
    alternatives: [
      { id: 'route-2', time: 52, transfers: 0 },
      { id: 'route-3', time: 48, transfers: 2 },
    ],
    confidence: 87,
  },
  lines: ['L1', 'L3'],
}

export function ResultsPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [routeData, setRouteData] = useState(null)
  const [loading, setLoading] = useState(true)

  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')

  const originStation = useMemo(() => getStationById(origin), [origin])
  const destStation = useMemo(() => getStationById(destination), [destination])

  useEffect(() => {
    // Simulate API call
    const fetchRoute = async () => {
      setLoading(true)
      // In real app, call: const data = await searchRoutes({ origin, destination, ... })
      await new Promise(resolve => setTimeout(resolve, 800))
      setRouteData(mockRouteData)
      setLoading(false)
    }
    
    fetchRoute()
  }, [origin, destination])

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

  if (!routeData) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground-muted">No se encontraron rutas</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Volver a buscar
        </Button>
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
            Ruta Recomendada
          </h1>
          
          <div className="flex items-center gap-2 mt-2 text-foreground-muted">
            <span>{originStation?.name || origin}</span>
            <span className="text-primary">→</span>
            <span>{destStation?.name || destination}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {routeData.lines.map(line => (
            <LineBadge key={line} line={line} className="text-sm px-3 py-1.5" />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Link to={`/compare?route=${routeData.id}&origin=${origin}&destination=${destination}`}>
          <Button variant="secondary" icon={GitCompare}>
            Comparar Rutas
          </Button>
        </Link>
        <Button variant="ghost" icon={Share2}>
          Compartir
        </Button>
        <Button variant="ghost" icon={Download}>
          Descargar
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <RouteTimeline steps={routeData.steps} />
        </div>
        
        {/* Right Column - Metrics & Explanation */}
        <div className="space-y-6">
          <RouteMetrics metrics={routeData.metrics} />
        </div>
      </div>

      {/* Expert Explanation - Full Width */}
      <ExpertExplanation explanation={routeData.explanation} />
    </div>
  )
}
