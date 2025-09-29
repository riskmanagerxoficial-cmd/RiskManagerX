import React from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, Shield, Zap, Target, Brain } from 'lucide-react'

const benefits = [
  {
    icon: Calculator,
    title: 'Cálculo Instantâneo',
    description: 'Margem, alavancagem e valor do contrato calculados em tempo real para qualquer ativo.',
    color: 'neon-cyan'
  },
  {
    icon: TrendingUp,
    title: 'Simulação de Cenários',
    description: 'Teste diferentes movimentos de preço antes de abrir posições e veja o impacto no seu saldo.',
    color: 'neon-blue'
  },
  {
    icon: Target,
    title: 'Lote Ideal Recomendado',
    description: 'Defina seu percentual de risco e receba automaticamente o tamanho ideal de posição.',
    color: 'neon-purple'
  },
  {
    icon: Shield,
    title: 'Proteção Anti Stop-Out',
    description: 'Saiba exatamente até onde o preço pode ir contra você antes da liquidação forçada.',
    color: 'neon-cyan'
  },
  {
    icon: Zap,
    title: 'Interface Futurista',
    description: 'Dashboard intuitivo com design neon, responsivo e otimizado para decisões rápidas.',
    color: 'neon-blue'
  },
  {
    icon: Brain,
    title: 'Gestão Inteligente',
    description: 'Alertas visuais de risco e recomendações baseadas em boas práticas de trading.',
    color: 'neon-purple'
  }
]

export const BenefitsSection: React.FC = () => {
  return (
    <section id="benefits" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card/30 to-dark-bg"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-dark-text">Por que escolher o </span>
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              RiskManagerX?
            </span>
          </h2>
          <p className="text-xl text-dark-muted max-w-3xl mx-auto">
            Transforme sua forma de fazer trading com ferramentas inteligentes 
            que protegem seu capital e maximizam suas oportunidades.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-dark-card rounded-2xl p-8 border border-dark-border hover:border-neon-cyan/50 transition-all duration-300 h-full">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-${benefit.color}/20 to-transparent border border-${benefit.color}/30 mb-6 group-hover:shadow-glow-${benefit.color.split('-')[1]} transition-all duration-300`}>
                  <benefit.icon className={`w-8 h-8 text-${benefit.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-dark-text mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-dark-muted leading-relaxed">
                  {benefit.description}
                </p>

                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${benefit.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-cyan mb-2">99.9%</div>
            <div className="text-dark-muted">Precisão nos Cálculos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-blue mb-2">&lt;1s</div>
            <div className="text-dark-muted">Tempo de Resposta</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-purple mb-2">24/7</div>
            <div className="text-dark-muted">Disponibilidade</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
