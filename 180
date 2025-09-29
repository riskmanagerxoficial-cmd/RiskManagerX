import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Card } from '../ui/Card'

interface StatsCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
  glow?: 'cyan' | 'blue' | 'purple' | 'none'
  prefix?: string
  suffix?: string
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = 'neutral',
  glow = 'cyan',
  prefix = '',
  suffix = ''
}) => {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-dark-muted'
  }

  return (
    <Card glow={glow} className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-dark-muted">{title}</p>
          <div className="flex items-baseline space-x-1">
            {prefix && <span className="text-lg text-dark-muted">{prefix}</span>}
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-dark-text font-mono"
            >
              {value}
            </motion.p>
            {suffix && <span className="text-lg text-dark-muted">{suffix}</span>}
          </div>
          {subtitle && (
            <p className={`text-sm ${trendColors[trend]}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br from-${glow === 'cyan' ? 'neon-cyan' : glow === 'blue' ? 'neon-blue' : 'neon-purple'}/20 to-transparent`}>
          <Icon className={`w-6 h-6 text-${glow === 'cyan' ? 'neon-cyan' : glow === 'blue' ? 'neon-blue' : 'neon-purple'}`} />
        </div>
      </div>
    </Card>
  )
}
