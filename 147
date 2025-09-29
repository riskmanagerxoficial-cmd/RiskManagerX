/*
# Criação da Tabela de Simulações de Risco

Este script cria a tabela `public.simulations` para armazenar o histórico das simulações de risco realizadas pelos usuários. Também habilita a Segurança em Nível de Linha (RLS) e define políticas para garantir que cada usuário só possa acessar seus próprios dados.

## Query Description: 
Esta operação é estrutural e segura. Ela adiciona uma nova tabela ao banco de dados sem afetar dados existentes. A segurança dos dados é garantida pela ativação imediata do RLS, que isola os dados de cada usuário.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (pode ser revertida com `DROP TABLE public.simulations;`)

## Structure Details:
- Tabela criada: `public.simulations`
- Colunas: `id`, `user_id`, `asset`, `current_price`, `lot_size`, `leverage`, `account_balance`, `margin_required`, `contract_value`, `pip_value`, `max_movement`, `risk_percentage`, `created_at`.
- Relacionamentos: `user_id` tem uma chave estrangeira para `auth.users(id)`.

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes. Duas políticas são criadas:
  1. `Allow individual read access`: Permite que usuários leiam apenas suas próprias simulações.
  2. `Allow individual insert access`: Permite que usuários insiram simulações apenas para si mesmos.
- Auth Requirements: Requer que o usuário esteja autenticado para inserir ou ler dados.

## Performance Impact:
- Indexes: Um índice de chave primária é criado em `id` e um índice de chave estrangeira em `user_id`. O impacto no desempenho é positivo para consultas filtradas por usuário.
- Triggers: Nenhum.
- Estimated Impact: Baixo. O impacto no desempenho geral do banco de dados é mínimo.
*/

-- Cria a tabela 'simulations'
CREATE TABLE public.simulations (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    asset text NOT NULL,
    current_price numeric NOT NULL,
    lot_size numeric NOT NULL,
    leverage integer NOT NULL,
    account_balance numeric NOT NULL,
    margin_required numeric NOT NULL,
    contract_value numeric NOT NULL,
    pip_value numeric NOT NULL,
    max_movement numeric NOT NULL,
    risk_percentage numeric NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT simulations_pkey PRIMARY KEY (id),
    CONSTRAINT simulations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Adiciona comentários às colunas para maior clareza
COMMENT ON TABLE public.simulations IS 'Armazena o histórico de simulações de risco dos usuários.';
COMMENT ON COLUMN public.simulations.user_id IS 'ID do usuário que realizou a simulação.';

-- Habilita a Segurança em Nível de Linha (RLS)
ALTER TABLE public.simulations ENABLE ROW LEVEL SECURITY;

-- Cria a política para permitir que usuários leiam apenas suas próprias simulações
CREATE POLICY "Allow individual read access"
ON public.simulations
FOR SELECT
USING (auth.uid() = user_id);

-- Cria a política para permitir que usuários insiram simulações apenas para si mesmos
CREATE POLICY "Allow individual insert access"
ON public.simulations
FOR INSERT
WITH CHECK (auth.uid() = user_id);
