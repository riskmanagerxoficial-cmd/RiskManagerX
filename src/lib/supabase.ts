import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('As variáveis de ambiente do Supabase (VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY) não foram encontradas. Verifique seu arquivo .env.')
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
