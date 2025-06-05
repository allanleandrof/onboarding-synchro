import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="text-center">
      <h1 className="mb-4">Sistema CRUD de Contas Contábeis</h1>
      <p className="lead mb-5">Gerencie suas contas contábeis de forma simples</p>
      
      <Row>
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <div style={{ fontSize: '3rem' }}>➕</div>
              <Card.Title>Criar</Card.Title>
              <Card.Text>Cadastrar nova conta</Card.Text>
              <Link to="/create" className="btn btn-primary">Acessar</Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <div style={{ fontSize: '3rem' }}>🔍</div>
              <Card.Title>Buscar</Card.Title>
              <Card.Text>Encontrar por ID</Card.Text>
              <Link to="/search" className="btn btn-outline-primary">Acessar</Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <div style={{ fontSize: '3rem' }}>📋</div>
              <Card.Title>Listar</Card.Title>
              <Card.Text>Ver todas as contas</Card.Text>
              <Link to="/list" className="btn btn-outline-primary">Acessar</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;