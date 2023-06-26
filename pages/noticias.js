import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import React from "react";
import { Table } from "react-bootstrap";

const noticias = ({ proposicoes }) => {
  return (
    <Pagina>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sigla Tipo</th>
            <th>Ementa</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {proposicoes.map((item) => (
            <tr key={item.id}>
              <td>{item.siglaTipo}</td>
              <td>{item.ementa}</td>
              <td>{item.ano}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
};

export default noticias;

export async function getServerSideProps(context) {
  const resultado = await apiDeputados.get("/proposicoes/?itens=100");
  const proposicoes = resultado.data.dados
  proposicoes.sort((a, b) => new Date(b.ano) - new Date(a.ano));

  return {
    props: { proposicoes },
  };
}
