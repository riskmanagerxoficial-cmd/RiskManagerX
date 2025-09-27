import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { Logo } from '../ui/Logo'

export const Header: React.FC = () => {
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getDisplayName = () => {
    if (!user) return '';
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    const emailName = user.email?.split('@')[0];
    if (emailName && emailName.length > 10) {
      return `${emailName.substring(0, 10)}...`;
    }
    return emailName || 'Usuário';
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-dark-card/80 backdrop-blur-sm border-b border-dark-border sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <Logo />

          {user && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 text-dark-text p-1.5 rounded-lg hover:bg-dark-border transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan/30 to-neon-blue/30 flex items-center justify-center">
                    <User className="w-5 h-5 text-neon-cyan" />
                </div>
                <span className="text-sm hidden sm:block font-medium">{getDisplayName()}</span>
                <ChevronDown 
                  className={`w-4 h-4 text-dark-muted transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute top-full right-0 mt-2 w-64 bg-dark-card border border-dark-border rounded-xl shadow-2xl shadow-black/20 z-10 p-2"
                  >
                    <div className="p-2">
                      <p className="text-sm font-semibold text-dark-text truncate">{user.user_metadata.full_name || 'Usuário'}</p>
                      <p className="text-xs text-dark-muted truncate">{user.email}</p>
                    </div>
                    <div className="w-full h-px bg-dark-border my-1"></div>
                    <button
                      onClick={signOut}
                      className="w-full flex items-center text-left p-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  )
}
