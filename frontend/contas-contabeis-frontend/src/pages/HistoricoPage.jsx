import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Spinner } from 'react-bootstrap';
import { historicoAPI } from '../services/api';

function HistoricoPage() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistorico();
  }, []);

  const loadHistorico = async () => {
    try {
      setLoading(true);
      const response = await historicoAPI.getAll();
      setHistorico(response.data);
    } catch (error) {
      console.log('Erro ao carregar histórico:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatData = (dataString) => {
    return new Date(dataString).toLocaleString('pt-BR');
  };

  const formatValor = (valor) => {
    if (!valor) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const getOperacaoVariant = (operacao) => {
    const variants = {
      'CRIACAO': 'success',
      'ALTERACAO': 'warning',
      'EXCLUSAO': 'danger'
    };
    return variants[operacao] || 'secondary';
  };

  if (loading) {
    return (
      <Container className='mt-4 text-center'>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className='mt-4'>
      <h1 className='mb-4'>Histórico de Movimentações</h1>

      {historico.length === 0 ? (
        <div className="text-center">Nenhuma movimentação encontrada.</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Data</th>
              <th>Conta</th>
              <th>Operação</th>
              <th>Descrição</th>
              <th>Valor Anterior</th>
              <th>Valor Novo</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((item) => (
              <tr key={item.id}>
                <td>{formatData(item.dataOperacao)}</td>
                <td>
                  <div>
                    <strong>{item.conta.codigo}</strong>
                    <br />
                    <small>{item.conta.nome}</small>
                  </div>
                </td>
                <td>
                  <Badge bg={getOperacaoVariant(item.operacao)}>
                    {item.operacao}
                  </Badge>
                </td>
                <td>{item.descricao}</td>
                <td>{formatValor(item.valorAnterior)}</td>
                <td>{formatValor(item.valorNovo)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default HistoricoPage;