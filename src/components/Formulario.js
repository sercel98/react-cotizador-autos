import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  obtenerDireferenciaAnios,
  calcularIncrementoMarca,
  calcularIncrementoPlan,
} from "../helper";
import PropTypes from "prop-types";

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;

const Radio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({ guardarResumen, cambiarCargando }) => {
  const [datos, guardarDatos] = useState({
    marca: "",
    anio: "",
    plan: "",
  });

  const [error, guardarError] = useState(false);

  const { marca, anio, plan } = datos;

  const obtenerInfoFormulario = (e) => {
    guardarDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const cotizarSeguro = (e) => {
    e.preventDefault();

    if (marca.trim() === "" || anio.trim() === "" || plan.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);

    let resultado = 2000;
    const diferencia = obtenerDireferenciaAnios(anio);

    resultado -= diferencia * 0.03 * resultado;
    resultado = resultado * calcularIncrementoMarca(marca);
    resultado = resultado * calcularIncrementoPlan(plan);

    resultado = resultado.toFixed(2);

    cambiarCargando(true);

    setTimeout(() => {
      cambiarCargando(false);
      guardarResumen({
        cotizacion: Number(resultado),
        datos,
      });
    }, 2000);
  };

  return (
    <form onSubmit={cotizarSeguro}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <Campo>
        <Label>Marca</Label>
        <Select name="marca" value={marca} onChange={obtenerInfoFormulario}>
          <option value="">Seleccione</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Año</Label>
        <Select name="anio" value={anio} onChange={obtenerInfoFormulario}>
          <option value="">Seleccione</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <Radio
          checked={plan === "basico"}
          type="radio"
          name="plan"
          value="basico"
          onChange={obtenerInfoFormulario}
        />
        Básico
        <Radio
          checked={plan === "completo"}
          type="radio"
          name="plan"
          value="completo"
          onChange={obtenerInfoFormulario}
        />
        Completo
      </Campo>

      <Boton type="submit">Completar</Boton>
    </form>
  );
};

Formulario.propTypes = {
  guardarResumen: PropTypes.func.isRequired,
  cambiarCargando: PropTypes.func.isRequired,
};
export default Formulario;
