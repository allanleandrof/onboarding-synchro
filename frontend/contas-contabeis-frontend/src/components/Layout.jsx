import React from 'react';
import { Container } from 'react-bootstrap';
import NavbarComponent from './Navbar';

function Layout({ children }) {
  return (
    <div>
      {/* Navbar */}
      <NavbarComponent />
      
      <Container className="py-4">
        {children}
      </Container>
      
      <footer className="bg-light text-center py-3 mt-5">
        <small className="text-muted">
         © 2025 Sistema de gerenciamento  |  Synchro Soluções fiscais
        </small>
      </footer>
    </div>
  );
}

export default Layout;