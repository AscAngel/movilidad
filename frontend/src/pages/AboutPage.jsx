import { Brain, Database, Cpu, Code, Users, Target } from 'lucide-react'
import { GlassCard, GlassCardTitle, GlassCardContent } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'

export function AboutPage() {
  const techStack = [
    { name: 'React', type: 'Frontend' },
    { name: 'Vite', type: 'Build' },
    { name: 'TailwindCSS', type: 'Styling' },
    { name: 'FastAPI', type: 'Backend' },
    { name: 'Python', type: 'Backend' },
    { name: 'Recharts', type: 'Charts' },
  ]

  const features = [
    {
      icon: Brain,
      title: 'Sistema Experto',
      description: 'Motor de inferencia basado en reglas que analiza múltiples variables para recomendar la mejor ruta.',
    },
    {
      icon: Database,
      title: 'Base de Conocimientos',
      description: 'Información completa de estaciones, líneas, conexiones y tiempos del sistema SITEUR.',
    },
    {
      icon: Cpu,
      title: 'Análisis Inteligente',
      description: 'Evaluación de alternativas considerando tiempo, transbordos, costo y preferencias del usuario.',
    },
    {
      icon: Target,
      title: 'Explicabilidad',
      description: 'Cada recomendación incluye una explicación detallada del proceso de decisión.',
    },
  ]

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Acerca del Proyecto
        </h1>
        <p className="text-lg text-foreground-muted max-w-3xl mx-auto">
          Sistema experto para la optimización de rutas en el transporte público 
          de la Zona Metropolitana de Guadalajara.
        </p>
      </section>

      {/* Objectives */}
      <section>
        <GlassCard elevated>
          <GlassCardTitle icon={Target}>
            Objetivo de InferRoute
          </GlassCardTitle>
          <GlassCardContent>
            <p className="text-foreground leading-relaxed">
              Desarrollar un sistema experto basado en una base de conocimientos y un motor 
              de inferencia que pueda analizar diversas variables del sistema de transporte 
              público de la Zona Metropolitana de Guadalajara para recomendar rutas óptimas, 
              reduciendo tiempo de traslado y cantidad de transbordos, proporcionando una 
              explicación del razonamiento utilizado en cada recomendación.
            </p>
          </GlassCardContent>
        </GlassCard>
      </section>

      {/* Specific Objectives */}
      {/* <section>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Objetivos Específicos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard hover>
            <div className="text-3xl font-bold text-primary mb-3">01</div>
            <h3 className="font-semibold text-foreground mb-2">Base de Conocimientos</h3>
            <p className="text-sm text-foreground-muted">
              Diseñar la base de conocimientos y las reglas de inferencia que representen 
              las rutas, conexiones, tiempos de espera y horarios pico del sistema.
            </p>
          </GlassCard>
          <GlassCard hover>
            <div className="text-3xl font-bold text-accent mb-3">02</div>
            <h3 className="font-semibold text-foreground mb-2">Motor de Inferencia</h3>
            <p className="text-sm text-foreground-muted">
              Desarrollar el motor de inferencia capaz de evaluar alternativas de traslado 
              mediante las reglas definidas, generando recomendaciones justificadas.
            </p>
          </GlassCard>
          <GlassCard hover>
            <div className="text-3xl font-bold text-warning mb-3">03</div>
            <h3 className="font-semibold text-foreground mb-2">Interfaz de Usuario</h3>
            <p className="text-sm text-foreground-muted">
              Implementar una interfaz que permita ingresar origen y destino, mostrando 
              la ruta recomendada junto con la explicación del proceso de decisión.
            </p>
          </GlassCard>
        </div>
      </section> */}

      {/* Features */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Características del Sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <GlassCard key={index} hover className="flex gap-4">
              <div className="p-3 rounded-lg bg-primary-muted h-fit">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-foreground-muted">{feature.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      
      {/* Lines Info */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Líneas del Sistema SITEUR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LineInfoCard line="L1" name="Línea 1" type="Tren Ligero" color="bg-line-l1" />
          <LineInfoCard line="L2" name="Línea 2" type="Tren Ligero" color="bg-line-l2" />
          <LineInfoCard line="L3" name="Línea 3" type="Tren Ligero" color="bg-line-l3" />
          <LineInfoCard line="L4" name="Línea 4" type="Tren Ligero" color="bg-line-l4" />
          <LineInfoCard line="L6" name="Macro Calzada" type="Macrobús" color="bg-line-l6" />
          <LineInfoCard line="L7" name="Macro Periférico" type="Macrobús" color="bg-line-l7" />
        </div>
      </section>
    </div>
  )
}

function LineInfoCard({ line, name, type, color }) {
  return (
    <GlassCard hover className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
        <span className="text-lg font-bold text-white">{line}</span>
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-foreground-muted">{type}</p>
      </div>
    </GlassCard>
  )
}
