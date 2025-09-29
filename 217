import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg hover:shadow-glow-cyan border border-neon-cyan/50',
    secondary: 'bg-dark-card text-dark-text border border-dark-border hover:border-neon-cyan/50 hover:shadow-glow-cyan',
    outline: 'border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-bg',
    ghost: 'text-dark-text hover:bg-dark-card hover:text-neon-cyan'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </motion.button>
  )
}
