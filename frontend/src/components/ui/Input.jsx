import { clsx } from 'clsx'
import { forwardRef } from 'react'

export const Input = forwardRef(({ 
  className = '', 
  label,
  error,
  icon: Icon,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground-muted mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-subtle">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            'glass-input w-full',
            Icon && 'has-icon',
            error && 'border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
