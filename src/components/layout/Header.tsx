import React from 'react'
import { motion } from 'framer-motion'
import { User, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

export const Header: React.FC = () => {
  const { user, signOut } = useAuth()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-dark-card/80 backdrop-blur-sm border-b border-dark-border sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-dark-text">
              <User className="w-5 h-5" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <Button
              onClick={signOut}
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
