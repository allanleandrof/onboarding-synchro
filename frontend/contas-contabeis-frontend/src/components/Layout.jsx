import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar fixa no topo */}
      <Navbar />
      
      {/* Conteúdo principal - flex-grow para ocupar espaço disponível */}
      <main className="flex-grow-1">
        <Container className="py-4">
          {children}
        </Container>
      </main>
      
      {/* Footer fixo no bottom */}
      <footer className="bg-light border-top py-3 mt-auto">
        <Container>
          <div className="row align-items-center">
            <div className="col-md-6">
              <small className="text-muted">
                © 2024 Sistema CRUD de Contas Contábeis
              </small>
            </div>
            <div className="col-md-6 text-md-end">
              <small className="text-muted">
                React + Spring Boot + Bootstrap
              </small>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default Layout;