import React, { useState, useEffect } from "react";
import { fetchClients } from "../../services/dbService.js";
import Voltar from "../Buttons/Voltar.jsx";

export default function ClientList(props) {
  console.log(props);
  const [clients, setClients] = useState([]); // Estado para armazenar os clientes
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        const result = await fetchClients();
        if (Array.isArray(result)) {
          setClients(result);
        } else {
          throw new Error("Os dados retornados não estão no formato esperado.");
        }
      } catch (error) {
        setError(error);
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  const abrirDetalhesCliente = (id) => {
    const cliente = clients.find((cliente) => cliente.id === id);
    if (cliente) {
      // Redirecionar para uma nova tela ou abrir um modal com os detalhes do cliente
      props.exibirDetalhesCliente(cliente);
    } else {
      console.error("Cliente não encontrado.");
    }
  };
  

  const clientesFiltrados = clients.filter((cliente) =>
    cliente?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar clientes: {error.message}</div>;
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "100%",
            maxWidth: "400px",
            marginBottom: "20px",
          }}
        />

        <ul>
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((cliente) => (
              <li key={cliente.id}>
                <button
                  onClick={() => abrirDetalhesCliente(cliente.id)}
                  style={{
                    marginBottom: "10px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    background: "none",
                    border: "none",
                    color: "blue",
                    fontSize: "inherit",
                  }}
                >
                  {cliente.name}
                </button>
              </li>
            ))
          ) : (
            <p>Nenhum cliente encontrado.</p>
          )}
        </ul>
      </div>
      <Voltar setScreen={props.setScreen} goBack={props.goBack} />
    </>
  );
}
