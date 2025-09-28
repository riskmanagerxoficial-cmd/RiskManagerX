import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { BASE_PRICES, MarketData } from '../services/marketData';

interface PriceContextType {
  marketData: MarketData;
  isLoading: boolean;
  isPolling: boolean;
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

const retry = async <T,>(
  asyncFn: () => Promise<T>,
  retries = 3,
  delay = 1000,
  backoff = 2
): Promise<T> => {
  try {
    return await asyncFn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(asyncFn, retries - 1, delay * backoff, backoff);
  }
};

export const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [marketData, setMarketData] = useState<MarketData>(BASE_PRICES);
  const [isLoading, setIsLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      if (!isLoading) {
        setIsPolling(true);
      }

      try {
        const fetchedData = await retry(async () => {
          const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
          const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

          if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('As variáveis de ambiente do Supabase não estão configuradas.');
          }

          const response = await fetch(`${supabaseUrl}/functions/v1/finnhub-prices`, {
            method: 'GET',
            headers: {
              'apikey': supabaseAnonKey,
              'Authorization': `Bearer ${supabaseAnonKey}`,
            },
            // [CORREÇÃO] Força o navegador a sempre buscar uma nova versão do servidor, ignorando caches.
            cache: 'no-store',
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('[PriceContext] Resposta de erro da Edge Function:', errorText);
            throw new Error(`A requisição à Edge Function falhou com status ${response.status}.`);
          }

          return await response.json();
        });

        if (fetchedData && typeof fetchedData === 'object' && Object.keys(fetchedData).length > 0 && !fetchedData.error) {
          console.log('[PriceContext] Preços recebidos da Edge Function:', fetchedData);
          
          const now = new Date().toISOString();
          setMarketData(prevData => ({ ...prevData, ...fetchedData }));
          setLastUpdate(now);
          setError(null);

          localStorage.setItem('marketData', JSON.stringify(fetchedData));
          localStorage.setItem('lastUpdate', now);
        } else {
          throw new Error(fetchedData.error || 'A resposta da Edge Function não continha dados válidos.');
        }

      } catch (err: any) {
        const errorMessage = err.message || 'Falha ao buscar preços após várias tentativas.';
        console.error(`[PriceContext] Erro final ao buscar preços: ${errorMessage}`);
        setError(errorMessage);
      } finally {
        if (isLoading) setIsLoading(false);
        if (isPolling) setIsPolling(false);
      }
    };

    const loadInitialData = () => {
      try {
        const cachedData = localStorage.getItem('marketData');
        const cachedUpdate = localStorage.getItem('lastUpdate');
        
        if (cachedData) {
          console.log('[PriceContext] Carregando dados do cache local para exibição inicial.');
          setMarketData(JSON.parse(cachedData));
          if (cachedUpdate) {
            setLastUpdate(cachedUpdate);
          }
        }
      } catch (e) {
        console.error('[PriceContext] Falha ao ler dados do localStorage.', e);
      } finally {
        // Inicia a busca por dados frescos imediatamente após carregar o cache.
        fetchPrices();
      }
    };

    loadInitialData();

    const pollInterval = setInterval(fetchPrices, 60000);

    return () => {
      console.log('[PriceContext] Limpando o intervalo de polling.');
      clearInterval(pollInterval);
    };
  }, []); // O array de dependências vazio garante que este efeito rode apenas uma vez.

  return (
    <PriceContext.Provider value={{ marketData, isLoading, isPolling, error, lastUpdate }}>
      {children}
    </PriceContext.Provider>
  );
};
