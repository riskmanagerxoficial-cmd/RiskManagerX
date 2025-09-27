import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { useMarketData } from './PriceContext';

// Interfaces
interface FormData {
  asset: string;
  currentPrice: number;
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

// Provider
export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { marketData } = useMarketData();

  const [formData, setFormData] = useState<FormData>({
    asset: 'XAU/USD',
    currentPrice: marketData['XAU/USD']?.price || 2350.00,
    lotSize: 0.01,
    leverage: 100,
    accountBalance: 1000,
    stopOutLevel: 20,
  });

  // Update current price when market data or asset changes
  useEffect(() => {
    const assetPrice = marketData[formData.asset]?.price;
    if (assetPrice && assetPrice !== formData.currentPrice) {
      setFormData(prev => ({ ...prev, currentPrice: assetPrice }));
    }
  }, [marketData, formData.asset, formData.currentPrice]);

  const calculation: CalculationResult = useMemo(() => {
    const { currentPrice, lotSize, leverage, accountBalance, stopOutLevel } = formData;

    const contractSize = formData.asset === 'XAU/USD' ? 100 : 100000;
    const contractValue = currentPrice * lotSize * contractSize;
    const marginRequired = contractValue > 0 && leverage > 0 ? contractValue / leverage : 0;
    const pipValue = lotSize * (formData.asset.includes('JPY') ? 1000 : 10);

    const freeMargin = accountBalance - marginRequired;
    const marginLevel = marginRequired > 0 ? (accountBalance / marginRequired) * 100 : 0;

    const equity = accountBalance; // For simplicity, assuming no open P/L
    const marginToStopOut = (stopOutLevel / 100) * marginRequired;
    const availableMarginToLose = equity - marginToStopOut;
    
    const maxMovement = pipValue > 0 ? (availableMarginToLose / pipValue) : 0;

    const stopOutPrice = currentPrice > 0 ? currentPrice - (availableMarginToLose / (lotSize * contractSize)) : 0;

    const riskPercentage = accountBalance > 0 ? (marginRequired / accountBalance) * 100 : 0;

    return {
      marginRequired,
      contractValue,
      pipValue,
      maxMovement,
      riskPercentage,
      stopOutPrice,
      freeMargin,
      marginLevel,
    };
  }, [formData]);

  const value = {
    formData,
    setFormData,
    calculation,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
