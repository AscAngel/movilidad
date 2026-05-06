import { clsx } from 'clsx'
import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

export const Button = forwardRef(({ 
  children,
  className = '', 
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  ...props 
}, ref) => {
  const variants = {
    primary: 'glass-button',
    secondary: 'glass-button glass-button-secondary',
    ghost: 'bg-transparent text-foreground hover:bg-surface-glass border border-transparent hover:border-border px-4 py-2 rounded-md transition-all',
    danger: 'bg-error text-white hover:bg-red-600 px-4 py-2 rounded-md transition-all',
  }

  const sizes = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  }

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={clsx(
        variants[variant],
        sizes[size],
        'font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-all',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </button>
  )
})

Button.displayName = 'Button'
