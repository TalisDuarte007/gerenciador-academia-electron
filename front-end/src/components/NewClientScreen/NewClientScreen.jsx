import React from "react";

const NewClientScreen = ({ goBack }) => {
  const handleSave = (e) => {
    e.preventDefault();
    console.log("Cliente salvo!");
    goBack(); // Voltar à tela principal após salvar
  };

  

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Adicionar Novo Cliente</h2>
      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder="Nome" required />
        <input type="text" placeholder="Age" required />
        <input type="email" placeholder="Email" required />
        <input type="tel" placeholder="Telefone" required />
        <input type="text" placeholder="Adress" required />
        <input type="text" placeholder="Plan Type" required />
        <button type="submit">Salvar</button>
        <button type="button" onClick={goBack}>
          Voltar
        </button>
      </form>
    </div>
  );
};

export default NewClientScreen;
