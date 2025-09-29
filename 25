import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Carlos Silva',
    role: 'Trader Profissional',
    avatar: '👨‍💼',
    content: 'Finalmente entendi como a margem funciona de verdade. O RiskManagerX me salvou de vários stop-outs que eu nem sabia que estavam chegando.',
    rating: 5,
    highlight: 'Salvou da liquidação'
  },
  {
    name: 'Marina Santos',
    role: 'Day Trader',
    avatar: '👩‍🚀',
    content: 'A interface é simplesmente incrível! Futurista, rápida e muito intuitiva. Agora calculo meu risco em segundos antes de cada operação.',
    rating: 5,
    highlight: 'Interface futurista'
  },
  {
    name: 'Rafael Costa',
    role: 'Swing Trader',
    avatar: '🧑‍💻',
    content: 'Comecei com a versão gratuita e em uma semana já tinha migrado para o Pro. A diferença na minha gestão de risco foi absurda.',
    rating: 5,
    highlight: 'Mudança radical'
  },
  {
    name: 'Ana Ferreira',
    role: 'Trader Iniciante',
    avatar: '👩‍🎓',
    content: 'Como iniciante, o RiskManagerX me ensinou mais sobre gestão de risco do que meses de cursos. Recomendo para qualquer trader.',
    rating: 5,
    highlight: 'Educativo e prático'
  },
  {
    name: 'Paulo Mendes',
    role: 'Scalper',
    avatar: '👨‍🔬',
    content: 'A velocidade dos cálculos é impressionante. Perfeito para quem faz scalping e precisa de informações instantâneas sobre risco.',
    rating: 5,
    highlight: 'Velocidade incrível'
  },
  {
    name: 'Luciana Rocha',
    role: 'Trader de Forex',
    avatar: '👩‍🚀',
    content: 'Uso para XAU/USD e pares de Forex. A precisão dos cálculos e as simulações me deram muito mais confiança nas operações.',
    rating: 5,
    highlight: 'Confiança total'
  }
]

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-dark-bg via-dark-card/20 to-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-dark-text">O que dizem nossos </span>
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              traders
            </span>
          </h2>
          <p className="text-xl text-dark-muted max-w-3xl mx-auto">
            Milhares de traders já protegem seu capital com o RiskManagerX.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-neon-cyan/30 transition-all duration-300 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-neon-cyan/20 group-hover:text-neon-cyan/40 transition-colors">
                <Quote className="w-8 h-8" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-dark-muted mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-text">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-dark-muted">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full text-xs text-neon-cyan">
                  {testimonial.highlight}
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-cyan mb-2">10,000+</div>
            <div className="text-dark-muted">Traders Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-blue mb-2">4.9/5</div>
            <div className="text-dark-muted">Avaliação Média</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-neon-purple mb-2">95%</div>
            <div className="text-dark-muted">Satisfação</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
