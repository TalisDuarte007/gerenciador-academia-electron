import React from "react";

export default function Voltar({ goBack, setScreen }) {
  return (
    <button type="button" onClick={() => setScreen(goBack)}>
      Voltar
    </button>
  );
}
