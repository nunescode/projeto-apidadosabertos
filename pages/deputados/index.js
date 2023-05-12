import React from "react";
import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import styles from "../../styles/index.module.css";
import Link from "next/link";
import { Card, Col, Row, CardHeader, Image, Carousel } from "react-bootstrap";

const index = ({ deputados }) => {
  return (
    <>
      <Pagina titulo="Lista de deputados">
        <Row md={4}>
          {deputados.map((item) => (
            <Col key={item.id} className={styles.colum}>
              <Card className={styles.meucard}>
                <Card.Header className={styles.header}>
                  <Image variant="top" className={styles.photo} src={item.urlFoto} />
                </Card.Header>
                <Card.Body>
                  <Card.Title className={styles.meutitle} >
                    <strong>{item.nome}</strong>
                  </Card.Title>
                  <p className={styles.meupartido} >
                    <strong>Partido: </strong>
                    {item.siglaPartido}
                  </p>
                  <p className={styles.meuuf} >
                    <strong>UF: </strong>
                    {item.siglaUf}
                  </p>
                  <Link className="btn btn-primary" href={"/deputados/" + item.id}>
                    Detalhes
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Pagina>
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  const resultado = await apiDeputados.get("/deputados/");
  const deputados = resultado.data.dados;

  return {
    props: { deputados },
  };
}
