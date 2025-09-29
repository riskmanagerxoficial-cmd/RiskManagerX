/*
          # Create Trades Table
          This migration creates the `trades` table to store user trading operations.

          ## Query Description: 
          This operation is structural and safe. It adds a new table `trades` to the database schema, designed to store individual trading records for users. It also enables Row Level Security (RLS) to ensure that users can only access their own data, enhancing privacy and security. No existing data will be affected.
          
          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Low"
          - Requires-Backup: false
          - Reversible: true (by dropping the table and policies)
          
          ## Structure Details:
          - Table: `public.trades`
          - Columns: `id`, `user_id`, `created_at`, `trade_date`, `asset`, `direction`, `lot_size`, `entry_price`, `stop_loss`, `take_profit`, `result_usd`, `notes`
          - Indexes: `trades_pkey`, `trades_user_id_idx`
          
          ## Security Implications:
          - RLS Status: Enabled
          - Policy Changes: Yes (4 new policies for SELECT, INSERT, UPDATE, DELETE)
          - Auth Requirements: User must be authenticated to interact with their own data.
          
          ## Performance Impact:
          - Indexes: Adds a primary key index and an index on `user_id` for efficient querying of user-specific trades.
          - Triggers: None
          - Estimated Impact: Low. The impact is limited to the new table and will improve query performance for trade-related lookups.
          */

-- Create a custom type for trade direction
CREATE TYPE trade_direction AS ENUM ('buy', 'sell');

-- Create the trades table
CREATE TABLE public.trades (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    trade_date timestamp with time zone NOT NULL DEFAULT now(),
    asset text NOT NULL,
    direction trade_direction NOT NULL,
    lot_size numeric NOT NULL,
    entry_price numeric NOT NULL,
    stop_loss numeric,
    take_profit numeric,
    result_usd numeric NOT NULL,
    notes text,
    CONSTRAINT trades_pkey PRIMARY KEY (id),
    CONSTRAINT trades_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.trades IS 'Stores individual trading operations for each user.';
COMMENT ON COLUMN public.trades.asset IS 'The trading instrument, e.g., XAU/USD.';
COMMENT ON COLUMN public.trades.direction IS 'The direction of the trade: buy or sell.';
COMMENT ON COLUMN public.trades.result_usd IS 'The financial result of the trade in USD.';
COMMENT ON COLUMN public.trades.notes IS 'User-provided notes or comments about the trade.';

-- Create an index on user_id for faster lookups
CREATE INDEX trades_user_id_idx ON public.trades USING btree (user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own trades."
ON public.trades
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trades."
ON public.trades
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trades."
ON public.trades
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trades."
ON public.trades
FOR DELETE USING (auth.uid() = user_id);
