import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import Link from "next/link";
import React, { useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";

import styles from "../../styles/index.module.css";

const Principal = ({ deputados, somaTotalDespesas }) => {
  return (
    <>
      <Pagina>
        <h2>
          <strong>Soma total das despesas dos deputados do DF: </strong>
          {somaTotalDespesas.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h2>
        <Row md={4}>
          {deputados.map((item) => (
            <Col key={item.id} className={styles.colum}>
              <Card className={styles.meucard}>
                <Card.Header className={styles.header}>
                  <Image
                    variant="top"
                    className={styles.photo}
                    src={item.urlFoto}
                  />
                </Card.Header>
                <Card.Body>
                  <Card.Title className={styles.meutitle}>
                    <strong>{item.nome}</strong>
                  </Card.Title>
                  <p className={styles.meupartido}>
                    <strong>Partido: </strong>
                    {item.siglaPartido}
                  </p>
                  <p className={styles.meuuf}>
                    <strong>UF: </strong>
                    {item.siglaUf}
                  </p>
                  <p>
                    <strong>Total de despesas: </strong>
                    {item.totalDespesas.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <Link
                    className="btn btn-primary"
                    href={"/deputados/" + item.id}
                  >
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

export default Principal;

export async function getServerSideProps(context) {
  const resultado = await apiDeputados.get("/deputados/?siglaUf=DF");
  const deputados = resultado.data.dados;

  const deputadosComDespesas = await Promise.all(
    deputados.map(async (item) => {
      const despesasResult = await apiDeputados.get(
        `/deputados/${item.id}/despesas`
      );
      const despesas = despesasResult.data.dados;
      const totalDespesas = despesas.reduce(
        (acumulador, despesa) =>
          acumulador + parseFloat(despesa.valorDocumento),
        0
      );

      return {
        ...item,
        totalDespesas,
      };
    })
  );

  const somaTotalDespesas = deputadosComDespesas.reduce(
    (acumulador, deputado) => acumulador + deputado.totalDespesas,
    0
  );

  return {
    props: { deputados: deputadosComDespesas, somaTotalDespesas },
  };
}
