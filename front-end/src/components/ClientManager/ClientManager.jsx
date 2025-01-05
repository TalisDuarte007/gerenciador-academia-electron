import React, { useState } from "react";
import ClientList from "../ClientList/ClientList.jsx";
import ClientDetails from "../ClientDetails/ClientDetails.jsx";

export default function ClientManager({ setScreen, goBack }) {
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    const exibirDetalhesCliente = (cliente) => {
      setClienteSelecionado(cliente);
    };
  
  
    return (
      <>
        {clienteSelecionado ? (
          <ClientDetails 
            cliente={clienteSelecionado} 
            setScreen={setScreen}
            goBack={goBack} 
            //goBack="ClientManager" 
            />
        ) : (
          <ClientList 
            exibirDetalhesCliente={exibirDetalhesCliente} 
            setScreen={setScreen} 
            goBack={goBack} />
        )}
      </>
    );
}
