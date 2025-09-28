import React, { useState } from 'react';
import { Calculator, AlertTriangle, TrendingUp, Save } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const RiskCalculator: React.FC = () => {
  const { formData, setFormData, calculation, currentPrice } = useDashboard();
  const { user } = useAuth();
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: keyof Omit<typeof formData, 'asset' | 'leverage'>, value: string | number) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericValue) && value !== '') return;
    
    setFormData(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  const handleSelectChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSimulation = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para salvar uma simulação.');
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.from('simulations').insert({
        user_id: user.id,
        asset: formData.asset,
        current_price: currentPrice,
        lot_size: formData.lotSize,
        leverage: formData.leverage,
        account_balance: formData.accountBalance,
        margin_required: calculation.marginRequired,
        contract_value: calculation.contractValue,
        pip_value: calculation.pipValue,
        max_movement: calculation.maxMovement,
        risk_percentage: calculation.riskPercentage,
      });

      if (error) throw error;

      toast.success('Simulação salva com sucesso!');
    } catch (error: any) {
      toast.error('Erro ao salvar simulação', error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage <= 2) return { level: 'Seguro', color: 'text-green-400', bgColor: 'bg-green-400/20' };
    if (percentage <= 5) return { level: 'Moderado', color: 'text-yellow-400', bgColor: 'bg-yellow-400/20' };
    return { level: 'Alto Risco', color: 'text-red-400', bgColor: 'bg-red-400/20' };
  };

  const riskLevel = getRiskLevel(calculation.riskPercentage);

  const getPriceFormatOptions = (asset: string) => {
    if (asset.includes('JPY')) return { minimumFractionDigits: 3, maximumFractionDigits: 3 };
    if (asset === 'AAPL' || asset === 'BTC/USD' || asset === 'XAU/USD') return { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    return { minimumFractionDigits: 4, maximumFractionDigits: 4 };
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Formulário de Input */}
      <Card glow="blue" className="space-y-6">
        <div className="flex items-center space-x-3">
          <Calculator className="w-6 h-6 text-neon-blue" />
          <h3 className="text-lg font-semibold text-dark-text">Calculadora de Risco</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">Ativo</label>
            <select
              value={formData.asset}
              onChange={(e) => handleSelectChange('asset', e.target.value)}
              className="w-full px-4 py-2.5 bg-dark-card border border-dark-border rounded-xl text-dark-text focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue"
            >
              <option value="XAU/USD">XAU/USD (Ouro)</option>
              <option value="EUR/USD">EUR/USD</option>
              <option value="GBP/USD">GBP/USD</option>
              <option value="USD/JPY">USD/JPY</option>
              <option value="BTC/USD">BTC/USD (Bitcoin)</option>
              <option value="AAPL">AAPL (Apple Inc.)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">Preço Atual (USD)</label>
            <div className="relative w-full px-4 py-2.5 bg-dark-bg/50 border border-dark-border rounded-xl text-dark-text">
              <span className="font-mono">{currentPrice.toLocaleString('en-US', getPriceFormatOptions(formData.asset))}</span>
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <Input
            label="Tamanho do Lote"
            type="number"
            step="0.01"
            min="0.01"
            max="100"
            value={formData.lotSize}
            onChange={(e) => handleInputChange('lotSize', e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">Alavancagem</label>
            <select
              value={formData.leverage}
              onChange={(e) => handleSelectChange('leverage', parseInt(e.target.value))}
              className="w-full px-4 py-2.5 bg-dark-card border border-dark-border rounded-xl text-dark-text focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue"
            >
              <option value="10">1:10</option>
              <option value="50">1:50</option>
              <option value="100">1:100</option>
              <option value="200">1:200</option>
              <option value="500">1:500</option>
              <option value="1000">1:1000</option>
              <option value="2000">1:2000</option>
            </select>
          </div>

          <Input
            label="Saldo da Conta (USD)"
            type="number"
            step="0.01"
            value={formData.accountBalance}
            onChange={(e) => handleInputChange('accountBalance', e.target.value)}
          />

          <Input
            label="Nível de Stop Out (%)"
            type="number"
            step="1"
            min="0"
            max="100"
            value={formData.stopOutLevel}
            onChange={(e) => handleInputChange('stopOutLevel', e.target.value)}
          />
        </div>
      </Card>

      {/* Resultados */}
      <Card glow="cyan" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-neon-cyan" />
            <h3 className="text-lg font-semibold text-dark-text">Análise de Risco</h3>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${riskLevel.bgColor} ${riskLevel.color}`}>
            {riskLevel.level}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-bg/50 rounded-xl p-4">
            <p className="text-sm text-dark-muted">Margem Necessária</p>
            <p className="text-xl font-bold text-neon-cyan font-mono">
              ${calculation.marginRequired.toFixed(2)}
            </p>
          </div>

          <div className="bg-dark-bg/50 rounded-xl p-4">
            <p className="text-sm text-dark-muted">Valor do Contrato</p>
            <p className="text-xl font-bold text-dark-text font-mono">
              ${calculation.contractValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-dark-bg/50 rounded-xl p-4">
            <p className="text-sm text-dark-muted">Valor por Ponto/Pip</p>
            <p className="text-xl font-bold text-green-400 font-mono">
              ${calculation.pipValue.toFixed(2)}
            </p>
          </div>

          <div className="bg-dark-bg/50 rounded-xl p-4">
            <p className="text-sm text-dark-muted">Risco (%)</p>
            <p className={`text-xl font-bold font-mono ${riskLevel.color}`}>
              {calculation.riskPercentage.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-4 border border-red-500/30">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <p className="text-sm font-medium text-orange-400">Zona de Perigo</p>
          </div>
          <p className="text-sm text-dark-muted mb-2">
            Movimento máximo contra: <span className="text-orange-400 font-mono">{calculation.maxMovement > 0 ? calculation.maxMovement.toFixed(0) : 'N/A'} pips/pontos</span>
          </p>
          <p className="text-sm text-dark-muted">
            Preço de Stop Out: <span className="text-red-400 font-mono">${calculation.stopOutPrice > 0 ? calculation.stopOutPrice.toLocaleString('en-US', getPriceFormatOptions(formData.asset)) : 'N/A'}</span>
          </p>
        </div>

        <Button 
          className="w-full" 
          variant="primary" 
          onClick={handleSaveSimulation}
          loading={isSaving}
          disabled={isSaving}
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Simulação
        </Button>
      </Card>
    </div>
  );
};
