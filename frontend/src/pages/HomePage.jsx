import { SearchForm } from '../components/search/SearchForm'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { Train, Clock, ArrowRightLeft, Zap } from 'lucide-react'

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-muted border border-primary/20 mb-6">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Sistema Experto de Rutas</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
          Planifica tu viaje en la
          <span className="text-primary block mt-2">Zona Metropolitana de Guadalajara</span>
        </h1>
        
        <p className="text-lg text-foreground-muted max-w-2xl mx-auto mb-8">
          Encuentra la mejor ruta utilizando el sistema de transporte público. 
          Nuestro sistema experto analiza múltiples variables para recomendarte 
          la opción óptima.
        </p>

        {/* Lines Available */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <span className="text-sm text-foreground-muted mr-2">Líneas disponibles:</span>
          <Badge line="L1">L1</Badge>
          <Badge line="L2">L2</Badge>
          <Badge line="L3">L3</Badge>
          <Badge line="L4">L4</Badge>
          <Badge line="L6">L6</Badge>
          <Badge line="L7">L7</Badge>
        </div>
      </section>

      {/* Search Form */}
      <section>
        <SearchForm />
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        <GlassCard hover className="text-center">
          <div className="p-3 rounded-lg bg-primary-muted w-fit mx-auto mb-4">
            <Train className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Múltiples Líneas
          </h3>
          <p className="text-sm text-foreground-muted">
            Acceso a todas las líneas de Tren Ligero y Macrobús de la ZMG
          </p>
        </GlassCard>

        <GlassCard hover className="text-center">
          <div className="p-3 rounded-lg bg-accent-muted w-fit mx-auto mb-4">
            <Clock className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Tiempos Reales
          </h3>
          <p className="text-sm text-foreground-muted">
            Estimaciones precisas considerando horarios y frecuencias
          </p>
        </GlassCard>

        <GlassCard hover className="text-center">
          <div className="p-3 rounded-lg bg-warning-muted w-fit mx-auto mb-4">
            <ArrowRightLeft className="w-6 h-6 text-warning" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Menos Transbordos
          </h3>
          <p className="text-sm text-foreground-muted">
            Optimiza tu ruta para minimizar cambios de línea
          </p>
        </GlassCard>
      </section>
    </div>
  )
}
