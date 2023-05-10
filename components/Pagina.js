import React from 'react'
import Cabecalho from './Cabecalho'
import { Container } from 'react-bootstrap'

const Pagina = (props) => {
    return (
        <>
        <Cabecalho/>
            <div className="bg-warning text-white py-2 text-center margin-bottom mb-3">
                <h2><strong>{props.titulo}</strong></h2>
            </div>
            <Container>{props.children}</Container>
        <Container/>
        </>
    )
}

export default Pagina