import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import Link from "next/link";
import React, { useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';


import styles from "../../styles/index.module.css";

const Principal = ({
  deputadosDF,
  deputadosGO,
  deputadosMT,
  deputadosMS,
  somaTotalDespesasDF,
  somaTotalDespesasGO,
  somaTotalDespesasMT,
  somaTotalDespesasMS,
}) => {
  const [mesAno, setMesAno] = useState("");

  const handleMesAnoChange = (event) => {
    setMesAno(event.target.value);
  };

  const filtrarDeputadosDespesasAltas = (deputados) => {
    if (!mesAno) {
      return deputados;
    }

    const [mes, ano] = mesAno.split("-");

    const deputadosFiltrados = deputados
      .map((deputado) => ({
        ...deputado,
        despesasFiltradas: deputado.despesas?.filter((despesa) => {
          const [despesaMes, despesaAno] = despesa.dataDocumento.split("-");
          return despesaMes === mes && despesaAno === ano;
        }),
      }))
      .filter((deputado) => deputado.despesasFiltradas.length > 0)
      .map((deputado) => ({
        ...deputado,
        totalDespesasFiltradas: deputado.despesasFiltradas.reduce(
          (acumulador, despesa) =>
            acumulador + parseFloat(despesa.valorDocumento),
          0
        ),
      }));

    return deputadosFiltrados.sort(
      (a, b) => b.totalDespesasFiltradas - a.totalDespesasFiltradas
    );
  };

  
  return (
    <>
      <Pagina>
    
        <h2>
          <strong>Soma total das despesas dos deputados do DF: </strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(somaTotalDespesasDF)}
        </h2>
        <div>
          <h2>Selecione o mês e ano:</h2>
          <input type="month" value={mesAno} onChange={handleMesAnoChange} />
        </div>
        <Row md={4}>
          {filtrarDeputadosDespesasAltas(deputadosDF.deputados).map((item) => (
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
                    <strong>Total de despesas no período selecionado: </strong>
                    {item.totalDespesasFiltradas?.toLocaleString("pt-BR", {
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
        <h2>
          <strong>Soma total das despesas dos deputados de Goiás: </strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(somaTotalDespesasGO)}
        </h2>
        <Row md={4}>
          {filtrarDeputadosDespesasAltas(deputadosGO).map((item) => (
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
                    <strong>Total de despesas no período selecionado: </strong>
                    {item.totalDespesasFiltradas?.toLocaleString("pt-BR", {
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
        <h2>
          <strong>
            Soma total das despesas dos deputados do Mato Grosso:{" "}
          </strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(somaTotalDespesasMT)}
        </h2>
        <Row md={4}>
          {filtrarDeputadosDespesasAltas(deputadosMT).map((item) => (
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
                    <strong>Total de despesas no período selecionado: </strong>
                    {item.totalDespesasFiltradas?.toLocaleString("pt-BR", {
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
        <h2>
          <strong>
            Soma total das despesas dos deputados de Mato Grosso do Sul:{" "}
          </strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(somaTotalDespesasMS)}
        </h2>
        <Row md={4}>
          {filtrarDeputadosDespesasAltas(deputadosMS).map((item) => (
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
                    <strong>Total de despesas no período selecionado: </strong>
                    {item.totalDespesasFiltradas?.toLocaleString("pt-BR", {
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

export async function getServerSideProps(context) {
  const resultadoDF = await apiDeputados.get("/deputados/?siglaUf=DF");
  const deputadosDF = resultadoDF.data.dados;

  const deputadosComDespesasDF = await Promise.all(
    deputadosDF.map(async (item) => {
      const despesasResult = await apiDeputados.get(
        `/deputados/${item.id}/despesas?itens=100`
      );
      const despesas = despesasResult.data.dados;

      return {
        ...item,
        despesas,
        totalDespesas: despesas.reduce(
          (acumulador, despesa) =>
            acumulador + parseFloat(despesa.valorDocumento),
          0
        ),
      };
    })
  );

  const somaTotalDespesasDF = deputadosComDespesasDF.reduce(
    (acumulador, deputado) => acumulador + deputado.totalDespesas,
    0
  );

  const resultadoGO = await apiDeputados.get("/deputados/?siglaUf=GO");
  const deputadosGO = resultadoGO.data.dados;

  const deputadosComDespesasGO = await Promise.all(
    deputadosGO.map(async (item) => {
      const despesasResult = await apiDeputados.get(
        `/deputados/${item.id}/despesas?itens=100`
      );
      const despesas = despesasResult.data.dados;

      return {
        ...item,
        despesas,
        totalDespesas: despesas.reduce(
          (acumulador, despesa) =>
            acumulador + parseFloat(despesa.valorDocumento),
          0
        ),
      };
    })
  );

  const somaTotalDespesasGO = deputadosComDespesasGO.reduce(
    (acumulador, deputado) => acumulador + deputado.totalDespesas,
    0
  );

  const resultadoMT = await apiDeputados.get("/deputados/?siglaUf=MT");
  const deputadosMT = resultadoMT.data.dados;

  const deputadosComDespesasMT = await Promise.all(
    deputadosMT.map(async (item) => {
      const despesasResult = await apiDeputados.get(
        `/deputados/${item.id}/despesas?itens=100`
      );
      const despesas = despesasResult.data.dados;

      return {
        ...item,
        despesas,
        totalDespesas: despesas.reduce(
          (acumulador, despesa) =>
            acumulador + parseFloat(despesa.valorDocumento),
          0
        ),
      };
    })
  );

  const somaTotalDespesasMT = deputadosComDespesasMT.reduce(
    (acumulador, deputado) => acumulador + deputado.totalDespesas,
    0
  );

  const resultadoMS = await apiDeputados.get("/deputados/?siglaUf=MS");
  const deputadosMS = resultadoMS.data.dados;

  const deputadosComDespesasMS = await Promise.all(
    deputadosMS.map(async (item) => {
      const despesasResult = await apiDeputados.get(
        `/deputados/${item.id}/despesas?itens=100`
      );
      const despesas = despesasResult.data.dados;

      return {
        ...item,
        despesas,
        totalDespesas: despesas.reduce(
          (acumulador, despesa) =>
            acumulador + parseFloat(despesa.valorDocumento),
          0
        ),
      };
    })
  );

  const somaTotalDespesasMS = deputadosComDespesasMS.reduce(
    (acumulador, deputado) => acumulador + deputado.totalDespesas,
    0
  );

  return {
    props: {
      deputadosDF: {
        deputados: deputadosComDespesasDF,
      },
      deputadosGO: deputadosComDespesasGO,
      deputadosMT: deputadosComDespesasMT,
      deputadosMS: deputadosComDespesasMS,
      somaTotalDespesasDF,
      somaTotalDespesasGO,
      somaTotalDespesasMT,
      somaTotalDespesasMS,
    },
  };
}

export default Principal;
