import React from 'react'
import Cabecalho from './Cabecalho'
import { Container } from 'react-bootstrap'

const Pagina = (props) => {
    return (
        <>
        <Cabecalho/>
            <Container>{props.children}</Container>
        </>
    )
}

export default Pagina