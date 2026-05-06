import { clsx } from 'clsx'
import { Clock, ArrowRightLeft, DollarSign, Train, CheckCircle, Star } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'
import { LineBadge, Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

export function ComparisonCard({ 
  route, 
  isRecommended = false,
  isSelected = false,
  onSelect,
  onViewDetails 
}) {
  const {
    id,
    name,
    lines = [],
    metrics = {},
    tags = [],
  } = route

  return (
    <GlassCard 
      elevated={isRecommended}
      hover
      className={clsx(
        'relative transition-all cursor-pointer',
        isSelected && 'ring-2 ring-primary',
        isRecommended && 'animate-pulse-glow'
      )}
      onClick={() => onSelect?.(id)}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute -top-3 left-4 px-3 py-1 rounded-full bg-primary text-black text-xs font-semibold flex items-center gap-1">
          <Star className="w-3 h-3" />
          Recomendada
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4 pt-2">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{name}</h3>
          <div className="flex items-center gap-2">
            {lines.map(line => (
              <LineBadge key={line} line={line} />
            ))}
          </div>
        </div>
        
        {isSelected && (
          <div className="p-1.5 rounded-full bg-primary">
            <CheckCircle className="w-4 h-4 text-black" />
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <MetricItem 
          icon={Clock} 
          label="Tiempo" 
          value={`${metrics.totalTime} min`}
          highlight={metrics.isFastest}
        />
        <MetricItem 
          icon={ArrowRightLeft} 
          label="Transbordos" 
          value={metrics.transfers}
          highlight={metrics.fewestTransfers}
        />
        <MetricItem 
          icon={DollarSign} 
          label="Costo" 
          value={`$${metrics.cost?.toFixed(2)}`}
          highlight={metrics.cheapest}
        />
        <MetricItem 
          icon={Train} 
          label="Estaciones" 
          value={metrics.stations}
        />
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant={tag.variant || 'default'}>
              {tag.label}
            </Badge>
          ))}
        </div>
      )}

      {/* Action */}
      <Button 
        variant="secondary" 
        size="sm" 
        className="w-full"
        onClick={(e) => {
          e.stopPropagation()
          onViewDetails?.(id)
        }}
      >
        Ver Detalles
      </Button>
    </GlassCard>
  )
}

function MetricItem({ icon: Icon, label, value, highlight = false }) {
  return (
    <div className={clsx(
      'p-3 rounded-lg',
      highlight 
        ? 'bg-primary-muted border border-primary/30' 
        : 'bg-surface-glass border border-border'
    )}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={clsx('w-4 h-4', highlight ? 'text-primary' : 'text-foreground-muted')} />
        <span className="text-xs text-foreground-muted">{label}</span>
      </div>
      <p className={clsx('font-bold', highlight ? 'text-primary' : 'text-foreground')}>
        {value}
      </p>
    </div>
  )
}
