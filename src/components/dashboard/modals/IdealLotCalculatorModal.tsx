import React, { useState, useMemo } from 'react';
import { Modal } from '../../ui/Modal';
import { useDashboard } from '../../../contexts/DashboardContext';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { useToast } from '../../../contexts/ToastContext';

export const IdealLotCalculatorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { formData, setFormData } = useDashboard();
  const [riskPercent, setRiskPercent] = useState(1);
  const [stopLossPips, setStopLossPips] = useState(100);
  const toast = useToast();

  const idealLotSize = useMemo(() => {
    if (stopLossPips <= 0) return 0;

    const riskAmount = formData.accountBalance * (riskPercent / 100);
    const pipValuePerLot = formData.asset.includes('JPY') ? 1000 : 10;
    const lossPerPipPerLot = pipValuePerLot;

    const idealLot = riskAmount / (stopLossPips * lossPerPipPerLot);
    return idealLot > 0 ? idealLot : 0;
  }, [riskPercent, stopLossPips, formData.accountBalance, formData.asset]);

  const handleApplyLotSize = () => {
    setFormData(prev => ({
      ...prev,
      lotSize: parseFloat(idealLotSize.toFixed(2))
    }));
    toast.success('Tamanho do lote aplicado com sucesso!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Calculadora de Lote Ideal">
      <div className="space-y-6">
        <Input
          label="Risco por Operação (%)"
          type="number"
          value={riskPercent}
          onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
          step="0.1"
          min="0.1"
          max="100"
        />

        <Input
          label="Distância do Stop Loss (pips)"
          type="number"
          value={stopLossPips}
          onChange={(e) => setStopLossPips(parseFloat(e.target.value))}
          step="1"
          min="1"
        />

        <div className="bg-dark-bg/50 rounded-xl p-6 text-center border border-neon-blue/30">
          <p className="text-sm text-dark-muted">Lote Ideal Recomendado</p>
          <p className="text-3xl font-bold font-mono text-neon-blue mt-2">
            {idealLotSize.toFixed(2)}
          </p>
          <p className="text-xs text-dark-muted mt-2">
            Arriscando ${ (formData.accountBalance * (riskPercent / 100)).toFixed(2) }
          </p>
        </div>

        <Button
          onClick={handleApplyLotSize}
          className="w-full"
          variant="primary"
          disabled={idealLotSize <= 0}
        >
          Aplicar Lote na Calculadora
        </Button>
      </div>
    </Modal>
  );
};
