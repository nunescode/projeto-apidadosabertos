import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'

import styles from '../styles/Cabecalho.module.css'

import "bootstrap/dist/css/bootstrap.min.css";



const Cabecalho = () => {
  return (
    <>
    <Navbar className={styles.mynavbar} bg="success" variant="dark">
        <Container>
          <Navbar.Brand className={styles.mynavbrand} href="#home">Pagina Inicial</Navbar.Brand>
          <Nav className={styles.mynav}>
            <Nav.Link className={styles.mylink} href="/deputados">Deputados</Nav.Link>
            <Nav.Link className={styles.mylink} href="/deputados">Detalhes</Nav.Link>
          </Nav>
          <Form className={styles.myform}>
            <Form.Control className={styles.mysearch} type="search" placeholder="Buscar" aria-label="Buscar"/>
              <Button className={styles.mybutton}>Buscar</Button>
            </Form>
        </Container>
      </Navbar>
    </>
  )
}

export default Cabecalho