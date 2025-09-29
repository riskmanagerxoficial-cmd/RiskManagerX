import React from 'react'
import { motion } from 'framer-motion'
import { Play, TrendingUp, Shield, Calculator } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'

export const HeroSection: React.FC = () => {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-dark-bg to-neon-purple/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
            >
              <span className="text-dark-text">Controle o </span>
              <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
                risco.
              </span>
              <br />
              <span className="text-dark-text">Proteja seu </span>
              <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent">
                capital.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-dark-muted mb-8 max-w-2xl"
            >
              O futuro da gestão de risco em <span className="text-neon-cyan font-semibold">XAU/USD, Forex e CFDs</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button
                onClick={() => navigate('/auth')}
                size="lg"
                className="text-lg px-8 py-4"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Experimente Gratuitamente
              </Button>
              <Button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4"
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Demonstração
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-dark-muted"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Gratuito para começar</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                <span>Sem cartão de crédito</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-dark-card rounded-2xl border border-dark-border p-6 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 rounded-2xl blur-xl"></div>
              
              <div className="relative z-10">
                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-xs text-dark-muted">RiskManagerX Dashboard</div>
                </div>

                {/* Mock Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-dark-bg/50 rounded-xl p-4 border border-neon-cyan/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-dark-muted">Saldo da Conta</p>
                        <p className="text-lg font-bold text-neon-cyan font-mono">$1,000.00</p>
                      </div>
                      <Shield className="w-5 h-5 text-neon-cyan" />
                    </div>
                  </div>
                  <div className="bg-dark-bg/50 rounded-xl p-4 border border-neon-blue/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-dark-muted">Risco Atual</p>
                        <p className="text-lg font-bold text-green-400 font-mono">1.5%</p>
                      </div>
                      <Calculator className="w-5 h-5 text-neon-blue" />
                    </div>
                  </div>
                </div>

                {/* Mock Chart */}
                <div className="bg-dark-bg/50 rounded-xl p-4 border border-neon-purple/30">
                  <p className="text-xs text-dark-muted mb-3">Análise de Risco - XAU/USD</p>
                  <div className="h-20 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-lg flex items-end justify-center space-x-1">
                    {[40, 60, 30, 80, 50, 70, 90].map((height, i) => (
                      <div
                        key={i}
                        className="w-3 bg-gradient-to-t from-neon-cyan to-neon-blue rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-green-500/20 border border-green-500/50 rounded-full px-3 py-1 text-xs text-green-400"
            >
              ✓ Zona Segura
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-neon-cyan/20 border border-neon-cyan/50 rounded-full px-3 py-1 text-xs text-neon-cyan"
            >
              Margem: $20.50
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
