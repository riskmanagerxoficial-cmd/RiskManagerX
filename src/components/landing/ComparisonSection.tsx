import React from 'react'
import { motion } from 'framer-motion'
import { X, CheckCircle, AlertTriangle, TrendingDown } from 'lucide-react'

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-dark-bg via-dark-card/20 to-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-dark-text">Sem RiskManagerX vs </span>
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Com RiskManagerX
            </span>
          </h2>
          <p className="text-xl text-dark-muted max-w-3xl mx-auto">
            Veja a diferença entre operar no escuro e ter controle total sobre seu risco.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sem RiskManagerX */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mr-4">
                <X className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold text-red-400">Trader Tradicional</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-dark-muted">
                  <span className="text-red-400 font-semibold">Cálculo manual</span> de margem propenso a erros
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-dark-muted">
                  <span className="text-red-400 font-semibold">Não sabe</span> até onde o preço pode ir contra
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-dark-muted">
                  <span className="text-red-400 font-semibold">Stop-out inesperado</span> por falta de planejamento
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-dark-muted">
                  <span className="text-red-400 font-semibold">Tamanho de posição</span> inadequado para o risco
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-dark-muted">
                  <span className="text-red-400 font-semibold">Decisões emocionais</span> sem base matemática
                </p>
              </div>
            </div>

            {/* Mock Loss Chart */}
            <div className="mt-8 bg-red-500/10 rounded-xl p-4 border border-red-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-red-400">Performance da Conta</span>
                <TrendingDown className="w-4 h-4 text-red-400" />
              </div>
              <div className="h-16 flex items-end justify-center space-x-1">
                {[100, 85, 70, 45, 30, 15, 5].map((height, i) => (
                  <div
                    key={i}
                    className="w-4 bg-gradient-to-t from-red-500 to-red-400 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div className="text-center mt-2 text-red-400 font-mono text-sm">
                -95% em 6 meses
              </div>
            </div>
          </motion.div>

          {/* Com RiskManagerX */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/30 rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-neon-cyan/20 rounded-xl flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="text-2xl font-semibold text-neon-cyan">Com RiskManagerX</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-dark-muted">
                  <span className="text-green-400 font-semibold">Cálculos automáticos</span> precisos em tempo real
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-dark-muted">
                  <span className="text-green-400 font-semibold">Conhece exatamente</span> o ponto de stop-out
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-dark-muted">
                  <span className="text-green-400 font-semibold">Proteção ativa</span> contra liquidação forçada
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-dark-muted">
                  <span className="text-green-400 font-semibold">Lote ideal</span> baseado no percentual de risco
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-dark-muted">
                  <span className="text-green-400 font-semibold">Decisões racionais</span> baseadas em dados
                </p>
              </div>
            </div>

            {/* Mock Profit Chart */}
            <div className="mt-8 bg-neon-cyan/10 rounded-xl p-4 border border-neon-cyan/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-neon-cyan">Performance da Conta</span>
                <TrendingDown className="w-4 h-4 text-green-400 transform rotate-180" />
              </div>
              <div className="h-16 flex items-end justify-center space-x-1">
                {[20, 35, 45, 60, 70, 85, 95].map((height, i) => (
                  <div
                    key={i}
                    className="w-4 bg-gradient-to-t from-neon-cyan to-green-400 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div className="text-center mt-2 text-green-400 font-mono text-sm">
                +75% em 6 meses
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/30 rounded-full">
            <span className="text-neon-cyan mr-2">💡</span>
            <span className="text-dark-text font-medium">
              A diferença está no controle: pare de apostar, comece a calcular!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
