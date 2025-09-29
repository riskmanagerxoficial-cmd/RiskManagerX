export interface MarketData {
  [symbol: string]: {
    price: number;
  };
}

// Mapeamento de símbolos de exibição para símbolos da API Finnhub
export const FINNHUB_SYMBOL_MAP: { [key: string]: string } = {
  'XAU/USD': 'OANDA:XAU_USD',
  'EUR/USD': 'OANDA:EUR_USD',
  'GBP/USD': 'OANDA:GBP_USD',
  'USD/JPY': 'OANDA:USD_JPY',
  'BTC/USD': 'BINANCE:BTCUSDT',
  'AAPL': 'AAPL',
  'SPY': 'SPY',
};

// Lista de símbolos que a aplicação irá buscar na API
export const SUPPORTED_SYMBOLS = [
  'XAU/USD',
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'BTC/USD',
  'AAPL',
  'SPY',
];

// Preços de fallback para o carregamento inicial ou em caso de falha da API
export const BASE_PRICES: MarketData = {
  'XAU/USD': { price: 2350.00 },
  'EUR/USD': { price: 1.0850 },
  'GBP/USD': { price: 1.2700 },
  'USD/JPY': { price: 155.00 },
  'BTC/USD': { price: 65000.00 },
  'AAPL':    { price: 210.00 },
  'SPY':     { price: 540.00 },
};
