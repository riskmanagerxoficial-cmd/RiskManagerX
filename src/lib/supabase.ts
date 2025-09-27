import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (
  !supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL' ||
  !supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY'
) {
  console.error('As credenciais do Supabase não estão configuradas. Por favor, adicione VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY ao seu arquivo .env.')
  // Lançamos um erro customizado mais amigável que não será mostrado em produção,
  // mas evita que a aplicação quebre por erro da biblioteca Supabase.
  // Em um ambiente de produção, você pode querer lidar com isso de forma diferente.
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
