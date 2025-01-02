import React, { useState } from "react";
import NewClientScreen from "../NewClientScreen/NewClientScreen.jsx";
import ClientList from "../ClientList/ClientList.jsx";

export default function Main() {
  const [currentScreen, setCurrentScreen] = useState("main");

  const renderScreen = () => {
    switch (currentScreen) {
      case "newClient":
        return <NewClientScreen goBack={() => setCurrentScreen("main")} />;
      case "ClientList":
        return <ClientList goBack={() => setCurrentScreen("main")} />;
      default:
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <button onClick={() => setCurrentScreen("newClient")}>
              New Client
            </button>
            <button onClick={() => setCurrentScreen("ClientList")}>
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
