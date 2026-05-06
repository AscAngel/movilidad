import { clsx } from 'clsx'

const lineColors = {
  L1: 'bg-line-l1 text-black',
  L2: 'bg-line-l2 text-white',
  L3: 'bg-line-l3 text-black',
  L4: 'bg-line-l4 text-white',
  L6: 'bg-line-l6 text-black',
  L7: 'bg-line-l7 text-white',
}

export function Badge({ 
  children, 
  className = '', 
  variant = 'default',
  line,
  ...props 
}) {
  const variants = {
    default: 'bg-surface-elevated text-foreground-muted',
    primary: 'bg-primary-muted text-primary',
    accent: 'bg-accent-muted text-accent',
    warning: 'bg-warning-muted text-warning',
    error: 'bg-error-muted text-error',
    success: 'bg-primary-muted text-primary',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center px-2.5 py-1 text-xs font-semibold rounded-md',
        line ? lineColors[line] || variants.default : variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function LineBadge({ line, className = '' }) {
  return (
    <Badge line={line} className={className}>
      {line}
    </Badge>
  )
}
