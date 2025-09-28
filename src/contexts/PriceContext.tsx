import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
import { BASE_PRICES, MarketData, SUPPORTED_SYMBOLS, FINNHUB_SYMBOL_MAP } from '../services/marketData';

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

// --- Funções de Fetch ---

// Fetch da Twelve Data (em lote)
async function fetchFromTwelveData(apiKey: string): Promise<Partial<MarketData>> {
  const symbols = SUPPORTED_SYMBOLS.join(',');
  const url = `https://api.twelvedata.com/price?symbol=${symbols}&apikey=${apiKey}`;
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 429 || errorText.includes('credits')) {
      throw new Error('Limite de API da Twelve Data atingido.');
    }
    throw new Error(`Erro na API Twelve Data: ${response.status}`);
  }

  const data = await response.json();
  const newPrices: Partial<MarketData> = {};
  for (const symbol of SUPPORTED_SYMBOLS) {
    const priceData = data[symbol];
    if (priceData?.price) {
      newPrices[symbol] = { price: parseFloat(priceData.price) };
    }
  }
  return newPrices;
}

// Fetch da Finnhub (em lote, uma chamada por símbolo)
async function fetchFromFinnhub(apiKey: string): Promise<Partial<MarketData>> {
  const newPrices: Partial<MarketData> = {};
  const promises = SUPPORTED_SYMBOLS.map(async (symbol) => {
    const finnhubSymbol = FINNHUB_SYMBOL_MAP[symbol];
    const url = `https://finnhub.io/api/v1/quote?symbol=${finnhubSymbol}&token=${apiKey}`;
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      if (data?.c) { // 'c' é o preço atual na API da Finnhub
        newPrices[symbol] = { price: data.c };
      }
    } catch (error) {
      console.warn(`[PriceContext] Falha ao buscar ${symbol} na Finnhub:`, (error as Error).message);
    }
  });

  await Promise.all(promises);
  return newPrices;
}

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
  const [lastUpdate, setLastUpdate] = useState<Date | null>(() => {
    const cachedTimestamp = localStorage.getItem('marketDataTimestamp');
    return cachedTimestamp ? new Date(JSON.parse(cachedTimestamp)) : null;
  });

  const fetchPrices = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const twelveDataApiKey = import.meta.env.VITE_TWELVE_DATA_API_KEY;
    const finnhubApiKey = import.meta.env.VITE_FINNHUB_API_KEY;

    let newPrices: Partial<MarketData> = {};
    let fetchError: Error | null = null;

    try {
      if (!twelveDataApiKey) throw new Error('Chave da API Twelve Data não configurada.');
      console.log('[PriceContext] Tentando buscar preços na Twelve Data...');
      newPrices = await fetchFromTwelveData(twelveDataApiKey);
    } catch (err) {
      console.warn(`[PriceContext] Falha na Twelve Data: ${(err as Error).message}. Usando fallback para Finnhub.`);
      fetchError = err as Error;
      try {
        if (!finnhubApiKey) throw new Error('Chave da API Finnhub não configurada para fallback.');
        console.log('[PriceContext] Tentando buscar preços na Finnhub...');
        newPrices = await fetchFromFinnhub(finnhubApiKey);
        fetchError = null; // Sucesso no fallback
      } catch (fallbackErr) {
        console.error('[PriceContext] Falha no fallback para Finnhub:', (fallbackErr as Error).message);
        fetchError = fallbackErr as Error;
      }
    }

    if (Object.keys(newPrices).length > 0) {
      setMarketData(prevData => {
        const updatedData = { ...prevData, ...newPrices };
        localStorage.setItem('marketData', JSON.stringify(updatedData));
        return updatedData;
      });
      const now = new Date();
      setLastUpdate(now);
      localStorage.setItem('marketDataTimestamp', JSON.stringify(now));
    } else if (fetchError) {
      setError(fetchError.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const POLLING_INTERVAL = 5 * 60 * 1000; // 5 minutos
    let intervalId: number | null = null;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalId) clearInterval(intervalId);
      } else {
        fetchPrices();
        intervalId = window.setInterval(fetchPrices, POLLING_INTERVAL);
      }
    };

    fetchPrices(); // Busca inicial
    intervalId = window.setInterval(fetchPrices, POLLING_INTERVAL);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchPrices]);

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
