import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarComponent() {
  return (
    <Navbar bg='primary' variant='dark' expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-white text-decoration-none">
            <img 
              src="/icons8-casa-24.png" 
              alt="Logo" 
              width="25" 
              height="25"
            />
          </Link>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>
              <Link to="/create" className="text-light text-decoration-none">
                Adicionar
              </Link>
            </Nav.Link>
            
            <Nav.Link>
              <Link to="/list" className="text-light text-decoration-none">
                Lista contas
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link to="/historico" className="text-light text-decoration-none">
                Historico
              </Link>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;