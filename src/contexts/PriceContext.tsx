import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
import { BASE_PRICES, MarketData, SUPPORTED_SYMBOLS } from '../services/marketData';

// --- Interfaces ---
interface PriceContextType {
  marketData: MarketData;
  isLoading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  refreshPrices: () => void;
}

// --- Context ---
const PriceContext = createContext<PriceContextType | undefined>(undefined);

// --- Hook ---
export const useMarketData = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error('useMarketData deve ser usado dentro de um PriceProvider');
  }
  return context;
};

// --- Retry Utility ---
const retry = async <T,>(
  fn: () => Promise<T>,
  retries = 3,
  backoff = 1000
): Promise<T> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      console.warn(`[PriceContext] Falha na tentativa ${i + 1}/${retries}:`, (error as Error).message);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, backoff * Math.pow(2, i)));
    }
  }
  throw new Error('Todas as tentativas falharam.');
};

// --- Provider ---
export const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [marketData, setMarketData] = useState<MarketData>(() => {
    try {
      const cachedData = localStorage.getItem('marketData');
      return cachedData ? JSON.parse(cachedData) : BASE_PRICES;
    } catch {
      return BASE_PRICES;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const fetchPrices = useCallback(async () => {
    if (isRateLimited) {
      console.warn('[PriceContext] A busca de preços está pausada devido ao limite da API.');
      return;
    }

    setIsLoading(true);
    if (!isRateLimited) {
      setError(null);
    }

    const twelveDataApiKey = import.meta.env.VITE_TWELVE_DATA_API_KEY;

    if (!twelveDataApiKey) {
      const msg = "A chave da API da Twelve Data (VITE_TWELVE_DATA_API_KEY) não está configurada no arquivo .env.";
      console.error(`[PriceContext] ${msg}`);
      setError(msg);
      setIsLoading(false);
      return;
    }

    const symbols = SUPPORTED_SYMBOLS.join(',');
    const apiUrl = `https://api.twelvedata.com/price?symbol=${symbols}&apikey=${twelveDataApiKey}`;

    try {
      const data = await retry(async () => {
        const response = await fetch(apiUrl, {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`[PriceContext] Erro na API da Twelve Data (status: ${response.status}):`, errorText);
          if (response.status === 429 || errorText.includes('run out of API credits')) {
            throw new Error('Limite de chamadas da API da Twelve Data excedido.');
          }
          throw new Error('Falha na comunicação com a API de preços.');
        }
        return await response.json();
      });

      if (data.code && data.message?.includes('run out of API credits')) {
        const msg = "Você excedeu o limite diário de chamadas da API. A busca de preços será retomada amanhã.";
        setError(msg);
        setIsRateLimited(true);
        console.error(`[PriceContext] ${msg}`);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }

      const newPrices: Partial<MarketData> = {};
      let hasValidData = false;

      for (const symbol of SUPPORTED_SYMBOLS) {
        const priceData = data[symbol];
        if (priceData && priceData.price && !isNaN(parseFloat(priceData.price))) {
          newPrices[symbol] = { price: parseFloat(priceData.price) };
          hasValidData = true;
        } else {
          console.warn(`[PriceContext] Preço para o símbolo ${symbol} não encontrado na resposta. Mantendo valor anterior/fallback.`);
        }
      }

      if (!hasValidData) {
        if (data.code) {
          throw new Error(`API da Twelve Data retornou um erro: ${data.message}`);
        }
        throw new Error('A resposta da API não continha dados de preço válidos.');
      }

      setMarketData(prevData => {
        const updatedData = { ...prevData, ...newPrices };
        localStorage.setItem('marketData', JSON.stringify(updatedData));
        return updatedData;
      });
      setLastUpdate(new Date());

    } catch (err) {
      const errorMessage = (err as Error).message;
      console.error('[PriceContext] Erro final ao buscar preços:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isRateLimited]);

  useEffect(() => {
    const POLLING_INTERVAL = 90000; // Aumentado para 90 segundos

    const startPolling = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!isRateLimited) {
        intervalRef.current = window.setInterval(fetchPrices, POLLING_INTERVAL);
      }
    };

    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        fetchPrices();
        startPolling();
      }
    };

    fetchPrices();
    startPolling();

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchPrices, isRateLimited]);

  const value = {
    marketData,
    isLoading,
    error,
    lastUpdate,
    refreshPrices: fetchPrices,
  };

  return (
    <PriceContext.Provider value={value}>
      {children}
    </PriceContext.Provider>
  );
};
