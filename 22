import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { useNavigateAndScroll } from '../../hooks/useNavigateAndScroll'

export const LandingHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigateAndScroll = useNavigateAndScroll()

  const handleNavigation = (path: string) => {
    navigateAndScroll(path);
    setMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-dark-bg/80 backdrop-blur-sm border-b border-dark-border z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/#benefits')}
              className="text-dark-muted hover:text-neon-cyan transition-colors"
            >
              Benefícios
            </button>
            <button
              onClick={() => handleNavigation('/#how-it-works')}
              className="text-dark-muted hover:text-neon-cyan transition-colors"
            >
              Como Funciona
            </button>
            <button
              onClick={() => handleNavigation('/#pricing')}
              className="text-dark-muted hover:text-neon-cyan transition-colors"
            >
              Preços
            </button>
            <button
              onClick={() => handleNavigation('/#testimonials')}
              className="text-dark-muted hover:text-neon-cyan transition-colors"
            >
              Depoimentos
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => handleNavigation('/auth')}
              variant="outline"
              size="sm"
            >
              Entrar
            </Button>
            <Button
              onClick={() => handleNavigation('/auth')}
              variant="primary"
              size="sm"
            >
              Experimente Grátis
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-dark-text"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            <button
              onClick={() => handleNavigation('/#benefits')}
              className="block text-dark-muted hover:text-neon-cyan transition-colors"
            >
              Benefícios
            </button>
            <button
              onClick={() => handleNavigation('/#how-it-works')}
              className="block text-dark-muted hover:text-neon-cyan transition-colors"
            >
              Como Funciona
            </button>
            <button
              onClick={() => handleNavigation('/#pricing')}
              className="block text-dark-muted hover:text-neon-cyan transition-colors"
            >
              Preços
            </button>
            <button
              onClick={() => handleNavigation('/#testimonials')}
              className="block text-dark-muted hover:text-neon-cyan transition-colors"
            >
              Depoimentos
            </button>
            <div className="pt-4 space-y-2">
              <Button
                onClick={() => handleNavigation('/auth')}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Entrar
              </Button>
              <Button
                onClick={() => handleNavigation('/auth')}
                variant="primary"
                size="sm"
                className="w-full"
              >
                Experimente Grátis
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
