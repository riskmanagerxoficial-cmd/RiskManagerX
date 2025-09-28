import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { useMarketData } from './PriceContext';
import { BASE_PRICES } from '../services/marketData';

// Interfaces
interface FormData {
  asset: string;
  lotSize: number;
  leverage: number;
  accountBalance: number;
  stopOutLevel: number;
}

interface CalculationResult {
  marginRequired: number;
  contractValue: number;
  pipValue: number;
  maxMovement: number;
  riskPercentage: number;
  stopOutPrice: number;
  freeMargin: number;
  marginLevel: number;
}

interface DashboardContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  calculation: CalculationResult;
  currentPrice: number;
}

// Context Creation
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Hook
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Funções auxiliares para cálculos
const getContractSize = (asset: string): number => {
  if (asset === 'XAU/USD') return 100; // Ouro (100 onças por lote)
  if (asset === 'AAPL' || asset === 'BTC/USD') return 1; // Ações e Cripto (1 unidade por lote)
  return 100000; // Padrão para Forex
};

const getPointValue = (asset: string, lotSize: number): number => {
  if (asset === 'AAPL' || asset === 'BTC/USD') {
    // Para ações e cripto, o "valor do ponto" é o valor de um movimento de $1.
    // Assumindo que 1 lote = 1 unidade (1 ação, 1 BTC), o valor é o próprio lote.
    return lotSize;
  }
  // Lógica para Forex e Ouro (valor do pip)
  return lotSize * (asset.includes('JPY') ? 1000 : 10);
};


// Provider
export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { marketData } = useMarketData();

  const [formData, setFormData] = useState<FormData>({
    asset: 'XAU/USD',
    lotSize: 0.01,
    leverage: 100,
    accountBalance: 1000,
    stopOutLevel: 20,
  });

  const currentPrice = marketData[formData.asset]?.price || BASE_PRICES[formData.asset]?.price || 0;

  const calculation: CalculationResult = useMemo(() => {
    const { lotSize, leverage, accountBalance, stopOutLevel, asset } = formData;

    const contractSize = getContractSize(asset);
    const pointValue = getPointValue(asset, lotSize); // "Pip Value" ou "Point Value"

    const contractValue = currentPrice * lotSize * contractSize;
    const marginRequired = contractValue > 0 && leverage > 0 ? contractValue / leverage : 0;
    
    const freeMargin = accountBalance - marginRequired;
    const marginLevel = marginRequired > 0 ? (accountBalance / marginRequired) * 100 : 0;

    const equity = accountBalance;
    const marginToStopOut = (stopOutLevel / 100) * marginRequired;
    const availableMarginToLose = equity - marginToStopOut;
    
    // "Max Movement" em pontos/pips
    const maxMovement = pointValue > 0 ? (availableMarginToLose / pointValue) : 0;

    // O preço que aciona o Stop Out
    const stopOutPrice = currentPrice > 0 ? currentPrice - (availableMarginToLose / (lotSize * contractSize)) : 0;

    const riskPercentage = accountBalance > 0 ? (marginRequired / accountBalance) * 100 : 0;

    return {
      marginRequired,
      contractValue,
      pipValue: pointValue, // Mantendo o nome da propriedade por compatibilidade
      maxMovement,
      riskPercentage,
      stopOutPrice,
      freeMargin,
      marginLevel,
    };
  }, [formData, currentPrice]);

  const value = {
    formData,
    setFormData,
    calculation,
    currentPrice,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
