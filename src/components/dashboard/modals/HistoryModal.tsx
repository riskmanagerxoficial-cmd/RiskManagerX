import React, { useState, useEffect } from 'react';
import { Modal } from '../../ui/Modal';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase, Database } from '../../../lib/supabase';
import { Loader2, ServerCrash, RefreshCw } from 'lucide-react';
import { useDashboard } from '../../../contexts/DashboardContext';
import { useToast } from '../../../contexts/ToastContext';

type Simulation = Database['public']['Tables']['simulations']['Row'];

export const HistoryModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { setFormData } = useDashboard();
  const toast = useToast();
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      const fetchHistory = async () => {
        setLoading(true);
        setError(null);
        try {
          const { data, error } = await supabase
            .from('simulations')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(20);

          if (error) throw error;
          setSimulations(data || []);
        } catch (err: any) {
          setError('Falha ao carregar o histórico. Tente novamente.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    }
  }, [isOpen, user]);

  const handleReloadSimulation = (sim: Simulation) => {
    setFormData({
      asset: sim.asset,
      currentPrice: sim.current_price,
      lotSize: sim.lot_size,
      leverage: sim.leverage,
      accountBalance: sim.account_balance,
      stopOutLevel: 20, // Defaulting as it's not saved
    });
    toast.info('Simulação recarregada na calculadora.');
    onClose();
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-dark-muted">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p>Carregando histórico...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-red-400">
          <ServerCrash className="w-8 h-8 mb-4" />
          <p>{error}</p>
        </div>
      );
    }

    if (simulations.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-dark-muted">
          <p>Nenhuma simulação salva ainda.</p>
        </div>
      );
    }

    return (
      <div className="max-h-96 overflow-y-auto pr-2">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-dark-muted uppercase bg-dark-bg/50">
            <tr>
              <th scope="col" className="px-4 py-3">Ativo</th>
              <th scope="col" className="px-4 py-3">Lote</th>
              <th scope="col" className="px-4 py-3">Risco %</th>
              <th scope="col" className="px-4 py-3">Data</th>
              <th scope="col" className="px-4 py-3">Ação</th>
            </tr>
          </thead>
          <tbody>
            {simulations.map((sim) => (
              <tr key={sim.id} className="border-b border-dark-border hover:bg-dark-card">
                <td className="px-4 py-3 font-medium text-dark-text">{sim.asset}</td>
                <td className="px-4 py-3 text-dark-muted font-mono">{sim.lot_size}</td>
                <td className="px-4 py-3 text-dark-muted font-mono">{sim.risk_percentage.toFixed(2)}%</td>
                <td className="px-4 py-3 text-dark-muted">{new Date(sim.created_at).toLocaleDateString('pt-BR')}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleReloadSimulation(sim)} className="text-neon-cyan hover:text-neon-blue">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Histórico de Simulações" size="xl">
      {renderContent()}
    </Modal>
  );
};
