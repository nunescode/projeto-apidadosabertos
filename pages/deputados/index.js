import React from 'react'

import Pagina from '@/components/Pagina'
import apiDeputados from '@/services/apiDeputados'

import styles from '../../styles/index.module.css'

import Link from 'next/link'
import { Card, Col, Row } from 'react-bootstrap'


const index = ({ deputados }) => {
  return (
    <>
    <Pagina titulo="Lista de deputados">
        <Row md={4}>
                {deputados.map(item => (
                    <Col key={item.id} className={styles.card}>
                        <Card>
                            <Card.Img variant="top" src={item.urlFoto} />
                            <Card.Body>
                                <Card.Title><strong>{item.nome}</strong></Card.Title>
                                <p><strong>Partido: </strong>{item.siglaPartido}</p>
                                <p><strong>UF: </strong>{item.siglaUf}</p>
                            <Link className='btn btn-primary' href={'/deputados/' + item.id}>Detalhes</Link>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </Pagina>
    </>
  )
}

export default index

export async function getServerSideProps(context) {

    const resultado = await apiDeputados.get('/deputados/')
    const deputados = resultado.data.dados

    return {
        props: { deputados },
    }
}