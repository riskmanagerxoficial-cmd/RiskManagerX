import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { BASE_PRICES, SUPPORTED_SYMBOLS, MarketData } from '../services/marketData';

interface PriceContextType {
  marketData: MarketData;
  isLoading: boolean;
  error: string | null;
  lastUpdate: string | null;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const useMarketData = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error('useMarketData must be used within a PriceProvider');
  }
  return context;
};

export const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [marketData, setMarketData] = useState<MarketData>(BASE_PRICES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TWELVE_DATA_API_KEY;

    if (!apiKey || apiKey === 'YOUR_API_KEY') {
      const errorMessage = 'A chave da API da Twelve Data não está configurada no arquivo .env.';
      console.error(`[PriceContext] ${errorMessage}`);
      setError(errorMessage);
      setIsLoading(false);
      return;
    }

    const fetchPrices = async () => {
      console.log('[PriceContext] Buscando preços na Twelve Data API...');
      const symbols = SUPPORTED_SYMBOLS.join(',');
      const url = `https://api.twelvedata.com/price?symbol=${symbols}&apikey=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const newMarketData: MarketData = {};

        // A API retorna um objeto único para um símbolo ou um objeto de objetos para múltiplos
        if (SUPPORTED_SYMBOLS.length === 1) {
          const symbol = SUPPORTED_SYMBOLS[0];
          if (data.price) {
            newMarketData[symbol] = { price: parseFloat(data.price) };
          }
        } else {
          for (const symbol of SUPPORTED_SYMBOLS) {
            if (data[symbol] && data[symbol].price) {
              newMarketData[symbol] = { price: parseFloat(data[symbol].price) };
            }
          }
        }
        
        if (Object.keys(newMarketData).length > 0) {
          console.log('[PriceContext] Preços recebidos:', newMarketData);
          setMarketData(prevData => ({ ...prevData, ...newMarketData }));
          setLastUpdate(new Date().toISOString());
          setError(null);
        } else {
          throw new Error('A resposta da API não continha dados de preço válidos.');
        }

      } catch (err: any) {
        console.error('[PriceContext] Falha ao buscar preços:', err.message);
        setError('Não foi possível buscar novos preços. Usando últimos dados válidos.');
      } finally {
        if (isLoading) {
          setIsLoading(false);
        }
      }
    };

    fetchPrices(); // Executa imediatamente ao carregar
    const pollInterval = setInterval(fetchPrices, 60000); // E depois a cada 60 segundos

    return () => {
      console.log('[PriceContext] Limpando o intervalo de polling.');
      clearInterval(pollInterval);
    };
  }, []); // O array vazio garante que o efeito rode apenas uma vez

  return (
    <PriceContext.Provider value={{ marketData, isLoading, error, lastUpdate }}>
      {children}
    </PriceContext.Provider>
  );
};
