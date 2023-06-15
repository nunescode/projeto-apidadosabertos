import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

import styles from "../styles/Cabecalho.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

const Cabecalho = () => {
  return (
    <>
      <Navbar className={styles.mynavbar} bg="success" variant="dark">
        <Container className={styles.fullWidth}>
          <Navbar.Brand className={styles.mynavbrand} href="/">
            Pagina Inicial
          </Navbar.Brand>
          <Nav className={styles.mynav}>
            <Nav.Link className={styles.mylink} href="/deputados">
              Deputados{" "}
            </Nav.Link>
            <Nav.Link className={styles.mylink} href="/deputados">
              Detalhes{" "}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Cabecalho;
