import React from 'react';
import { Container } from 'react-bootstrap';
import NavbarComponent from './Navbar';

function Layout({ children }) {
  return (
    <div>
      {/* Navbar */}
      <NavbarComponent />
      
      {/* Conteúdo principal */}
      <Container className="py-4">
        {children}
      </Container>
      
      {/* Footer simples */}
      <footer className="bg-light text-center py-3 mt-5">
        <small className="text-muted">
          Sistema CRUD de Contas Contábeis - React + Spring Boot
        </small>
      </footer>
    </div>
  );
}

export default Layout;