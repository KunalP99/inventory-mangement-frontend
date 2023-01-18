import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/css/main.css";
import { InventoryContextProvider } from "./context/InventoryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <InventoryContextProvider>
      <App />
    </InventoryContextProvider>
  </React.StrictMode>
);
