import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Badge, Spinner } from 'react-bootstrap';
import { contaAPI } from '../services/api';

function ListPage() {
  const [contas, setContas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContas();
  }, []);

  const loadContas = async () => {
    try {
      setLoading(true);
      const response = await contaAPI.getAll();
      setContas(response.data);
    } catch (error) {
      console.log('Erro ao carregar contas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta conta?')) {
      try {
        await contaAPI.delete(id);
        console.log('Conta excluída com sucesso!');
        loadContas(); // Recarrega a lista
      } catch (error) {
        console.log('Erro ao excluir conta:', error);
      }
    }
  };

  const formatSaldo = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const getTipoVariant = (tipo) => {
    const variants = {
      'ATIVO': 'primary',
      'PASSIVO': 'warning',
      'RECEITA': 'success',
      'DESPESA': 'danger'
    };
    return variants[tipo] || 'secondary';
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
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1>Lista de Contas</h1>
        <Button variant='success' href='/create'>
          Nova Conta
        </Button>
      </div>

      {contas.length === 0 ? (
        <Alert variant='info'>
          Nenhuma conta cadastrada. <a href='/create'>Criar primeira conta</a>
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Saldo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {contas.map((conta) => (
              <tr key={conta.id}>
                <td>{conta.codigo}</td>
                <td>{conta.nome}</td>
                <td>
                  <Badge bg={getTipoVariant(conta.tipo)}>
                    {conta.tipo}
                  </Badge>
                </td>
                <td>{formatSaldo(conta.saldo)}</td>
                <td>
                  <Badge bg={conta.ativo ? 'success' : 'secondary'}>
                    {conta.ativo ? 'Ativa' : 'Inativa'}
                  </Badge>
                </td>
                <td>
                  <Button 
                    variant='outline-primary' 
                    size='sm' 
                    className='me-2'
                    href={`/editar/${conta.id}`}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant='outline-danger' 
                    size='sm'
                    onClick={() => handleDelete(conta.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ListPage;