import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface MarketData {
  [symbol: string]: {
    price: number;
  };
}

interface PriceContextType {
  marketData: MarketData;
  isLoading: boolean;
  error: string | null;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const useMarketData = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error('useMarketData must be used within a PriceProvider');
  }
  return context;
};

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

// Mapeamento de símbolos de exibição para símbolos da API Finnhub
const SYMBOL_MAP: { [key: string]: string } = {
  'XAU/USD': 'OANDA:XAU_USD',
  'EUR/USD': 'OANDA:EUR_USD',
  'GBP/USD': 'OANDA:GBP_USD',
  'USD/JPY': 'OANDA:USD_JPY',
};

// Mapeamento reverso para analisar as mensagens recebidas
const REVERSE_SYMBOL_MAP: { [key: string]: string } = Object.fromEntries(
  Object.entries(SYMBOL_MAP).map(([key, value]) => [value, key])
);

const API_SYMBOLS = Object.values(SYMBOL_MAP);

export const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [marketData, setMarketData] = useState<MarketData>({
    'XAU/USD': { price: 2350.00 },
    'EUR/USD': { price: 1.0850 },
    'GBP/USD': { price: 1.2700 },
    'USD/JPY': { price: 155.00 },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
      setError('A chave da API da Finnhub não foi configurada. Usando dados simulados.');
      setIsLoading(false);
      return;
    }

    const ws = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

    ws.onopen = () => {
      console.log('Conectado ao WebSocket da Finnhub.');
      API_SYMBOLS.forEach(symbol => {
        ws.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
      setIsLoading(false);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trade' && data.data) {
        data.data.forEach((trade: { s: string; p: number }) => {
          const displaySymbol = REVERSE_SYMBOL_MAP[trade.s];
          if (displaySymbol) {
            setMarketData(prevData => ({
              ...prevData,
              [displaySymbol]: {
                price: trade.p,
              },
            }));
          }
        });
      }
    };

    ws.onerror = (event) => {
      console.error('Erro no WebSocket da Finnhub:', event);
      setError('Erro ao conectar com a API de preços da Finnhub.');
      setIsLoading(false);
    };

    ws.onclose = () => {
      console.log('Desconectado do WebSocket da Finnhub.');
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        API_SYMBOLS.forEach(symbol => {
          ws.send(JSON.stringify({ type: 'unsubscribe', symbol }));
        });
        ws.close();
      }
    };
  }, []);

  return (
    <PriceContext.Provider value={{ marketData, isLoading, error }}>
      {children}
    </PriceContext.Provider>
  );
};
