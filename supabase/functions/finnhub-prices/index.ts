import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Mapeamento de símbolos de exibição para símbolos da API Finnhub
const SYMBOL_MAP: { [key: string]: string } = {
  'XAU/USD': 'OANDA:XAU_USD',
  'EUR/USD': 'OANDA:EUR_USD',
  'GBP/USD': 'OANDA:GBP_USD',
  'USD/JPY': 'OANDA:USD_JPY',
};
const API_SYMBOLS = Object.values(SYMBOL_MAP);

// Headers para a resposta CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (_req) => {
  // Handle CORS preflight requests
  if (_req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Obter chaves de ambiente
    const finnhubApiKey = Deno.env.get('FINNHUB_API_KEY')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!finnhubApiKey || !supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Variáveis de ambiente ausentes: FINNHUB_API_KEY, SUPABASE_URL, ou SUPABASE_SERVICE_ROLE_KEY')
    }

    // Criar cliente Supabase com a chave de serviço para ter permissões de broadcast
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)

    // Buscar preços para todos os símbolos de uma vez
    const pricePromises = API_SYMBOLS.map(symbol =>
      fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`)
        .then(res => res.json())
        .then(data => ({ symbol: symbol, price: data.c })) // 'c' é o preço atual (current price)
    );

    const prices = await Promise.all(pricePromises);

    // Formatar os dados para o broadcast
    const marketData: { [key: string]: { price: number } } = {};
    const reverseSymbolMap = Object.fromEntries(Object.entries(SYMBOL_MAP).map(([k, v]) => [v, k]));

    prices.forEach(item => {
      const displaySymbol = reverseSymbolMap[item.symbol];
      if (displaySymbol && item.price) {
        marketData[displaySymbol] = { price: item.price };
      }
    });

    // Se obtivemos algum dado, fazer o broadcast
    if (Object.keys(marketData).length > 0) {
      const channel = supabaseAdmin.channel('market-prices');
      await channel.send({
        type: 'broadcast',
        event: 'prices-update',
        payload: { data: marketData, timestamp: new Date().toISOString() },
      });
      console.log('Broadcast de preços enviado:', marketData);
    }

    return new Response(JSON.stringify({ success: true, data: marketData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Erro na Edge Function:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
