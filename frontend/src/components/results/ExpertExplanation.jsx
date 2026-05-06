import { Brain, CheckCircle, AlertTriangle, Info, Lightbulb } from 'lucide-react'
import { GlassCard, GlassCardTitle, GlassCardContent } from '../ui/GlassCard'
import { Badge } from '../ui/Badge'

export function ExpertExplanation({ explanation = {} }) {
  const {
    summary = '',
    reasoning = [],
    factors = [],
    alternatives = [],
    confidence = 0,
  } = explanation

  return (
    <GlassCard elevated>
      <GlassCardTitle icon={Brain}>
        Análisis del Sistema Experto
      </GlassCardTitle>
      
      <GlassCardContent className="space-y-6">
        {/* Confidence Score */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-primary-muted border border-primary/20">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Nivel de Confianza</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 rounded-full bg-surface-elevated overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="text-sm font-bold text-primary">{confidence}%</span>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h4 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
            Resumen
          </h4>
          <p className="text-foreground leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Reasoning Steps */}
        {reasoning.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
              Proceso de Razonamiento
            </h4>
            <div className="space-y-3">
              {reasoning.map((step, index) => (
                <div 
                  key={index}
                  className="flex gap-3 p-3 rounded-lg bg-surface-glass border border-border"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-muted text-accent text-sm font-bold shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Factors Considered */}
        {factors.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
              Factores Considerados
            </h4>
            <div className="flex flex-wrap gap-2">
              {factors.map((factor, index) => (
                <Badge key={index} variant="primary">
                  {factor}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Alternatives Note */}
        {alternatives.length > 0 && (
          <div className="p-4 rounded-lg bg-warning-muted border border-warning/20">
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <h5 className="font-medium text-foreground mb-1">
                  Alternativas Disponibles
                </h5>
                <p className="text-sm text-foreground-muted">
                  Se encontraron {alternatives.length} rutas alternativas. 
                  Puedes compararlas para elegir la que mejor se adapte a tus necesidades.
                </p>
              </div>
            </div>
          </div>
        )}
      </GlassCardContent>
    </GlassCard>
  )
}
