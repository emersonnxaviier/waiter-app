import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// comentado o </React.StrictMode> para evitar duplicatas de pedido na conexão com o soquete quando o componente é desmontado e montado novamente
