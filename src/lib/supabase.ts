import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Verificação robusta para garantir que as variáveis de ambiente são válidas
if (
  !supabaseUrl || !supabaseUrl.startsWith('http') ||
  !supabaseAnonKey
) {
  console.error('As credenciais do Supabase estão ausentes ou são inválidas. Verifique seu arquivo .env e certifique-se de que VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão definidos corretamente.')
  throw new Error('Configuração do Supabase incompleta. Verifique o console para mais detalhes.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          initial_balance: number
          current_balance: number
          broker_name: string | null
          stop_out_level: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          initial_balance?: number
          current_balance?: number
          broker_name?: string | null
          stop_out_level?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          initial_balance?: number
          current_balance?: number
          broker_name?: string | null
          stop_out_level?: number
          created_at?: string
          updated_at?: string
        }
      }
      simulations: {
        Row: {
          id: string
          user_id: string
          asset: string
          current_price: number
          lot_size: number
          leverage: number
          account_balance: number
          margin_required: number
          contract_value: number
          pip_value: number
          max_movement: number
          risk_percentage: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          asset: string
          current_price: number
          lot_size: number
          leverage: number
          account_balance: number
          margin_required: number
          contract_value: number
          pip_value: number
          max_movement: number
          risk_percentage: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          asset?: string
          current_price?: number
          lot_size?: number
          leverage?: number
          account_balance?: number
          margin_required?: number
          contract_value?: number
          pip_value?: number
          max_movement?: number
          risk_percentage?: number
          created_at?: string
        }
      }
    }
  }
}
