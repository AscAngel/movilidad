import { clsx } from 'clsx'
import { GlassCard } from './GlassCard'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function MetricCard({ 
  title, 
  value, 
  unit,
  change,
  changeType,
  icon: Icon,
  className = '',
  ...props 
}) {
  const getTrendIcon = () => {
    if (changeType === 'increase') return <TrendingUp className="w-4 h-4" />
    if (changeType === 'decrease') return <TrendingDown className="w-4 h-4" />
    return <Minus className="w-4 h-4" />
  }

  const getTrendColor = () => {
    if (changeType === 'increase') return 'text-primary'
    if (changeType === 'decrease') return 'text-error'
    return 'text-foreground-muted'
  }

  return (
    <GlassCard className={clsx('relative overflow-hidden', className)} {...props}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-foreground-muted mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-foreground-muted">{unit}</span>}
          </div>
          {change && (
            <div className={clsx('flex items-center gap-1 mt-2 text-sm', getTrendColor())}>
              {getTrendIcon()}
              <span>{change}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-lg bg-primary-muted">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
    </GlassCard>
  )
}
