export interface MarketData {
  [symbol: string]: {
    price: number;
  };
}

// Mapeamento de símbolos de exibição para símbolos da API Finnhub
export const SYMBOL_MAP: { [key: string]: string } = {
  'XAU/USD': 'OANDA:XAU_USD',
  'EUR/USD': 'OANDA:EUR_USD',
  'GBP/USD': 'OANDA:GBP_USD',
  'USD/JPY': 'OANDA:USD_JPY',
};

// Valores base para fallback
export const BASE_PRICES: MarketData = {
  'XAU/USD': { price: 2350.00 },
  'EUR/USD': { price: 1.0850 },
  'GBP/USD': { price: 1.2700 },
  'USD/JPY': { price: 155.00 },
};
