import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useToast } from '../../contexts/ToastContext';
import { SUPPORTED_SYMBOLS } from '../../services/marketData';

const tradeSchema = z.object({
  asset: z.string().min(1, "Ativo é obrigatório"),
  direction: z.enum(['buy', 'sell'], { errorMap: () => ({ message: "Selecione a direção" }) }),
  lot_size: z.coerce.number().positive("Lote deve ser positivo"),
  entry_price: z.coerce.number().positive("Preço de entrada deve ser positivo"),
  stop_loss: z.coerce.number().optional().nullable(),
  take_profit: z.coerce.number().optional().nullable(),
  result_usd: z.coerce.number(),
  notes: z.string().optional(),
});

type TradeFormData = z.infer<typeof tradeSchema>;

interface AddTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrade: (data: Omit<TradeFormData, 'trade_date'>) => Promise<void>;
}

export const AddTradeModal: React.FC<AddTradeModalProps> = ({ isOpen, onClose, onAddTrade }) => {
  const toast = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<TradeFormData>({
    resolver: zodResolver(tradeSchema),
  });

  const onSubmit = async (data: TradeFormData) => {
    try {
      await onAddTrade(data);
      toast.success('Operação registrada com sucesso!');
      reset();
      onClose();
    } catch (error) {
      toast.error('Falha ao registrar operação.');
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Nova Operação">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">Ativo</label>
            <select
              {...register('asset')}
              className="w-full px-4 py-2.5 bg-dark-card border border-dark-border rounded-xl text-dark-text focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue"
            >
              {SUPPORTED_SYMBOLS.map(symbol => (
                <option key={symbol} value={symbol}>{symbol}</option>
              ))}
            </select>
            {errors.asset && <p className="text-red-500 text-xs mt-1">{errors.asset.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">Direção</label>
            <select
              {...register('direction')}
              className="w-full px-4 py-2.5 bg-dark-card border border-dark-border rounded-xl text-dark-text focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue"
            >
              <option value="">Selecione...</option>
              <option value="buy">Compra (Buy)</option>
              <option value="sell">Venda (Sell)</option>
            </select>
            {errors.direction && <p className="text-red-500 text-xs mt-1">{errors.direction.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Tamanho do Lote" type="number" step="0.01" {...register('lot_size')} error={errors.lot_size?.message} />
          <Input label="Preço de Entrada" type="number" step="any" {...register('entry_price')} error={errors.entry_price?.message} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Stop Loss (Opcional)" type="number" step="any" {...register('stop_loss')} error={errors.stop_loss?.message} />
          <Input label="Take Profit (Opcional)" type="number" step="any" {...register('take_profit')} error={errors.take_profit?.message} />
        </div>
        <Input label="Resultado (USD)" type="number" step="any" {...register('result_usd')} error={errors.result_usd?.message} />
        <div>
          <label className="block text-sm font-medium text-dark-text mb-2">Notas (Opcional)</label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full px-4 py-2.5 bg-dark-card border border-dark-border rounded-xl text-dark-text focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue"
            placeholder="Ex: Notícia importante, motivo da entrada..."
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>Salvar Operação</Button>
        </div>
      </form>
    </Modal>
  );
};
