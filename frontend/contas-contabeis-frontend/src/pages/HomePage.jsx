import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { contaAPI } from '../services/api';

function HomePage() {
  const [stats, setStats] = useState({
    totalContas: 0,
    contasAtivas: 0,
    totalAtivos: 0,
    totalPassivos: 0,
    totalReceitas: 0,
    totalDespesas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await contaAPI.getAll();
      const contas = response.data;
      
      const totalContas = contas.length;
      const contasAtivas = contas.filter(c => c.ativo).length;
      const totalAtivos = contas.filter(c => c.tipo === 'ATIVO').reduce((sum, c) => sum + c.saldo, 0);
      const totalPassivos = contas.filter(c => c.tipo === 'PASSIVO').reduce((sum, c) => sum + c.saldo, 0);
      const totalReceitas = contas.filter(c => c.tipo === 'RECEITA').reduce((sum, c) => sum + c.saldo, 0);
      const totalDespesas = contas.filter(c => c.tipo === 'DESPESA').reduce((sum, c) => sum + c.saldo, 0);

      setStats({
        totalContas,
        contasAtivas,
        totalAtivos,
        totalPassivos,
        totalReceitas,
        totalDespesas
      });
    } catch (error) {
      console.log('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return <div className="text-center mt-5">Carregando dashboard...</div>;
  }

  return (
    <div>
      <div className="text-center mb-5">
        <h1>Sistema gerenciador de Contas Contábeis</h1>
        <p className="lead">Resumo geral</p>
      </div>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-primary">
            <Card.Body>
              <h2 className="text-primary">{stats.totalContas}</h2>
              <Card.Title>Total de Contas</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-success">
            <Card.Body>
              <h2 className="text-success">{stats.contasAtivas}</h2>
              <Card.Title>Contas Ativas</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-info">
            <Card.Body>
              <h2 className="text-info">{formatCurrency(stats.totalAtivos)}</h2>
              <Card.Title>Total Ativos</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-warning">
            <Card.Body>
              <h2 className="text-warning">{formatCurrency(stats.totalPassivos)}</h2>
              <Card.Title>Total Passivos</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="text-center border-success">
            <Card.Body>
              <h2 className="text-success">{formatCurrency(stats.totalReceitas)}</h2>
              <Card.Title>Total Receitas</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="text-center border-danger">
            <Card.Body>
              <h2 className="text-danger">{formatCurrency(stats.totalDespesas)}</h2>
              <Card.Title>Total Despesas</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center">
        <h4 className="mb-3">Ações Rápidas</h4>
        <Link to="/create" className="btn btn-primary me-3">
          Nova Conta
        </Link>
        <Link to="/list" className="btn btn-outline-primary">
          Ver Todas
        </Link>
      </div>
    </div>
  );
}

export default HomePage;