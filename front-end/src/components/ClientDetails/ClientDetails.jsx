import React from "react";
import Voltar from "../Buttons/Voltar.jsx";

export default function ClientDetails({ cliente, setScreen, goBack }) {
  return (
    <div>
      <h2>Detalhes do Cliente</h2>
      <p><strong>Nome:</strong> {cliente.name}</p>
      <p><strong>ID:</strong> {cliente.id}</p>
      <p><strong>Idade:</strong> {cliente.age}</p>
      <p><strong>Contato:</strong> {cliente.contact}</p>
      <p><strong>Idade:</strong> {cliente.address}</p>
      <p><strong>E-Mail:</strong> {cliente.email}</p>
      <p><strong>Plano:</strong> {cliente.plan_type}</p>
      <p><strong>Frequência:</strong> {cliente.plan_frequency}</p>
      <p><strong>Data de Inicio:</strong> {cliente.plan_start_date}</p>
      <p><strong>Data de Termino:</strong> {cliente.plan_end_date}</p>
      <p><strong>Status do Plano:</strong> {cliente.plan_status}</p>
      <p><strong>Entradas na Semana:</strong> {cliente.weekly_entries}</p>
      <p><strong>Foto:</strong> {cliente.photo}</p>
      <p><strong>Cliente desde:</strong> {cliente.created_at}</p>

      {/* Renderize outras informações do cliente aqui */}
      <Voltar setScreen={setScreen} goBack={goBack} />
    </div>
  );
}

