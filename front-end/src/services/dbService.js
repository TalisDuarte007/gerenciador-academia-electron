const API_URL = "http://localhost:5000";

export const saveClient = async (clientData) => {
  try {
    const response = await fetch(`${API_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      throw new Error(`Erro ao salvar cliente: ${response.statusText}`);
    }

    const result = await response.json();
    return result; // Retorna o resultado da API
  } catch (error) {
    console.error("Erro ao salvar cliente:", error);
    throw error; // Propaga o erro para que possa ser tratado onde a função for usada
  }
};

export const fetchClients = async () => {
  try {
    const response = await fetch(`${API_URL}/students`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${response.statusText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
};

// Outras funções podem ser adicionadas aqui
// Por exemplo:
// export const fetchClients = async () => { ... };
// export const deleteClient = async (clientId) => { ... };
