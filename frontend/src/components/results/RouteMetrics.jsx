import { Clock, ArrowRightLeft, DollarSign, Train, Footprints } from 'lucide-react'
import { GlassCard, GlassCardTitle, GlassCardContent } from '../ui/GlassCard'
import { MetricCard } from '../ui/MetricCard'

export function RouteMetrics({ metrics = {} }) {
  const {
    totalTime = 0,
    transfers = 0,
    cost = 0,
    stations = 0,
    walkingTime = 0,
    waitTime = 0,
  } = metrics

  return (
    <div className="space-y-6">
      <GlassCard elevated>
        <GlassCardTitle icon={Clock}>
          Resumen del Viaje
        </GlassCardTitle>
        
        <GlassCardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricItem
              icon={Clock}
              label="Tiempo Total"
              value={`${totalTime} min`}
              color="primary"
            />
            <MetricItem
              icon={ArrowRightLeft}
              label="Transbordos"
              value={transfers}
              color="warning"
            />
            <MetricItem
              icon={DollarSign}
              label="Costo Estimado"
              value={`$${cost.toFixed(2)}`}
              color="accent"
            />
            <MetricItem
              icon={Train}
              label="Estaciones"
              value={stations}
              color="primary"
            />
            <MetricItem
              icon={Footprints}
              label="Caminata"
              value={`${walkingTime} min`}
              color="foreground-muted"
            />
            <MetricItem
              icon={Clock}
              label="Tiempo Espera"
              value={`${waitTime} min`}
              color="foreground-muted"
            />
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  )
}

function MetricItem({ icon: Icon, label, value, color = 'primary' }) {
  const colorClasses = {
    primary: 'bg-primary-muted text-primary',
    warning: 'bg-warning-muted text-warning',
    accent: 'bg-accent-muted text-accent',
    'foreground-muted': 'bg-surface-elevated text-foreground-muted',
  }

  return (
    <div className="flex items-center gap-4 p-5 rounded-xl bg-surface-glass border border-border min-w-0">
      <div className={`p-3 rounded-lg shrink-0 ${colorClasses[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-foreground-muted truncate">{label}</p>
        <p className="text-xl font-bold text-foreground truncate">{value}</p>
      </div>
    </div>
  )
}
