import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// Lista de símbolos gerenciada centralmente no backend.
const SUPPORTED_SYMBOLS = [
  'XAU/USD',
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'BTC/USD',
  'AAPL',
];

// Cabeçalhos CORS e de Cache-Control para garantir dados sempre atualizados.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  // CORREÇÃO: Adicionado 'POST' para permitir chamadas via supabase.functions.invoke()
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
}

serve(async (req) => {
  // Handler para a requisição de preflight do CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
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
      const errorData = await response.text();
      console.error('Erro na API da Twelve Data:', errorData);
      throw new Error(`Erro ao buscar dados da Twelve Data: ${response.status}`);
    }

    const data = await response.json();
    
    const marketData: { [key: string]: { price: number } } = {};
    for (const symbol of SUPPORTED_SYMBOLS) {
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
