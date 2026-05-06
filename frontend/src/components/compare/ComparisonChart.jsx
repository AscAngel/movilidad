import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
} from 'recharts'
import { GlassCard, GlassCardTitle, GlassCardContent } from '../ui/GlassCard'
import { BarChart3, Activity } from 'lucide-react'

const chartColors = ['#22c55e', '#3b82f6', '#f59e0b', '#a855f7']

export function ComparisonBarChart({ routes = [], metric = 'totalTime', title = 'Comparación' }) {
  const data = routes.map((route, index) => ({
    name: route.name,
    value: route.metrics[metric],
    fill: chartColors[index % chartColors.length],
  }))

  const metricLabels = {
    totalTime: 'Tiempo (min)',
    transfers: 'Transbordos',
    cost: 'Costo ($)',
    stations: 'Estaciones',
    walkingTime: 'Caminata (min)',
  }

  return (
    <GlassCard>
      <GlassCardTitle icon={BarChart3}>
        {title}
      </GlassCardTitle>
      
      <GlassCardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
              <XAxis 
                type="number" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(24, 26, 33, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                }}
                labelStyle={{ color: '#f3f4f6' }}
                itemStyle={{ color: '#9ca3af' }}
                formatter={(value) => [`${value} ${metricLabels[metric]?.split('(')[1]?.replace(')', '') || ''}`, metricLabels[metric]?.split(' ')[0]]}
              />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}

export function ComparisonRadarChart({ routes = [] }) {
  // Normalize data for radar chart (0-100 scale)
  const normalizeData = (routes) => {
    const maxTime = Math.max(...routes.map(r => r.metrics.totalTime))
    const maxTransfers = Math.max(...routes.map(r => r.metrics.transfers)) || 1
    const maxCost = Math.max(...routes.map(r => r.metrics.cost))
    const maxStations = Math.max(...routes.map(r => r.metrics.stations))

    return [
      {
        metric: 'Rapidez',
        fullMark: 100,
        ...Object.fromEntries(routes.map((r, i) => [
          `route${i}`, 
          Math.round((1 - r.metrics.totalTime / maxTime) * 100)
        ]))
      },
      {
        metric: 'Transbordos',
        fullMark: 100,
        ...Object.fromEntries(routes.map((r, i) => [
          `route${i}`, 
          Math.round((1 - r.metrics.transfers / maxTransfers) * 100)
        ]))
      },
      {
        metric: 'Economía',
        fullMark: 100,
        ...Object.fromEntries(routes.map((r, i) => [
          `route${i}`, 
          Math.round((1 - r.metrics.cost / maxCost) * 100)
        ]))
      },
      {
        metric: 'Directa',
        fullMark: 100,
        ...Object.fromEntries(routes.map((r, i) => [
          `route${i}`, 
          Math.round((1 - r.metrics.stations / maxStations) * 100)
        ]))
      },
    ]
  }

  const data = normalizeData(routes)

  return (
    <GlassCard>
      <GlassCardTitle icon={Activity}>
        Análisis Comparativo
      </GlassCardTitle>
      
      <GlassCardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
              <PolarAngleAxis 
                dataKey="metric" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <PolarRadiusAxis 
                stroke="#6b7280"
                fontSize={10}
                angle={30}
              />
              {routes.map((route, index) => (
                <Radar
                  key={route.id}
                  name={route.name}
                  dataKey={`route${index}`}
                  stroke={chartColors[index % chartColors.length]}
                  fill={chartColors[index % chartColors.length]}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              ))}
              <Legend 
                wrapperStyle={{ paddingTop: 20 }}
                formatter={(value) => <span style={{ color: '#9ca3af' }}>{value}</span>}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(24, 26, 33, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f3f4f6' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}
