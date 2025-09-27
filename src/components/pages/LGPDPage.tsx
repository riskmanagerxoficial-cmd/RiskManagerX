import React from 'react';
import { GenericPageLayout } from './GenericPageLayout';

export const LGPDPage: React.FC = () => {
  return (
    <GenericPageLayout title="Conformidade com a LGPD">
      <p>O <strong>RiskManagerX</strong> está comprometido em proteger seus dados pessoais e em cumprir com a Lei Geral de Proteção de Dados (LGPD) do Brasil.</p>
      
      <h2>Seus Direitos</h2>
      <p>De acordo com a LGPD, você tem o direito de:</p>
      <ul>
        <li>Confirmar a existência de tratamento de seus dados.</li>
        <li>Acessar seus dados.</li>
        <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
        <li>Anonimização, bloqueio ou eliminação de dados desnecessários.</li>
        <li>Portabilidade dos dados a outro fornecedor de serviço.</li>
        <li>Eliminação dos dados pessoais tratados com o consentimento do titular.</li>
        <li>Informação sobre o compartilhamento de seus dados.</li>
      </ul>
      
      <h2>Como Exercer Seus Direitos</h2>
      <p>Para exercer qualquer um dos seus direitos sob a LGPD, entre em contato conosco através do e-mail <a href="mailto:privacidade@riskmanagerx.com">privacidade@riskmanagerx.com</a>. Para mais detalhes sobre como tratamos seus dados, consulte nossa <a href="/privacy-policy">Política de Privacidade</a>.</p>
    </GenericPageLayout>
  );
};
