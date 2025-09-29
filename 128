import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: 'cyan' | 'blue' | 'purple' | 'none'
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  glow = 'none'
}) => {
  const glowClasses = {
    cyan: 'border-neon-cyan/30 hover:border-neon-cyan/60 hover:shadow-glow-cyan',
    blue: 'border-neon-blue/30 hover:border-neon-blue/60 hover:shadow-glow-blue',
    purple: 'border-neon-purple/30 hover:border-neon-purple/60 hover:shadow-glow-purple',
    none: 'border-dark-border hover:border-neon-cyan/30'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -2 } : {}}
      className={`
        bg-dark-card rounded-2xl border backdrop-blur-sm p-6
        transition-all duration-300
        ${glowClasses[glow]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
