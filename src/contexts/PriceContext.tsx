import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { BASE_PRICES, MarketData } from '../services/finnhub';

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
    // Inicia com loading e dados base
    setIsLoading(true);
    setMarketData(BASE_PRICES);

    // Cria o canal de realtime
    const channel = supabase.channel('market-prices');

    // Define o que fazer ao receber um broadcast
    channel.on(
      'broadcast',
      { event: 'prices-update' },
      (payload) => {
        const { data, timestamp } = payload.payload;
        
        if (data && Object.keys(data).length > 0) {
          setMarketData(prevData => ({ ...prevData, ...data }));
          setLastUpdate(timestamp);
          setError(null); // Limpa erros anteriores se recebermos dados
        }
        
        if (isLoading) {
          setIsLoading(false);
        }
      }
    );

    // Inscreve-se no canal e trata o resultado
    channel.subscribe((status, err) => {
      if (status === 'SUBSCRIBED') {
        console.log('Inscrito no canal market-prices com sucesso!');
        // O loading será setado para false quando o primeiro dado chegar
      }
      if (status === 'CHANNEL_ERROR') {
        console.error('Falha ao se inscrever no canal:', err);
        setError('Erro de conexão com o serviço de preços em tempo real.');
        setIsLoading(false);
      }
      if (status === 'TIMED_OUT') {
        console.error('Tempo de conexão esgotado.');
        setError('A conexão com o serviço de preços expirou.');
        setIsLoading(false);
      }
    });

    // Fallback: se não receber dados após 10 segundos, para de carregar
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setError('Não foi possível obter preços em tempo real. Usando dados de fallback.');
        console.warn('Fallback ativado: não foram recebidos dados do canal Realtime.');
      }
    }, 10000);

    // Função de limpeza para desinscrever do canal
    return () => {
      clearTimeout(fallbackTimer);
      supabase.removeChannel(channel);
      console.log('Desinscrito do canal market-prices.');
    };
  }, []); // Executa apenas uma vez na montagem do componente

  return (
    <PriceContext.Provider value={{ marketData, isLoading, error, lastUpdate }}>
      {children}
    </PriceContext.Provider>
  );
};
