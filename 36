import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-dark-text">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2.5 bg-dark-card border border-dark-border rounded-xl
            text-dark-text placeholder-dark-muted
            focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan
            transition-colors duration-200 relative
            ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
