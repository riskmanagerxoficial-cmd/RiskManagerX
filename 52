import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
  warning: (title: string, message?: string) => void
  info: (title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000
    }

    setToasts(prev => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id)
    }, newToast.duration)
  }, [removeToast])

  const success = useCallback((title: string, message?: string) => {
    showToast({ type: 'success', title, message })
  }, [showToast])

  const error = useCallback((title: string, message?: string) => {
    showToast({ type: 'error', title, message, duration: 8000 })
  }, [showToast])

  const warning = useCallback((title: string, message?: string) => {
    showToast({ type: 'warning', title, message, duration: 6000 })
  }, [showToast])

  const info = useCallback((title: string, message?: string) => {
    showToast({ type: 'info', title, message })
  }, [showToast])

  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getToastColors = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-500/30 bg-green-500/10'
      case 'error':
        return 'border-red-500/30 bg-red-500/10'
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-500/10'
      case 'info':
        return 'border-blue-500/30 bg-blue-500/10'
    }
  }

  const value = {
    showToast,
    success,
    error,
    warning,
    info
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.3 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
              className={`
                ${getToastColors(toast.type)}
                border rounded-xl p-4 backdrop-blur-sm pointer-events-auto
                shadow-lg max-w-sm w-full
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getToastIcon(toast.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-dark-text">
                    {toast.title}
                  </h4>
                  {toast.message && (
                    <p className="mt-1 text-sm text-dark-muted">
                      {toast.message}
                    </p>
                  )}
                  {toast.action && (
                    <button
                      onClick={toast.action.onClick}
                      className="mt-2 text-sm font-medium text-neon-cyan hover:text-neon-blue transition-colors"
                    >
                      {toast.action.label}
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 text-dark-muted hover:text-dark-text transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
