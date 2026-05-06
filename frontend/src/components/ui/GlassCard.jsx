import { clsx } from 'clsx'

export function GlassCard({ 
  children, 
  className = '', 
  elevated = false,
  hover = false,
  padding = 'p-6',
  ...props 
}) {
  return (
    <div
      className={clsx(
        elevated ? 'glass-card-elevated' : 'glass-card',
        padding,
        hover && 'transition-all duration-300 hover:border-border-light hover:shadow-lg hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function GlassCardHeader({ children, className = '' }) {
  return (
    <div className={clsx('flex items-center justify-between mb-4', className)}>
      {children}
    </div>
  )
}

export function GlassCardTitle({ children, className = '', icon: Icon }) {
  return (
    <h3 className={clsx('text-lg font-semibold text-foreground flex items-center gap-2', className)}>
      {Icon && <Icon className="w-5 h-5 text-primary" />}
      {children}
    </h3>
  )
}

export function GlassCardDescription({ children, className = '' }) {
  return (
    <p className={clsx('text-sm text-foreground-muted', className)}>
      {children}
    </p>
  )
}

export function GlassCardContent({ children, className = '' }) {
  return (
    <div className={clsx(className)}>
      {children}
    </div>
  )
}
