export interface AuthError {
  message: string
  type: 'error' | 'warning' | 'info'
  actionText?: string
  actionCallback?: () => void
}

export const getAuthErrorMessage = (error: any): AuthError => {
  const errorCode = error?.code || error?.message || 'unknown_error'

  switch (errorCode) {
    case 'email_not_confirmed':
      return {
        message: 'Você precisa confirmar seu e-mail antes de fazer login. Verifique sua caixa de entrada.',
        type: 'warning',
        actionText: 'Reenviar e-mail',
      }
    
    case 'invalid_credentials':
      return {
        message: 'E-mail ou senha incorretos. Verifique suas credenciais.',
        type: 'error',
      }
    
    case 'user_not_found':
      return {
        message: 'Usuário não encontrado. Verifique o e-mail digitado.',
        type: 'error',
      }
    
    case 'weak_password':
      return {
        message: 'A senha deve ter pelo menos 6 caracteres.',
        type: 'error',
      }
    
    case 'email_address_invalid':
      return {
        message: 'E-mail inválido. Verifique o formato do e-mail.',
        type: 'error',
      }
    
    case 'signup_disabled':
      return {
        message: 'Cadastro temporariamente desabilitado.',
        type: 'error',
      }
    
    case 'email_address_already_exists':
      return {
        message: 'Este e-mail já está cadastrado. Tente fazer login.',
        type: 'warning',
      }
    
    case 'over_email_send_rate_limit':
      return {
        message: 'Muitos e-mails enviados. Aguarde alguns minutos antes de tentar novamente.',
        type: 'warning',
      }

    default:
      return {
        message: error?.message || 'Erro inesperado. Tente novamente.',
        type: 'error',
      }
  }
}
