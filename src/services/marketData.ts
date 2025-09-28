export interface MarketData {
  [symbol: string]: {
    price: number;
  };
}

// Lista de símbolos que a aplicação irá buscar na API
export const SUPPORTED_SYMBOLS = [
  'XAU/USD',
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'BTC/USD',
  'AAPL',
];

// Preços de fallback para o carregamento inicial ou em caso de falha da API
export const BASE_PRICES: MarketData = {
  'XAU/USD': { price: 2350.00 },
  'EUR/USD': { price: 1.0850 },
  'GBP/USD': { price: 1.2700 },
  'USD/JPY': { price: 155.00 },
  'BTC/USD': { price: 65000.00 },
  'AAPL':    { price: 210.00 },
};
