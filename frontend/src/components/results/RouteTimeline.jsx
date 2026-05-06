import { clsx } from 'clsx'
import { MapPin, ArrowRight, Clock } from 'lucide-react'
import { GlassCard, GlassCardTitle, GlassCardContent } from '../ui/GlassCard'
import { LineBadge } from '../ui/Badge'

export function RouteTimeline({ steps = [] }) {
  return (
    <GlassCard elevated>
      <GlassCardTitle icon={MapPin}>
        Detalle del Trayecto
      </GlassCardTitle>
      
      <GlassCardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <TimelineStep
                key={index}
                step={step}
                isFirst={index === 0}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}

function TimelineStep({ step, isFirst, isLast }) {
  const getStepIcon = () => {
    if (step.type === 'walk') return Footprints
    return MapPin
  }

  const Icon = getStepIcon()
  
  return (
    <div className="relative flex gap-4 pb-8 last:pb-0">
      {/* Dot */}
      <div className={clsx(
        'relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2',
        isFirst || isLast
          ? 'bg-primary border-primary'
          : step.type === 'transfer'
            ? 'bg-warning border-warning'
            : 'bg-surface-elevated border-border'
      )}>
        <Icon className={clsx(
          'w-5 h-5',
          isFirst || isLast ? 'text-black' : 'text-foreground-muted'
        )} />
      </div>
      
      {/* Content */}
      <div className="flex-1 pt-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-semibold text-foreground">
              {step.station}
            </h4>
            {step.line && (
              <div className="flex items-center gap-2 mt-1">
                <LineBadge line={step.line} />
                {step.direction && (
                  <span className="text-xs text-foreground-muted">
                    {step.direction}
                  </span>
                )}
              </div>
            )}
            {step.instruction && (
              <p className="text-sm text-foreground-muted mt-1">
                {step.instruction}
              </p>
            )}
          </div>
          
          {step.duration && (
            <div className="flex items-center gap-1 text-sm text-foreground-muted shrink-0">
              <Clock className="w-4 h-4" />
              <span>{step.duration}</span>
            </div>
          )}
        </div>
        
        {/* Transfer indicator */}
        {step.type === 'transfer' && step.instruction && (
          <div className="mt-3 p-3 rounded-lg bg-warning-muted border border-warning/20">
            <div className="flex items-center gap-2 text-sm text-warning">
              <ArrowRight className="w-4 h-4" />
              <span>{step.instruction}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
