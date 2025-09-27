import React, { useState, useMemo } from 'react';
import { Modal } from '../../ui/Modal';
import { useDashboard } from '../../../contexts/DashboardContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const ScenarioSimulatorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { formData, calculation } = useDashboard();
  const [priceChange, setPriceChange] = useState(0);

  const pipDenominator = formData.asset.includes('JPY') ? 1000 : 10000;
  const maxPips = calculation.maxMovement > 0 ? Math.min(calculation.maxMovement, 500) : 500;

  const simulated = useMemo(() => {
    const priceMove = priceChange / pipDenominator;
    const newPrice = formData.currentPrice + priceMove;
    const pnl = priceChange * calculation.pipValue;
    const newEquity = formData.accountBalance + pnl;
    const newMarginLevel = calculation.marginRequired > 0 ? (newEquity / calculation.marginRequired) * 100 : 0;

    return { newPrice, pnl, newEquity, newMarginLevel };
  }, [priceChange, formData, calculation]);

  const pnlColor = simulated.pnl >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Simulador de Cenários" size="lg">
      <div className="space-y-6">
        <div>
          <label htmlFor="price-slider" className="block text-sm font-medium text-dark-muted mb-2">
            Variação de Preço (pips): <span className={`font-mono ${pnlColor}`}>{priceChange.toFixed(1)}</span>
          </label>
          <input
            id="price-slider"
            type="range"
            min={-maxPips}
            max={maxPips}
            step="0.1"
            value={priceChange}
            onChange={(e) => setPriceChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-dark-muted mt-1">
            <span>-{maxPips} pips</span>
            <span>0 pips</span>
            <span>+{maxPips} pips</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-dark-bg/50 rounded-xl p-4">
            <p className="text-sm text-dark-muted">Lucro/Prejuízo (P/L)</p>
            <p className={`text-2xl font-bold font-mono ${pnlColor}`}>
              {simulated.pnl >= 0 ? '+' : ''}${simulated.pnl.toFixed(2)}
            </p>
          </div>
          <div className="bg-dark-bg/50 rounded-xl p-4">
            <p className="text-sm text-dark-muted">Novo Saldo (Equity)</p>
            <p className="text-2xl font-bold font-mono text-dark-text">
              ${simulated.newEquity.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-dark-bg/50 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-dark-muted">Nível de Margem Simulado</span>
            <span className={`text-lg font-bold font-mono ${simulated.newMarginLevel > 100 ? 'text-green-400' : 'text-red-400'}`}>
              {simulated.newMarginLevel.toFixed(2)}%
            </span>
          </div>
          <div className="w-full bg-dark-border rounded-full h-2.5 mt-2">
            <div
              className={`h-2.5 rounded-full ${simulated.newMarginLevel > 100 ? 'bg-green-400' : 'bg-red-400'}`}
              style={{ width: `${Math.min(simulated.newMarginLevel, 200)}%` }}
            ></div>
          </div>
        </div>

        <div className="text-xs text-dark-muted text-center">
          Esta é uma simulação e não considera swaps ou comissões.
        </div>
      </div>
    </Modal>
  );
};
