export interface MarketData {
  [symbol: string]: {
    price: number;
  };
}

// Lista de símbolos que a aplicação irá buscar na API
// Adicionado SPY para representar o S&P 500, conforme solicitado.
export const SUPPORTED_SYMBOLS = [
  'XAU/USD',
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'BTC/USD',
  'AAPL',
  'SPY', // S&P 500 ETF
];

// Preços de fallback para o carregamento inicial ou em caso de falha da API
export const BASE_PRICES: MarketData = {
  'XAU/USD': { price: 2350.00 },
  'EUR/USD': { price: 1.0850 },
  'GBP/USD': { price: 1.2700 },
  'USD/JPY': { price: 155.00 },
  'BTC/USD': { price: 65000.00 },
  'AAPL':    { price: 210.00 },
  'SPY':     { price: 540.00 }, // Fallback para S&P 500 ETF
};
