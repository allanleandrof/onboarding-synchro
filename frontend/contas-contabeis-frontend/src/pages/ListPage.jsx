import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Badge, Spinner, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { contaAPI } from '../services/api';

function ListPage() {
  const [contas, setContas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    status: 'todas', // 'todas', 'ativas', 'inativas'
    codigo: ''
  });

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
        loadContas();
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

  // Filtrar contas
  const contasFiltradas = contas.filter(conta => {
    const filtroStatus = filtros.status === 'todas' || 
                        (filtros.status === 'ativas' && conta.ativo) ||
                        (filtros.status === 'inativas' && !conta.ativo);
    
    const filtroCodigo = filtros.codigo === '' || 
                        conta.codigo.toLowerCase().includes(filtros.codigo.toLowerCase());
    
    return filtroStatus && filtroCodigo;
  });

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const limparFiltros = () => {
    setFiltros({
      status: 'todas',
      codigo: ''
    });
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
        <Button variant='success' href='/criar'>
          Nova Conta
        </Button>
      </div>

      {/* Filtros */}
      <div className='mb-4 p-3 bg-light rounded'>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select 
                value={filtros.status}
                onChange={(e) => handleFiltroChange('status', e.target.value)}
              >
                <option value="todas">Todas</option>
                <option value="ativas">Apenas Ativas</option>
                <option value="inativas">Apenas Inativas</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Filtrar por código..."
                value={filtros.codigo}
                onChange={(e) => handleFiltroChange('codigo', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4} className='d-flex align-items-end'>
            <Button 
              variant="outline-secondary" 
              onClick={limparFiltros}
              disabled={filtros.status === 'todas' && filtros.codigo === ''}
            >
              Limpar Filtros
            </Button>
          </Col>
        </Row>
        <small className='text-muted'>
          Mostrando {contasFiltradas.length} de {contas.length} contas
        </small>
      </div>

      {contasFiltradas.length === 0 ? (
        <Alert variant='info'>
          {contas.length === 0 
            ? <>Nenhuma conta cadastrada. <a href='/criar'>Criar primeira conta</a></>
            : 'Nenhuma conta encontrada com os filtros aplicados.'
          }
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
            {contasFiltradas.map((conta) => (
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
                    as={Link}
                    to={`/editar/${conta.id}`}
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