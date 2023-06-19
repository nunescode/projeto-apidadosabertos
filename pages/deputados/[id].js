import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import React, { useEffect } from "react";
import { Alert, Card, Col, Row } from "react-bootstrap";
import { Chart } from "chart.js";
import "chart.js/dist/chart.min.css";

import styles from "../../styles/[id].module.css";

const Detalhes = ({ deputadoDt, despesas, eventos }) => {
  const calcularTotalDespesas = () => {
    let total = 0;
    despesas.forEach((item) => {
      total += item.valorDocumento;
    });
    return total;
  };

  useEffect(() => {
    // Gráfico de Despesas por Tipo
    const canvasDespesas = document.getElementById("graficoDespesas");
    const ctxDespesas = canvasDespesas.getContext("2d");

    // Obtenha a contagem de despesas por tipo
    const despesasPorTipo = despesas.reduce((acumulador, item) => {
      if (acumulador[item.tipoDespesa]) {
        acumulador[item.tipoDespesa]++;
      } else {
        acumulador[item.tipoDespesa] = 1;
      }
      return acumulador;
    }, {});

    // Crie os arrays de rótulos e dados para o gráfico de despesas
    const labelsDespesas = Object.keys(despesasPorTipo);
    const dataDespesas = Object.values(despesasPorTipo);

    // Configure o gráfico de despesas
    new Chart(ctxDespesas, {
      type: "pie",
      data: {
        labels: labelsDespesas,
        datasets: [
          {
            label: "Despesas por Tipo",
            data: dataDespesas,
            backgroundColor: [
              "#ffcd56",
              "#ff6384",
              "#36a2eb",
              "#fd6b19",
              "#4bc0c0",
              "#9966ff",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Despesas por Tipo",
            position: "start",
          },
        },
      },
    });

    // Gráfico de Eventos
    const canvasEventos = document.getElementById("graficoEventos");
    const ctxEventos = canvasEventos.getContext("2d");

    // Obtenha a contagem de eventos por tipo
    const eventosPorTipo = eventos.reduce((acumulador, item) => {
      if (acumulador[item.descricaoTipo]) {
        acumulador[item.descricaoTipo]++;
      } else {
        acumulador[item.descricaoTipo] = 1;
      }
      return acumulador;
    }, {});

    // Crie os arrays de rótulos e dados para o gráfico de eventos
    const labelsEventos = Object.keys(eventosPorTipo);
    const dataEventos = Object.values(eventosPorTipo);

    // Configure o gráfico de eventos
    new Chart(ctxEventos, {
      type: "doughnut",
      data: {
        labels: labelsEventos,
        datasets: [
          {
            label: "Eventos por Tipo",
            data: dataEventos,
            backgroundColor: [
              "#ffcd56",
              "#ff6384",
              "#36a2eb",
              "#fd6b19",
              "#4bc0c0",
              "#9966ff",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Eventos por Tipo",
            position: "start",
          },
          legend: {
            labels: {
              font: {
                size: 16, // Defina o tamanho do texto das legendas do gráfico de eventos
              },
            },
          },
        },
      },
    });
  }, []);

  return (
    <div>
      <Pagina titulo="Detalhes do Deputado">
        <br />
        <Row>
          <Col md={4}>
            <Card border="success">
              <Card.Header className="bg-success text-white text-center p-2">
                <h2>{deputadoDt.ultimoStatus.nome}</h2>
              </Card.Header>

              <Card.Img
                className={styles.imagemcard}
                variant="top"
                src={deputadoDt.ultimoStatus.urlFoto}
              />
              <Card.Body>
                <Card.Title className={styles.textcard}>
                  <strong>Informações</strong>
                </Card.Title>

                <br />
                <Card.Text className={styles.textcard}>
                  <strong>Email: </strong>
                  {deputadoDt.ultimoStatus.gabinete.email}
                </Card.Text>

                <Card.Text className={styles.textcard}>
                  <strong>Data de nascimento: </strong>
                  {new Date(deputadoDt.dataNascimento).toLocaleDateString(
                    "pt-BR"
                  )}
                </Card.Text>

                <Card.Text className={styles.textcard}>
                  <strong>Telefone: </strong>
                  {deputadoDt.ultimoStatus.gabinete.telefone}
                </Card.Text>

                <Card.Text className={styles.textcard}>
                  <strong>Situação: </strong>
                  {deputadoDt.ultimoStatus.situacao}
                </Card.Text>

                <Card.Text className={styles.textcard}>
                  <strong>Total Despesas: </strong>
                  {calcularTotalDespesas().toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Alert className={styles.textalert}>
              <h3>
                <strong>Despesas do Deputado</strong>
              </h3>
            </Alert>

            <br />

            <div>
              <canvas id="graficoDespesas"></canvas>
            </div>

            <br />
          </Col>
        </Row>
        <br />
        <br />
        <Alert className={styles.textalert}>
          <h3>
            <strong>Eventos do Deputado</strong>
          </h3>
        </Alert>

        <div>
          <canvas id="graficoEventos"></canvas>
        </div>
      </Pagina>
    </div>
  );
};

export default Detalhes;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const resultado = await apiDeputados.get("/deputados/" + id);
  const deputadoDt = resultado.data.dados;

  const resDespesas = await apiDeputados.get("/deputados/" + id + "/despesas/");
  const despesas = resDespesas.data.dados;

  const resEventos = await apiDeputados.get("/deputados/" + id + "/eventos/");
  const eventos = resEventos.data.dados;

  return {
    props: { deputadoDt, despesas, eventos },
  };
}
