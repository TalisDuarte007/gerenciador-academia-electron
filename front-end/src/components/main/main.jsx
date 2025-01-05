import React, { useState } from "react";
import NewClientScreen from "../NewClientScreen/NewClientScreen.jsx";
import ClientManager from "../ClientManager/ClientManager.jsx";

export default function Main() {
  const [currentScreen, setCurrentScreen] = useState("main");

  const renderScreen = () => {
    switch (currentScreen) {
      case "newClient":
        return (
          <NewClientScreen 
            setScreen={setCurrentScreen} 
            goBack="main" 
          />
        );

      case "ClientManager":
        return <ClientManager 
          setScreen={setCurrentScreen} 
          goBack="main" 
      />;
      default:
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <button onClick={() => setCurrentScreen("newClient")}>
              New Client
            </button>
            <button onClick={() => setCurrentScreen("ClientManager")}>
              Lista de Clientes
            </button>
            <button>More Buttons</button>
          </div>
        );
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {renderScreen()}
    </div>
  );
}
