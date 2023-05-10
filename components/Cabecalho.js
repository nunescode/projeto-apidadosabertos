import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'

import "bootstrap/dist/css/bootstrap.min.css";

const Cabecalho = () => {
  return (
    <>
    <Navbar bg="success" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Pagina Inicial</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/deputados">Deputados</Nav.Link>
            <Nav.Link href="/deputados">Detalhes</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Buscar" className="me-2" aria-label="Buscar"/>
              <Button variant="primary">Buscar</Button>
            </Form>
        </Container>
      </Navbar>
    </>
  )
}

export default Cabecalho