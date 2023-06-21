import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import styles from "../../styles/index.module.css";
import dstyles from "../../styles/[id].module.css";
import Chart from "chart.js";

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
  const [gastosEstados, setGastosEstados] = useState({});

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
        despesasFiltradas: deputado.despesas.filter((despesa) => {
          const [despesaMes, despesaAno] = despesa.dataDocumento.split("-");
          return despesaMes === mes && despesaAno === ano;
        }),
      }))
      .filter((deputado) => deputado.despesasFiltradas.length > 0)
      .map((deputado) => ({
        ...deputado,
        totalDespesasFiltradas: deputado.despesasFiltradas.reduce(
          (acumulador, despesa) =>
            acumulador + parseFloat(despesa.valorDocumento), 0
        ),
      }));

    return deputadosFiltrados.sort(
      (a, b) => b.totalDespesasFiltradas - a.totalDespesasFiltradas
    );
  };
  useEffect(() => {
    const calcularGastosEstados = () => {
      const estados = {
        DF: somaTotalDespesasDF,
        GO: somaTotalDespesasGO,
        MT: somaTotalDespesasMT,
        MS: somaTotalDespesasMS,
      };

      setGastosEstados(estados);
    };

    calcularGastosEstados();
  }, [
    somaTotalDespesasDF,
    somaTotalDespesasGO,
    somaTotalDespesasMT,
    somaTotalDespesasMS,
  ]);

  useEffect(() => {
    const renderLineChart = () => {
      const ctx = document.getElementById("lineChart").getContext("2d");
      const labels = ["DF", "GO", "MT", "MS"];
      const data = [
        gastosEstados.DF || 0,
        gastosEstados.GO || 0,
        gastosEstados.MT || 0,
        gastosEstados.MS || 0,
      ];

      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Gastos por Estado",
              data: data,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    renderLineChart();
  }, [gastosEstados]);

  return (
    <>
      <Pagina>
        <div>
          <h2 className={dstyles.textalert}>
            Despesas dos deputados do Centro-Oeste no ano de 2023
          </h2>
          <div className={styles.chartContainer}>
            <canvas id="lineChart"></canvas>
          </div>
          <br />
        </div>
        <div className={dstyles.textalert}>
          <h2>Selecione o Mês:</h2>
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
          <strong>Soma total das despesas dos deputados do DF: </strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(somaTotalDespesasDF)}
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
          <strong>Soma total das despesas dos deputados de Goiás: </strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(somaTotalDespesasGO)}
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
            Soma total das despesas dos deputados do Mato Grosso:{" "}
          </strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(somaTotalDespesasMT)}
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
        <h2>
          <strong>
            Soma total das despesas dos deputados de Mato Grosso do Sul:{" "}
          </strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(somaTotalDespesasMS)}
        </h2>
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
        "/deputados/" + item.id + " /despesas?itens=100"
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
