import React from "react";

export default function Voltar(props) {
  return (
    <button type="button" onClick={props.goBack}>
      Voltar
    </button>
  );
}
