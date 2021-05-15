import React from 'react';
import styled from "@emotion/styled";
import propTypes from 'prop-types';

const MesajeError = styled.p`
    background-color: #b7322c;
    padding:1rem;
    color: #FFF;
    font-size:30px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: "Bebas Neue", cursive;
`;

const Error = ({mensaje}) => {
    return (  
        <MesajeError>
            {mensaje}
        </MesajeError>
    );
}

Error.propTypes = {
    mensaje : propTypes.string.isRequired
}

export default Error;