import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Crown, Rocket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'

const plans = [
  {
    name: 'Free',
    price: 'Grátis',
    period: 'Para sempre',
    description: 'Perfeito para começar',
    icon: Zap,
    color: 'neon-cyan',
    popular: false,
    features: [
      '1 ativo (XAU/USD)',
      'Cálculos básicos de margem',
      'Simulação simples de cenários',
      'Dashboard responsivo',
      'Suporte por e-mail'
    ]
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/mês',
    description: 'Para traders sérios',
    icon: Crown,
    color: 'neon-blue',
    popular: true,
    features: [
      'Todos os ativos (Forex, CFDs, Índices)',
      'Simulações avançadas e cenários múltiplos',
      'Histórico e relatórios exportáveis',
      'Alertas personalizados de risco',
      'Calculadora de lote ideal',
      'Suporte prioritário'
    ]
  },
  {
    name: 'Premium',
    price: '$49',
    period: '/mês',
    description: 'Para traders profissionais',
    icon: Rocket,
    color: 'neon-purple',
    popular: false,
    features: [
      'Tudo do plano Pro',
      'Integração com corretoras (MT5, cTrader)',
      'Monitoramento em tempo real',
      'API personalizada',
      'Análise de risco com IA',
      'Suporte 24/7 dedicado'
    ]
  }
]

export const PricingSection: React.FC = () => {
  const navigate = useNavigate()

  return (
    <section id="pricing" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card/10 to-dark-bg"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-dark-text">Escolha seu </span>
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              plano ideal
            </span>
          </h2>
          <p className="text-xl text-dark-muted max-w-3xl mx-auto">
            Comece gratuitamente e evolua conforme suas necessidades de trading.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'transform md:scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </div>
              )}

              <div className={`bg-dark-card rounded-2xl p-8 border transition-all duration-300 h-full ${
                plan.popular 
                  ? 'border-neon-blue/50 shadow-glow-blue' 
                  : 'border-dark-border hover:border-neon-cyan/30'
              }`}>
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-${plan.color}/20 to-transparent border border-${plan.color}/30 mb-4`}>
                    <plan.icon className={`w-8 h-8 text-${plan.color}`} />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-dark-text mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-dark-muted mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-dark-text">
                      {plan.price}
                    </span>
                    <span className="text-dark-muted">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className={`w-5 h-5 text-${plan.color} flex-shrink-0`} />
                      <span className="text-dark-muted">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => navigate('/auth')}
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.name === 'Free' ? 'Começar Grátis' : 'Escolher Plano'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full">
            <span className="text-green-400 mr-2">✅</span>
            <span className="text-dark-text">
              Garantia de 30 dias - cancele quando quiser, sem compromisso
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
