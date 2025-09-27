import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, MessageCircle, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { useNavigateAndScroll } from '../../hooks/useNavigateAndScroll'

const footerLinks = {
  produto: [
    { name: 'Funcionalidades', href: '/#benefits' },
    { name: 'Como Funciona', href: '/#how-it-works' },
    { name: 'Preços', href: '/#pricing' },
    { name: 'API', href: '/api-docs' }
  ],
  empresa: [
    { name: 'Sobre', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Carreiras', href: '/careers' },
    { name: 'Contato', href: '/contact' }
  ],
  suporte: [
    { name: 'Central de Ajuda', href: '/help' },
    { name: 'Documentação', href: '/docs' },
    { name: 'Status do Sistema', href: '/status' },
    { name: 'Comunidade', href: '/community' }
  ],
  legal: [
    { name: 'Termos de Uso', href: '/terms-of-service' },
    { name: 'Política de Privacidade', href: '/privacy-policy' },
    { name: 'Aviso Legal', href: '/disclaimer' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'LGPD', href: '/lgpd' }
  ]
}

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'Telegram', icon: MessageCircle, href: '#' }
]

export const Footer: React.FC = () => {
  const navigateAndScroll = useNavigateAndScroll();

  return (
    <footer className="bg-dark-card border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <Logo />
              
              <p className="text-dark-muted text-sm max-w-sm">
                O futuro da gestão de risco em trading. Proteja seu capital com as ferramentas mais avançadas do mercado.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-dark-bg rounded-lg flex items-center justify-center text-dark-muted hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-200"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-dark-text font-semibold mb-4 capitalize">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('/#') ? (
                      <button
                        onClick={() => navigateAndScroll(link.href)}
                        className="text-dark-muted hover:text-neon-cyan transition-colors text-sm text-left"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-dark-muted hover:text-neon-cyan transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-dark-border pt-8 mt-12"
        >
          <div className="bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 rounded-2xl p-6 border border-neon-cyan/20">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-neon-cyan" />
                <div>
                  <h4 className="text-dark-text font-semibold">
                    Newsletter de Trading
                  </h4>
                  <p className="text-dark-muted text-sm">
                    Dicas semanais sobre gestão de risco e mercados
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 md:w-64 px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-semibold rounded-lg hover:shadow-glow-cyan transition-all duration-200">
                  Assinar
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="border-t border-dark-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-dark-muted text-sm">
              © 2025 RiskManagerX – Informações apenas para fins informativos.{' '}
              <Link to="/disclaimer" className="underline hover:text-neon-cyan transition-colors">
                Aviso Legal
              </Link>
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-dark-muted">
              <span>Feito com ❤️ para traders</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Sistema Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
