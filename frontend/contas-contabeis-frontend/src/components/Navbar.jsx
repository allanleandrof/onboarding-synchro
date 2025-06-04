import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // Função para verificar se o link está ativo
  const isActive = (path) => location.pathname === path;

  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Logo/Brand */}
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
          💼 Sistema de Contas Contábeis
        </BootstrapNavbar.Brand>
        
        {/* Toggle para mobile */}
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* Menu de navegação */}
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/create" 
              className={isActive('/create') ? 'active fw-bold' : ''}
            >
              ➕ Criar
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/search" 
              className={isActive('/search') ? 'active fw-bold' : ''}
            >
              🔍 Buscar
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/list" 
              className={isActive('/list') ? 'active fw-bold' : ''}
            >
              📋 Listar
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/update" 
              className={isActive('/update') ? 'active fw-bold' : ''}
            >
              ✏️ Atualizar
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/delete" 
              className={isActive('/delete') ? 'active fw-bold' : ''}
            >
              🗑️ Excluir
            </Nav.Link>
          </Nav>
          
          {/* Info adicional no canto direito */}
          <Nav>
            <Nav.Text className="text-light">
              <small>CRUD Contábil</small>
            </Nav.Text>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;