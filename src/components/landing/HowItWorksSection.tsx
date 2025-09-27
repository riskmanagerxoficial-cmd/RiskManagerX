import React from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Settings, Calculator, Shield } from 'lucide-react'

const steps = [
  {
    step: 1,
    icon: UserPlus,
    title: 'Cadastre-se',
    description: 'Crie sua conta gratuita em menos de 30 segundos. Sem cartão de crédito necessário.',
    color: 'neon-cyan'
  },
  {
    step: 2,
    icon: Settings,
    title: 'Configure sua Conta',
    description: 'Informe seu saldo, corretora, nível de stop-out e configure suas preferências de risco.',
    color: 'neon-blue'
  },
  {
    step: 3,
    icon: Calculator,
    title: 'Calcule e Simule',
    description: 'Insira o ativo, preço e alavancagem. Veja a margem exigida e simule diferentes cenários.',
    color: 'neon-purple'
  },
  {
    step: 4,
    icon: Shield,
    title: 'Opere com Segurança',
    description: 'Execute suas operações sabendo exatamente qual seu risco e até onde pode ir contra.',
    color: 'neon-cyan'
  }
]

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-dark-text">Como </span>
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              funciona?
            </span>
          </h2>
          <p className="text-xl text-dark-muted max-w-3xl mx-auto">
            Em apenas 4 passos simples, você terá controle total sobre seu risco no trading.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center group"
              >
                {/* Step Number */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-${step.color}/20 to-transparent border-2 border-${step.color}/50 mb-6 mx-auto relative z-10 group-hover:shadow-glow-${step.color.split('-')[1]} transition-all duration-300`}>
                  <span className={`text-2xl font-bold text-${step.color}`}>
                    {step.step}
                  </span>
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${step.color}/10 border border-${step.color}/30 mb-4 group-hover:bg-${step.color}/20 transition-all duration-300`}>
                  <step.icon className={`w-6 h-6 text-${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-dark-text mb-3">
                  {step.title}
                </h3>
                <p className="text-dark-muted leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 transform translate-x-full">
                    <div className="w-8 h-0.5 bg-neon-cyan/30"></div>
                    <div className={`absolute right-0 top-1/2 w-2 h-2 bg-${step.color} rounded-full transform translate-x-1 -translate-y-1/2`}></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-neon-cyan/10 via-neon-blue/10 to-neon-purple/10 rounded-2xl p-8 border border-neon-cyan/20">
            <h3 className="text-2xl font-semibold text-dark-text mb-4">
              Pronto para começar?
            </h3>
            <p className="text-dark-muted mb-6">
              Junte-se a milhares de traders que já protegem seu capital com o RiskManagerX.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300"
            >
              Começar Agora - É Grátis
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
