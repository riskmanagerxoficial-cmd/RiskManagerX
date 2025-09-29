import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, CheckCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { getAuthErrorMessage } from '../../utils/auth-errors'
import { Logo } from '../ui/Logo'

export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showEmailSent, setShowEmailSent] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  })

  const navigate = useNavigate()
  const { signIn, signUp, resendConfirmation } = useAuth()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setShowEmailSent(false)

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password)
        toast.success('Login realizado com sucesso! 🎉')
        navigate('/dashboard')
      } else {
        await signUp(formData.email, formData.password, formData.fullName)
        setShowEmailSent(true)
        toast.success('Conta criada! Verifique seu e-mail para confirmar. 📧')
      }
    } catch (error: any) {
      console.log('Erro de autenticação:', error)
      const authError = getAuthErrorMessage(error)
      
      if (error?.code === 'email_not_confirmed') {
        toast.showToast({
          type: 'warning',
          title: authError.message,
          duration: 8000,
          action: {
            label: 'Reenviar e-mail',
            onClick: () => handleResendEmail()
          }
        })
      } else {
        toast.error(authError.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    if (!formData.email) {
      toast.error('Digite seu e-mail para reenviar a confirmação')
      return
    }

    try {
      await resendConfirmation(formData.email)
      toast.success('E-mail de confirmação reenviado! 📧')
    } catch (error: any) {
      const authError = getAuthErrorMessage(error)
      toast.error(authError.message)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setShowEmailSent(false)
    setFormData({ email: '', password: '', fullName: '' })
    setAgreedToTerms(false)
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-8"
        >
          <Logo className="h-12 mx-auto mb-4" />
          <p className="text-dark-muted mt-2">
            Gestão de Risco Inteligente para Traders
          </p>
        </motion.div>

        {/* Email Sent Success Message */}
        {showEmailSent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="text-green-400 font-medium">E-mail enviado!</h3>
                <p className="text-green-300/80 text-sm mt-1">
                  Verifique sua caixa de entrada e clique no link para confirmar sua conta.
                </p>
              </div>
            </div>
            <Button
              onClick={handleResendEmail}
              variant="ghost"
              size="sm"
              className="mt-3 text-green-400 hover:text-green-300"
            >
              Não recebeu? Reenviar e-mail
            </Button>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-card rounded-2xl p-8 border border-dark-border shadow-xl"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-dark-text">
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </h2>
            <p className="text-dark-muted mt-1">
              {isLogin ? 'Acesse sua conta' : 'Comece a gerenciar seus riscos'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-muted z-10" />
                <Input
                  type="text"
                  placeholder="Nome completo"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-muted z-10" />
              <Input
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-muted z-10" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="pl-10 pr-10"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-muted hover:text-dark-text z-10"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative flex items-start space-x-3 pt-2">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms-description"
                    name="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="h-4 w-4 text-neon-cyan bg-dark-card border-dark-border rounded focus:ring-neon-cyan"
                  />
                </div>
                <div className="text-sm">
                  <label htmlFor="terms" className="text-dark-muted">
                    Li e concordo com os{' '}
                    <Link to="/terms-of-service" target="_blank" rel="noopener noreferrer" className="font-medium text-neon-cyan hover:underline">
                      Termos
                    </Link>{' '}
                    e o{' '}
                    <Link to="/disclaimer" target="_blank" rel="noopener noreferrer" className="font-medium text-neon-cyan hover:underline">
                      Aviso Legal
                    </Link>
                    .
                  </label>
                </div>
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
              disabled={loading || (!isLogin && !agreedToTerms)}
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-dark-muted">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button
                onClick={toggleMode}
                className="ml-2 text-neon-cyan hover:text-neon-blue transition-colors"
              >
                {isLogin ? 'Criar conta' : 'Entrar'}
              </button>
            </p>
          </div>

          {/* Additional Help for Login */}
          {isLogin && (
            <div className="mt-4 text-center">
              <button
                onClick={handleResendEmail}
                className="text-sm text-dark-muted hover:text-neon-cyan transition-colors"
              >
                Reenviar e-mail de confirmação
              </button>
            </div>
          )}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-1 gap-4"
        >
          <div className="bg-dark-card/50 rounded-xl p-4 border border-dark-border">
            <h3 className="text-sm font-medium text-dark-text">🚀 Plano Gratuito</h3>
            <p className="text-xs text-dark-muted mt-1">Cálculos básicos + 1 ativo</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
