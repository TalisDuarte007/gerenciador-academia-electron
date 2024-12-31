import React, { useState } from "react";
import NewClientScreen from "../NewClientScreen/NewClientScreen.jsx";

export default function Main() {
  const [currentScreen, setCurrentScreen] = useState("main");

  const renderScreen = () => {
    switch (currentScreen) {
      case "newClient":
        return <NewClientScreen goBack={() => setCurrentScreen("main")} />;
      default:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <button onClick={() => setCurrentScreen("newClient")}>New Client</button>
            <button>Another Button</button>
            <button>More Buttons</button>
          </div>
        );
    }
  };

  return <div style={{ textAlign: "center", marginTop: "50px" }}>{renderScreen()}</div>;
};
