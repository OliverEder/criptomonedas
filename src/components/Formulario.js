import React ,{useState, useEffect}from 'react';
import styled from "@emotion/styled";
import propTypes from 'prop-types';
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from 'axios';

import Error from "./Error";

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color: #fff;
    &h:hover{
        background-color:#326ac0;
        cursor: pointer;
        transform:background-color .3s ease;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //state del listado de criptomonedas
    const [ listacripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
       {codigo: "USD", nombre: "Dolar de Estados Unidos"},
       {codigo: "MXN", nombre: "Peso Mexicano"},
       {codigo: "EUR", nombre: "Euro"},
       {codigo: "GBP", nombre: "Libra Esterlina"},

    ]
    //utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", MONEDAS); 
    //utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda("Elige tu Criptomoneda", "",listacripto);

    //ejecutar llamado a la API
    useEffect(()=>{
        const consultarAPI = async () =>{
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    const cotizarMoneda = e =>{
        e.preventDefault();

        if(moneda === "" || criptomoneda === ""){
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return (  
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMonedas />
            <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}

Formulario.propTypes = {
    guardarMoneda : propTypes.func.isRequired,
    guardarCriptomoneda : propTypes.func.isRequired
}

export default Formulario;