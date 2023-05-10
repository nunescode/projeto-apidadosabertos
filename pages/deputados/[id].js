import Pagina from '@/components/Pagina'
import apiDeputados from '@/services/apiDeputados'
import React from 'react'
import { Alert, Card, Table } from 'react-bootstrap'

import styles from '../../styles/[id].module.css'

const Detalhes = ({ deputadoDt, despesas }) => {
  return (
    <>
    <Pagina titulo='Detalhes do Deputado'>
      <Card className={styles.detalhescard} border="success">
        <Card.Header className='bg-success text-white text-center p-2'><h3><strong>{deputadoDt.ultimoStatus.nome}</strong></h3></Card.Header>
          <Card.Img variant="top" src={deputadoDt.ultimoStatus.urlFoto} />
            <Card.Body>
            <Card.Title className={styles.textcard}><strong>Informações</strong></Card.Title>
            <br></br>
              <Card.Text className={styles.textcard}><strong>Email: </strong>{deputadoDt.ultimoStatus.gabinete.email}</Card.Text>
              <Card.Text className={styles.textcard}><strong>Data de nascimento: </strong>{new Date (deputadoDt.dataNascimento).toLocaleDateString('pt-BR')}</Card.Text>
              <Card.Text className={styles.textcard}><strong>Telefone: </strong>{deputadoDt.ultimoStatus.gabinete.telefone}</Card.Text>
              <Card.Text className={styles.textcard}><strong>Situação: </strong>{deputadoDt.ultimoStatus.situacao}</Card.Text>
            </Card.Body>
      </Card> 
      <br></br>

      <Alert className={styles.textalert}>
          <h2><strong>Gastos</strong></h2>
        </Alert>

      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='text-center'>Data</th>
              <th className='text-center'>Descrição</th>
                <th className='text-center'>Valor</th>
                  </tr>
                    </thead>
                      <tbody>
                        {despesas.map(item => (
                          <tr key={item.id}>
                            <td className='text-center'>{new Date(item.dataDocumento).toLocaleDateString('pt-BR')}</td>
                              <td className='text-center'>{item.tipoDespesa}</td>
                              <td className='text-center'>{item.valorDocumento.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                            </tr>
                          ))}
                     </tbody>
            </Table>
    </Pagina>
    </>
  )
}

export default Detalhes

export async function getServerSideProps(context) {
  
  const id = context.params.id

  const resultado = await apiDeputados.get('/deputados/' + id)
  const deputadoDt = resultado.data.dados

  const resDespesas = await apiDeputados.get('/deputados/' + id + '/despesas/')
  const despesas = resDespesas.data.dados


  return {
      props: { deputadoDt, despesas },
  }
}