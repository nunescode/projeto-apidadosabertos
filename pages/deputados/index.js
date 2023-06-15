import React, { useState } from "react";
import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import styles from "../../styles/index.module.css";
import buscaStyles from "../../styles/busca.module.css"
import Link from "next/link";
import { Card, Col, Row, Image } from "react-bootstrap";

const Index = ({ deputados }) => {
  const [searchNome, setSearchNome] = useState("");
  const [searchUF, setSearchUF] = useState("");
  const [searchPartido, setSearchPartido] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    const filteredDeputados = deputados.filter((deputado) => {
      const nomeMatch =
        searchNome !== "" &&
        deputado.nome
        .toLowerCase()
        .includes(searchNome.toLowerCase());

      const ufMatch =
        searchUF !== "" &&
        deputado.siglaUf
        .toLowerCase()
        .includes(searchUF.toLowerCase());

      const partidoMatch =
        searchPartido !== "" &&
        deputado.siglaPartido
          .toLowerCase()
          .includes(searchPartido.toLowerCase());

      return nomeMatch || ufMatch || partidoMatch;
    });

    setSearchResults(filteredDeputados);
  };

  const deputadosExibidos =
    searchResults.length > 0 ? searchResults : deputados;

  return (
    <>
      <div className={styles.pageContainer}>
        <Pagina titulo="Lista de deputados">
          <div className={buscaStyles.busca}>
            <form
              className={buscaStyles.searchform}
              onSubmit={handleSearch}
            >
              <input
                className={buscaStyles.searchinput}
                type="text"
                value={searchNome}
                onChange={(e) => setSearchNome(e.target.value)}
                placeholder="Buscar por nome"
              />
              <input
                className={buscaStyles.searchinput}
                type="text"
                value={searchUF}
                onChange={(e) => setSearchUF(e.target.value)}
                placeholder="Buscar por UF"
              />
              <input
                className={buscaStyles.searchinput}
                type="text"
                value={searchPartido}
                onChange={(e) => setSearchPartido(e.target.value)}
                placeholder="Buscar por partido"
              />
              <button className={buscaStyles.searchbutton} type="submit">
                Buscar
              </button>
            </form>
          </div>

          <Row md={4}>
            {deputadosExibidos.map((item) => (
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
      </div>
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const resultado = await apiDeputados.get("/deputados/");
  const deputados = resultado.data.dados;

  return {
    props: { deputados },
  };
}
