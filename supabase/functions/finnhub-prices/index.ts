import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const SUPPORTED_SYMBOLS = [
  'XAU/USD',
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'BTC/USD',
  'AAPL',
];

// [CORREÇÃO] Adicionados cabeçalhos para instruir o navegador e CDNs a nunca armazenarem a resposta.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Cache-Control': 'no-cache, no-store, must-revalidate', // Garante que a resposta nunca seja cacheada
  'Pragma': 'no-cache', // Para compatibilidade com HTTP/1.0
  'Expires': '0', // Para compatibilidade com proxies antigos
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Método não permitido. Use GET.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405,
    })
  }

  try {
    const twelveDataApiKey = Deno.env.get('TWELVE_DATA_API_KEY')
    if (!twelveDataApiKey) {
      throw new Error('A variável de ambiente TWELVE_DATA_API_KEY não está configurada na Supabase.')
    }

    const symbols = SUPPORTED_SYMBOLS.join(',');
    const url = `https://api.twelvedata.com/price?symbol=${symbols}&apikey=${twelveDataApiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erro na API da Twelve Data: ${response.status}`);
    }

    const data = await response.json();
    
    const marketData: { [key: string]: { price: number } } = {};
    for (const symbol of SUPPORTED_SYMBOLS) {
      // A API retorna um objeto único se for um símbolo, ou um objeto com chaves se forem múltiplos.
      const priceData = SUPPORTED_SYMBOLS.length === 1 ? data : data[symbol];
      if (priceData && priceData.price && !isNaN(parseFloat(priceData.price))) {
        marketData[symbol] = { price: parseFloat(priceData.price) };
      }
    }

    if (Object.keys(marketData).length === 0) {
      throw new Error('A resposta da API da Twelve Data não continha dados de preço válidos.');
    }

    return new Response(JSON.stringify(marketData), {
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
